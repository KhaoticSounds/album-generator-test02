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

  // POST request to AI backend (make sure this route matches your server)
  fetch("/api/generate-cover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      if (data.imageUrl) {
        img.src = data.imageUrl;
      } else {
        img.alt = "No image returned.";
      }
    })
    .catch(() => {
      alert("Something went wrong. Try again.");
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

