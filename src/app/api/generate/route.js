import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1", 
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a professional blog writer. Write well-structured, engaging, and informative blog posts with headings and paragraphs.",
        },
        {
          role: "user",
          content: `Write a 1000-word blog post about: ${prompt}`,
        },
      ],
    });

    const blog = completion.choices[0].message.content;
    return Response.json({ blog });
  } catch (error) {
    console.error("Generation failed:", error);
    return Response.json({ error: "Failed to generate blog" }, { status: 500 });
  }
}
