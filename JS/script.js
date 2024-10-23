// Function to fetch job descriptions from RapidAPI with enhanced error handling
function fetchJobDescription(title, location) {
  // Input validation
  if (!title || !location) {
    console.error("Title and location are required to fetch job descriptions.");
    const resultsContainer = document.getElementById("job-results");
    resultsContainer.innerHTML = `<p>Title and location are required fields. Please fill in both and try again.</p>`;
    return;
  }

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`;
  const headers = {
    'X-RapidAPI-Key': '50949b3c7emshb071ff7cca92991p16e61ejsn778cdc6258bf', // Replace with your actual API key
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  };

  fetch(url, { method: 'GET', headers })
    .then(response => {
      if (!response.ok) {
        // Handle different HTTP error codes
        if (response.status === 429) {
          throw new Error("API rate limit exceeded. Please try again later.");
        } else if (response.status === 404) {
          throw new Error("No job descriptions found for the given title and location.");
        } else if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      return response.json();
    })
    .then(data => {
      // Check if the API returns an empty or invalid response
      if (!data || data.length === 0) {
        throw new Error("No job descriptions found. Try refining your search.");
      }

      // Display the job descriptions
      displayJobDescription(data);
    })
    .catch(error => {
      console.error("Error fetching jobs:", error);
      
      // Display an error message in the UI
      const resultsContainer = document.getElementById("job-results");
      resultsContainer.innerHTML = `<p>Error fetching job descriptions: ${error.message}. Please try again later.</p>`;
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
