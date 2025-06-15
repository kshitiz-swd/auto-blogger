const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

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
    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Blog generation failed:", error);
    return res.status(500).json({ error: "Failed to generate blog" });
  }
}
