let generationCount = 0;
let subscribed = false;
let advisorOn = false;

document.getElementById("generate-btn").addEventListener("click", () => {
  if (generationCount >= 1 && !subscribed) {
    document.getElementById("subscription-overlay").style.display = "flex";
    return;
  }

  const prompt = document.getElementById("prompt").value;
  const outputBox = document.getElementById("image-output");

  outputBox.textContent = "Generating your cover...";

  // Simulate image generation (replace this with real OpenAI call)
  setTimeout(() => {
    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/500x500.png?text=Your+Cover";
    img.alt = "Generated Cover";
    img.style.width = "100%";
    img.style.height = "100%";
    outputBox.innerHTML = "";
    outputBox.appendChild(img);

    generationCount++;

    if (subscribed) {
      document.getElementById("save-container").style.display = "block";
    }
  }, 1500);
});

document.getElementById("advisor-toggle").addEventListener("click", () => {
  advisorOn = !advisorOn;
  document.getElementById("advisor-toggle").textContent = `Advisor: ${advisorOn ? 'On' : 'Off'}`;
});

document.getElementById("save-btn").addEventListener("click", () => {
  const img = document.querySelector("#image-output img");
  if (img) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "album-cover.png";
    link.click();
  }
});


