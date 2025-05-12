let freeUsed = false;

const generateBtn = document.getElementById('generate-btn');
const toggleAdvisory = document.getElementById('toggle-advisory');
const advisoryImg = document.getElementById('advisory-img');
const promptInput = document.getElementById('prompt');
const imageOutput = document.getElementById('image-output');
const spinner = document.getElementById('spinner');
const saveBtn = document.getElementById('save-btn');
const premiumPopup = document.getElementById('premium-popup');

let advisoryOn = false;

toggleAdvisory.onclick = () => {
  advisoryOn = !advisoryOn;
  toggleAdvisory.textContent = `Advisory: ${advisoryOn ? "On" : "Off"}`;
  advisoryImg.style.display = advisoryOn ? "block" : "none";
};

generateBtn.onclick = async () => {
  if (freeUsed) {
    premiumPopup.style.display = "flex";
    return;
  }

  const prompt = promptInput.value.trim();
  if (!prompt) return;

  spinner.style.display = "block";
  imageOutput.innerHTML = "";
  imageOutput.appendChild(spinner);
  if (advisoryOn) imageOutput.appendChild(advisoryImg);

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
      if (advisoryOn) imageOutput.appendChild(advisoryImg);
      saveBtn.style.display = "block";
    };

    freeUsed = true;
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
  link.click();
};
