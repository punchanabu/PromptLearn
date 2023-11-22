import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../utils/prisma'; // Adjust the import path as needed

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your .env file

type ResponseData = {
    message: string;
    token?: string;
    error?: string;
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Server error' });
    }

    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare provided password with stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '8h' } // Token expires in 8 hours
        );

        // Respond with JWT token
        return res.status(200).json({ 
            message: 'Login successful', 
            token
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
