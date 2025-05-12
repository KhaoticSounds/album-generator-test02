let nextAllowedTime = 0;

const generateBtn = document.getElementById('generate-btn');
const toggleAdvisory = document.getElementById('toggle-advisory');
const advisoryImg = document.getElementById('advisory-img');
const referenceImg = document.getElementById('reference-img');
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
  const now = Date.now();
  if (now < nextAllowedTime) {
    premiumPopup.style.display = "flex";
    return;
  }

  const prompt = promptInput.value.trim();
  if (!prompt) return;

  const file = referenceImg.files[0];
  let imageData = null;

  if (file) {
    imageData = await toBase64(file);
  }

  spinner.style.display = "block";
  imageOutput.innerHTML = "";
  imageOutput.appendChild(spinner);
  if (advisoryOn) imageOutput.appendChild(advisoryImg);

  try {
    const response = await fetch("/api/cover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, imageData })
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

    nextAllowedTime = Date.now() + 30 * 60 * 1000; // 30 mins

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

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}


