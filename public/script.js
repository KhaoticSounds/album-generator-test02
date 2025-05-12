generateBtn.onclick = async () => {
  console.log("Generate clicked");

  const now = Date.now();
  if (now < nextAllowedTime) {
    premiumPopup.style.display = "flex";
    return;
  }

  const prompt = promptInput.value.trim();
  if (!prompt) return;

  spinner.style.display = "block";
  imageOutput.innerHTML = "";
  imageOutput.appendChild(spinner);

  try {
    console.log("Sending prompt to server:", prompt);

    const response = await fetch("/api/cover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log("Server response:", data);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = data.imageUrl;
