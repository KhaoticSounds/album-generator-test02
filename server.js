const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/generate-image", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512"
    });

    const imageUrl = response.data.data[0].url;
    res.json({ image_url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image generation failed." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


