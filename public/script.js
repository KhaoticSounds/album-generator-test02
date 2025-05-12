function generateCover() {
  const prompt = document.getElementById("prompt").value;
  const img = document.getElementById("cover-image");
  const spinner = document.getElementById("loading-spinner");

  if (!prompt.trim()) {
    alert("Please enter a prompt.");
    return;
  }

  // Show spinner
  spinner.classList.remove("hidden");
  img.src = "";

  // Simulated API call (replace with real OpenAI image generation)
  fetch("/api/generate-cover", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      img.src = data.imageUrl; // image URL returned by your backend
    })
    .catch(() => {
      alert("Something went wrong.");
    })
    .finally(() => {
      spinner.classList.add("hidden");
    });
}

document.getElementById("toggle-advisor").addEventListener("click", () => {
  const btn = document.getElementById("toggle-advisor");
  const current = btn.textContent.includes("On");
  btn.textContent = current ? "Advisor: Off" : "Advisor: On";
});

