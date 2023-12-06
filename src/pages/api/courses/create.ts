import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import generateCourseByPrompt from '@/helper/generateCourseByPrompt';
import generateLessonByPrompt from '@/helper/generateLessonByPrompt';

type UserData = {
    userId: string;
    email: string;
    iat: number;
    exp: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Server error' });
    }

    let userId;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserData;
        userId = decoded.userId;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const { courseName } = req.body;
        if (!courseName) {
            return res.status(400).json({ message: 'Course name is required' });
        }

        const courseResponse = await generateCourseByPrompt(courseName);
        const courseData = courseResponse.message.content ? JSON.parse(courseResponse.message.content) : null;
        if (!courseData) {
            return res.status(400).json({ message: 'Invalid course data' });
        }

        const createdCourse = await prisma.course.create({
            data: {
                title: courseData.courseTitle,
                description: `This course is about ${courseData.courseTitle}`,
                createdBy: userId,
                owner: {
                    connect: { id: userId }
                },
                lessons: { create: [] }
            }
        });

        courseData.topicsCovered.forEach(async (topic: string) => {
            try {
                const lessonResponse = await generateLessonByPrompt(topic); 
                const lessonContent = lessonResponse.message.content;
                if (lessonContent) {
                    await prisma.lesson.create({
                        data: {
                            title: topic,
                            content: lessonContent,
                            courseId: createdCourse.id
                        }
                    });
                }
            } catch (lessonError) {
                console.error(`Error creating lesson for topic ${topic}:`, lessonError);
                // Consider adding error handling logic here, such as retrying the request
            }
        });

        return res.status(200).json({ message: 'Course creation process initiated' });
    } catch (error) {
        console.error('Error in creating course:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
