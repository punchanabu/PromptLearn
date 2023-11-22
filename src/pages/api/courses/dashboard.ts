import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type userData = {
    userId: string;
    email: string;
    iat: number;
    exp: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'GET') {
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
        const decoded = jwt.verify(token, JWT_SECRET) as userData;
        userId = decoded.userId;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {

        const courses = await prisma.course.findMany({
            where: {
                ownerId: userId,
            },
        });
        // console.log(userId);
        // console.log(courses);
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}