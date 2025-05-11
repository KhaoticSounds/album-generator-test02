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

document.getElementById('generate-cover-btn').addEventListener('click', () => {
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

  const coverPrompt = document.getElementById('cover-prompt').value;
  document.getElementById('cover-output-section').innerHTML = `<p>Generated album cover for: <em>${coverPrompt}</em></p>`;

  coverGenerationCount++;
  localStorage.setItem('coverGenerationCount', coverGenerationCount);
});

