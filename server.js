import express from "express";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api/cover", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.length < 3) {
    console.warn("⚠️ Invalid prompt:", prompt);
    return res.status(400).json({ error: "Prompt is too short or missing." });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      n: 1
    });

    const imageUrl = response.data[0]?.url;
    console.log("✅ Image URL generated:", imageUrl);
    res.json({ imageUrl });
  } catch (err) {
    console.error("❌ OpenAI generation error:", err.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

