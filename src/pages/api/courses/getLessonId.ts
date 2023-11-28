import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

interface LessonData {
    lessonId: string;
    topic: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { courseId } = req.query;

    if (!courseId || typeof courseId !== "string") {
        return res.status(400).json({ message: "Bad Req: courseId is not provided!" });
    }

    try {
        const lessonData = await prisma.lesson.findMany({
            where: {
                courseId: courseId,
            },
            select: {
                id: true,
                title: true,
            },
        });

        const navigationData: LessonData[] = lessonData.map((lesson) => ({
            lessonId: lesson.id,
            topic: lesson.title,
        }));

        return res.status(200).json(navigationData);
    } catch (error) {
        console.error('Failed to fetch lessons', error);
        return res.status(500).json({ message: "Server error!" });
    }

}

