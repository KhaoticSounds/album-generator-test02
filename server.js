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

app.post("/api/cover", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (err) {
    console.error("Image generation error:", err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});


