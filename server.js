import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = response.data[0].url;
    res.json({ image_url: imageUrl });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Image generation failed." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


