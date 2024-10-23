// Function to fetch job descriptions from the API
async function fetchJobDescription(title, location) {
  const url =
    "https://hr-job-description-generator.proxy-production.allthingsdev.co/api/v1/hr/job_description";
  const headers = {
    Accept: "application/json",
    "x-atd-key": "sIw9DyELkMIAD1qsfYhPFurAYxa5gQjEmNkKFbBwDL7ZzgioJJ",
    "x-apihub-host": "HR-Job-Description-Generator.allthingsdev.co",
    "x-apihub-endpoint": "973e3c09-74a9-4d41-a106-0d0d25e6b122",
  };

  const body = JSON.stringify({
    uuid: "081d6ba5-329d-4723-b88f-a8c88bc3a9cb",
    name: title,
    country: location,
    minimum_education: "Bachelor Degree",
    minimum_work_experience: "2 years",
    employment_type: "full time",
    language: "English",
  });

  try {
    const response = await fetch(url, { method: "POST", headers, body });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    displayJobDescription(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    const resultsContainer = document.getElementById("job-results");
    resultsContainer.innerHTML = `<p>Error fetching job descriptions: ${error.message}. Please try again later.</p>`;
  }
}

// Function to display job descriptions
function displayJobDescription(data) {
  const resultsContainer = document.getElementById("job-results");
  const { job_requirements, job_responsibilities, job_short_description } =
    data.data.attributes.result;

  const jobDescriptionDiv = document.createElement("div");
  jobDescriptionDiv.className = "job-description";
  jobDescriptionDiv.innerHTML = `
        <h3>Job Summary</h3>
        <p>${job_short_description}</p>
        <h4>Job Requirements:</h4>
        <p>${job_requirements}</p>
        <h4>Job Responsibilities:</h4>
        <p>${job_responsibilities}</p>
    `;

  resultsContainer.appendChild(jobDescriptionDiv);
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

// image transition

let currentImageIndex = 0;
const images = document.querySelectorAll(".banner-image");
const intervalTime = 2000; // 2 seconds

function switchImage() {
  images[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add("active");
}

setInterval(switchImage, intervalTime);

