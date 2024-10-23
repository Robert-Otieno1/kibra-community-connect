// Function to fetch job descriptions from RapidAPI
function fetchJobDescription(title, location) {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`;
  const headers = {
    'X-RapidAPI-Key': '50949b3c7emshb071ff7cca92991p16e61ejsn778cdc6258bf', // Replace with your actual API key
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  };

  fetch(url, { method: 'GET', headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => displayJobDescription(data))
    .catch(error => {
      console.error("Error fetching jobs:", error);
      const resultsContainer = document.getElementById("job-results");
      resultsContainer.innerHTML = `<p>Error fetching job descriptions: ${error.message}. Please try again later.</p>`;
    });
}

// Function to display job descriptions
function displayJobDescription(data) {
  const resultsContainer = document.getElementById("job-results");
  const jobs = data.data; // Assuming the response structure contains a 'data' array

  jobs.forEach(job => {
    const jobDescriptionDiv = document.createElement("div");
    jobDescriptionDiv.className = "job-description";
    jobDescriptionDiv.innerHTML = `
      <h3>${job.job_title}</h3>
      <p>${job.job_short_description}</p>
      <h4>Job Requirements:</h4>
      <p>${job.job_requirements.join(", ")}</p>
      <h4>Job Responsibilities:</h4>
      <p>${job.job_responsibilities.join(", ")}</p>
    `;
    resultsContainer.appendChild(jobDescriptionDiv);
  });
}

// Form submission handling for job search
const jobForm = document.getElementById("job-form");
jobForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const jobTitle = document.getElementById("job-title").value;
  const location = document.getElementById("location").value;
  fetchJobDescription(jobTitle, location);
});

// Form submission handling for announcements
const announcementForm = document.getElementById("announcement-form");
announcementForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const announcementText = event.target.querySelector("textarea").value;

  const announcementContainer = document.getElementById("announcements-list");
  const newAnnouncement = document.createElement("div");
  newAnnouncement.className = "announcement";
  newAnnouncement.textContent = announcementText;

  announcementContainer.appendChild(newAnnouncement);
  event.target.querySelector("textarea").value = "";

  alert(`Announcement submitted: ${announcementText}`);
});

// Image transition
let currentImageIndex = 0;
const images = document.querySelectorAll(".banner-image");
const intervalTime = 2000; // 2 seconds

function switchImage() {
  images[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add("active");
}

setInterval(switchImage, intervalTime);
