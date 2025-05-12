
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
