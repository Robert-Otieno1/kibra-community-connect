// Replace with your actual Adzuna credentials
const appId = '8b25e0fc'; // Your App ID
const appKey = '2436c69891141f542064d8e161c892bd'; // Your App Key

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Event listener for job search button
document.getElementById('searchJobs').addEventListener('click', function () {
    const location = document.getElementById('location').value;
    console.log('Searching jobs for location:', location); // Debugging log
    fetchJobs(location);
});

// Function to fetch jobs using Adzuna API
function fetchJobs(location) {
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/za/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=5&where=${location}`;
    console.log('Fetching jobs from URL:', apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            displayJobs(data.results);
        })
        .catch(error => console.error('Error fetching jobs:', error));
}


// Function to display job listings on the page
function displayJobs(jobs) {
    const jobListings = document.getElementById('job-listings-content');
    jobListings.innerHTML = ''; // Clear previous results

    if (jobs.length === 0) {
        jobListings.innerHTML = '<li>No jobs found in this location.</li>';
        console.log('No jobs found'); // Debugging log
    } else {
        jobs.forEach(job => {
            const jobItem = document.createElement('li');
            jobItem.innerHTML = `
                <strong>${job.title}</strong> at ${job.company.display_name}, ${job.location.display_name}
                <br><a href="${job.redirect_url}" target="_blank">Apply Now</a>
            `;
            jobListings.appendChild(jobItem);
        });
    }
}

// Event listener for contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    alert("Thank you for contacting us!"); // Simple feedback for form submission
    // Here you could add additional code to send the form data to your server
});
