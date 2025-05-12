let nextAllowedTime = 0;

const generateBtn = document.getElementById('generate-btn');
const promptInput = document.getElementById('prompt');
const imageOutput = document.getElementById('image-output');
const spinner = document.getElementById('spinner');
const saveBtn = document.getElementById('save-btn');
const premiumPopup = document.getElementById('premium-popup');

generateBtn.onclick = async () => {
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
    const response = await fetch("/api/cover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const img = new Image();
    img.src = data.imageUrl;

    img.onload = () => {
      spinner.style.display = "none";
      imageOutput.innerHTML = "";
      imageOutput.appendChild(img);
      saveBtn.style.display = "block";
    };

    nextAllowedTime = Date.now() + 30 * 60 * 1000;

  } catch (err) {
    spinner.style.display = "none";
    imageOutput.innerHTML = `<span class="placeholder-text">Error generating image.</span>`;
  }
};

saveBtn.onclick = () => {
  const img = imageOutput.querySelector("img");
  if (!img) return;

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "album-cover.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
