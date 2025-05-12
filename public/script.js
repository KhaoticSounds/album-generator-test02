// script.js

let freeUsage = true;
let bpmSlider = document.getElementById("bpm-slider");
let bpmLabel = document.getElementById("bpm-label");
let promptInput = document.getElementById("prompt");
let moodSelect = document.getElementById("mood");
let barsSelect = document.getElementById("bars");
let generateBtn = document.getElementById("generate");
let lyricsOutput = document.getElementById("lyrics-output");
let copyBtn = document.getElementById("copy-btn");
let popup = document.getElementById("subscription-popup");
let spinner = document.getElementById("loading-spinner");

// Update BPM label in real time
bpmSlider.addEventListener("input", () => {
  bpmLabel.textContent = `BPM: ${bpmSlider.value}`;
});

// Handle Generate Lyrics button
generateBtn.addEventListener("click", async () => {
  if (!freeUsage) {
    popup.style.display = "flex";
    return;
  }

  const prompt = promptInput.value.trim();
  const mood = moodSelect.value;
  const bars = barsSelect.value;
  const bpm = bpmSlider.value;

  if (!prompt) return;

  spinner.style.display = "block";
  generateBtn.disabled = true;
  lyricsOutput.textContent = "";

  try {
    const fullPrompt = `Generate ${bars} bars of ${mood} rap lyrics at ${bpm} BPM about: ${prompt}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: fullPrompt }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;

    lyricsOutput.textContent = result;
    copyBtn.style.display = "block";
    promptInput.style.display = "none";
    freeUsage = false;

    setTimeout(() => {
      freeUsage = true;
    }, 3600000); // 1 hour

  } catch (error) {
    lyricsOutput.textContent = "Error generating lyrics. Try again later.";
  } finally {
    spinner.style.display = "none";
    generateBtn.disabled = false;
  }
});

// Handle Copy button
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(lyricsOutput.textContent);
});

