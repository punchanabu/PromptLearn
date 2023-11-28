import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
/*
model Lesson {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  content     String
  courseId    String
  course      Course    @relation(fields: [courseId], references: [id])
}
*/
interface lessonData {
    id: string;
    title: string;
    content: string;
    courseId: string;
    course: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { lessonId } = req.query;

    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token)  {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Server error' });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    let lesson;

    try {
        lesson = await prisma.lesson.findUnique({
            where: {
                id: lessonId as string,
            },
        });
    } catch(error) {
        return res.status(500).json({ message: 'Server error' });
    }

    return res.status(200).json(lesson);

}