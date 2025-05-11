const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const outputDisplay = document.getElementById('outputDisplay');
const imageUpload = document.getElementById('imageUpload');
const textPrompt = document.getElementById('textPrompt');
const loadingText = document.getElementById('loadingText');
const toggleAdvisorBtn = document.getElementById('toggleAdvisorBtn');
const advisorImage = document.getElementById('advisorImage');

let generatedImage = null;

generateBtn.addEventListener('click', () => {
  const prompt = textPrompt.value.trim();

  if (!prompt && !imageUpload.files[0]) {
    alert('Enter a prompt or upload an image.');
    return;
  }

  outputDisplay.innerHTML = '';
  loadingText.classList.remove('hidden');

  setTimeout(() => {
    loadingText.classList.add('hidden');

    if (imageUpload.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        outputDisplay.innerHTML = `<img src="${e.target.result}" id="finalImage" style="max-width:100%; height:100%; object-fit:cover;" />`;
        generatedImage = e.target.result;
      };
      reader.readAsDataURL(imageUpload.files[0]);
    } else {
      outputDisplay.innerHTML = `<div style="text-align:center;"><p style="color:#aaa;">[ Simulated AI image for: <strong>${prompt}</strong> ]</p></div>`;
      generatedImage = null;
    }
  }, 3000);
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

toggleAdvisorBtn.addEventListener('click', () => {
  advisorImage.classList.toggle('hidden');
  toggleAdvisorBtn.textContent = advisorImage.classList.contains('hidden') ? '👁️ Show Advisor' : '🙈 Hide Advisor';
});
