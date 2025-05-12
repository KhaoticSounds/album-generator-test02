let generationCount = 0;
let subscribed = false;
let advisorOn = false;

// Replace with your owner email or ID check if needed
const isOwner = true; // Set to false for public users

document.getElementById("generate-btn").addEventListener("click", () => {
  if (generationCount >= 1 && !subscribed && !isOwner) {
    document.getElementById("subscription-overlay").style.display = "flex";
    return;
  }

  const prompt = document.getElementById("prompt").value.trim();
  const outputBox = document.getElementById("image-output");

  if (!prompt) {
    outputBox.innerHTML = "<span class='placeholder'>Please enter a description first.</span>";
    return;
  }

  outputBox.innerHTML = "<span class='placeholder'>Generating...</span>";

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
        img.alt = "Album Cover";
        outputBox.innerHTML = "";
        outputBox.appendChild(img);

        generationCount++;
        if (subscribed || isOwner) {
          document.getElementById("save-container").style.display = "block";
        }
      } else {
        outputBox.innerHTML = "<span class='placeholder'>No image returned. Try again.</span>";
      }
    })
    .catch(() => {
      outputBox.innerHTML = "<span class='placeholder'>Something went wrong.</span>";
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
