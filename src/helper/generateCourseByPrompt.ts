import openai from "../utils/openai";

export default async function generateCourseByPrompt(course: string) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system", 
                    content: `You are a helpful assistant for creating a course. List all topics that will be covered in the course.`
                },
                { role: "user", content: `I want to learn ${course}. Can you provide a detailed outline for a course on this topic? in json with courseTitle and topicsCovered key (topicCovered Value Array Should have number infront such as "topicCovered": ["1.example","2.example"]).` },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: {type: "json_object",}
        });
        console.log(completion.choices[0]);
        return completion.choices[0];
    } catch (error) {
        console.error("Error in generating course by prompt:", error);
        throw new Error("Failed to generate course content. Please try again later.");
    }
}
