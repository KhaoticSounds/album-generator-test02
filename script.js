const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const outputDisplay = document.getElementById('outputDisplay');
const imageUpload = document.getElementById('imageUpload');
const textPrompt = document.getElementById('textPrompt');

let generatedImage = null;

generateBtn.addEventListener('click', () => {
  const prompt = textPrompt.value.trim();

  if (!prompt && !imageUpload.files[0]) {
    alert('Enter a prompt or upload an image.');
    return;
  }

  outputDisplay.innerHTML = '⏳ Generating... (simulated 30 sec)';

  setTimeout(() => {
    if (imageUpload.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        outputDisplay.innerHTML = `<img src="${e.target.result}" id="finalImage" style="max-width:100%; border-radius:8px;" />`;
        generatedImage = e.target.result;
      };
      reader.readAsDataURL(imageUpload.files[0]);
    } else {
      outputDisplay.innerHTML = `<div style="text-align:center;"><p style="color:#aaa;">[ Simulated AI image based on: <strong>${prompt}</strong> ]</p></div>`;
      generatedImage = null;
    }
  }, 3000); // simulate 3 sec delay
});

saveBtn.addEventListener('click', () => {
  if (generatedImage) {
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = 'album-cover.png';
    a.click();
  } else {
    alert('No image to save.');
  }
});
