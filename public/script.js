let generationCount = 0;
let subscribed = false;
let advisorOn = false;

document.getElementById("generate-btn").addEventListener("click", () => {
  if (generationCount >= 1 && !subscribed) {
    document.getElementById("subscription-overlay").style.display = "flex";
    return;
  }

  const prompt = document.getElementById("prompt").value.trim();
  const outputBox = document.getElementById("image-output");

  if (!prompt) {
    outputBox.textContent = "Please enter a description first.";
    return;
  }

  outputBox.textContent = "Generating your cover...";

  fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      if (data.image_url) {
        const img = document.createElement("img");
        img.src = data.image_url;
        img.alt = "Generated Album Cover";
        img.style.width = "100%";
        img.style.height = "100%";
        outputBox.innerHTML = "";
        outputBox.appendChild(img);

        generationCount++;

        if (subscribed) {
          document.getElementById("save-container").style.display = "block";
        }
      } else {
        outputBox.textContent = "No image returned. Try again.";
      }
    })
    .catch(() => {
      outputBox.textContent = "Something went wrong while generating.";
    });
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
