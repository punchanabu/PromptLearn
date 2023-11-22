import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY)  {
    throw new Error('Missing OPENAI_API_KEY');
}

const openai = new OpenAI({apiKey: OPENAI_API_KEY});

export default openai;