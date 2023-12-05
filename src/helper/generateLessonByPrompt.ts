import openai from "@/utils/openai";

export default async function generateLessonByPrompt(lesson: string) {
    try {

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system", 
                    content: `You are a helpful assistant for creating a lesson. 
                    can you write a content for ${lesson}? with example and some assignment for people who read 
                    if you want to provide any code you can do it provide much detail as possible write at least a 2000 words. 
                    Write it as HTML format and structure each topic has heading, make assignment a h2 heading. 
                    the root of will only be body generate only the body part of the html (no need to have DOCTYPE just everything nested in body element)
                    since I'm going to put it in a generated content. If you want to write anycode write it in <code> and <pre> element to remain formatted.
                    I use Prism.js library so you can include the classname for the code language you're writing`
                },
            ],
            model: "gpt-3.5-turbo-1106",
            max_tokens: 2500,
        });

        return completion.choices[0];
    } catch (error) {
        console.error("Error in generating course by prompt:", error);
        throw new Error("Failed to generate course content. Please try again later.");
    }
}
