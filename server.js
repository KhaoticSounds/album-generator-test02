import express from "express";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Debug logs to verify if server receives the prompt
app.post("/api/cover", async (req, res) => {
  const { prompt } = req.body;

  console.log("▶️ Received prompt:", prompt);

  if (!prompt || prompt.length < 3) {
    console.warn("⚠️ Invalid or empty prompt received.");
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
    console.log("✅ Image URL returned:", imageUrl);

    res.json({ imageUrl });
  } catch (err) {
    console.error("❌ OpenAI image generation failed:", err.message);
    res.status(500).json({ error: "Image generation failed. Check API key or prompt." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
