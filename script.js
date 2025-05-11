let coverGenerationCount = localStorage.getItem('coverGenerationCount') || 0;
let coverNextAllowedTime = localStorage.getItem('coverNextAllowedTime');

function updateCoverCooldownTimer() {
  const remaining = Math.max(0, Math.floor((coverNextAllowedTime - Date.now()) / 1000));
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  document.getElementById('cover-cooldown-timer').textContent = `${minutes}m ${seconds}s`;
  if (remaining <= 0) {
    document.getElementById('cover-cooldown-message').classList.add('hidden');
    document.getElementById('cover-input-section').classList.remove('hidden');
    coverGenerationCount = 0;
    localStorage.setItem('coverGenerationCount', coverGenerationCount);
  } else {
    setTimeout(updateCoverCooldownTimer, 1000);
  }
}

document.getElementById('generate-cover-btn').addEventListener('click', async () => {
  if (coverGenerationCount >= 1) {
    if (!coverNextAllowedTime) {
      coverNextAllowedTime = Date.now() + 3600000;
      localStorage.setItem('coverNextAllowedTime', coverNextAllowedTime);
    }
    document.getElementById('cover-input-section').classList.add('hidden');
    document.getElementById('cover-cooldown-message').classList.remove('hidden');
    updateCoverCooldownTimer();
    return;
  }

  const prompt = document.getElementById('cover-prompt').value;
  const showAdvisory = document.getElementById('advisory-toggle').checked;
  const outputSection = document.getElementById('cover-output-section');
  const saveBtn = document.getElementById('save-btn');

  outputSection.innerHTML = '<p>Generating image...</p>';

  // TO DO: Replace with actual OpenAI API call
  // const response = await fetch('/api/generate-image', { method: 'POST', body: JSON.stringify({ prompt }) });
  // const imageUrl = (await response.json()).url;
  const imageUrl = 'https://via.placeholder.com/512x512.png?text=AI+Album+Cover'; // Placeholder image

  const wrapper = document.createElement('div');
  wrapper.className = 'output-wrapper';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'Generated Cover';

  wrapper.appendChild(img);

  if (showAdvisory) {
    const advisory = document.createElement('img');
    advisory.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Parental_Advisory_label.svg/320px-Parental_Advisory_label.svg.png';
    advisory.className = 'advisory-label';
    wrapper.appendChild(advisory);
  }

  outputSection.innerHTML = '';
  outputSection.appendChild(wrapper);
  saveBtn.classList.remove('hidden');

  coverGenerationCount++;
  localStorage.setItem('coverGenerationCount', coverGenerationCount);
});

document.getElementById('save-btn').addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  const img = document.querySelector('#cover-output-section img');
  if (!img) return;

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'album_cover.png';
  a.click();
});

