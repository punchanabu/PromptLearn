import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type RequestBody = {
    username: string;
    email: string;
    password: string;
};

type UserData = {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
};

type ResponseData = {
    message: string;
    user?: UserData;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { username, email, password } = req.body as RequestBody;

        // Validate user input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        return res.status(200).json({ 
            message: 'User created', 
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
