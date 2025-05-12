import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// OpenAI Config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route for image generation
app.post('/api/generate-image', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512"
    });

    const imageUrl = response.data.data[0].url;
    res.json({ image_url: imageUrl });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: 'Image generation failed.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


