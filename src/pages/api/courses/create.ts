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

        const course = await generateCourseByPrompt(courseName);
        const courseData = course.message.content ? JSON.parse(course.message.content) : null;
        
        if (!courseData) {
            return res.status(400).json({ message: 'Invalid course data' });
        }

        // Create Course
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

        // Generate and create lessons asynchronously
        const lessonPromises = courseData.topicsCovered.map(async (topic: string) => {
            const lessonContent = await generateLessonByPrompt(topic); 
            if (lessonContent.message.content) {
                return prisma.lesson.create({
                    data: {
                        title: topic,
                        content: lessonContent.message.content,
                        courseId: createdCourse.id
                    }
                });
            }
        });

        // Wait for all lessons to be created
        const createdLessons = await Promise.all(lessonPromises);

        // Filter out null responses
        const createdLessonIds = createdLessons.filter(Boolean).map(lesson => ({ id: lesson.id }));

        // Update course with lessons (if any)
        if (createdLessonIds.length > 0) {
            await prisma.course.update({
                where: { id: createdCourse.id },
                data: { lessons: { connect: createdLessonIds } }
            });
        }

        return res.status(200).json({ message: 'Course created successfully' });
    } catch (error) {
        console.error('Error in creating course:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
