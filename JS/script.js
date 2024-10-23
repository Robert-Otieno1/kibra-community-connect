// Function to fetch job descriptions from the API (unchanged)
async function fetchJobDescription(title, location) {
    const url = 'https://hr-job-description-generator.proxy-production.allthingsdev.co/api/v1/hr/job_description';

    const headers = {
        'Accept': 'application/json',
        'x-atd-key': 'sIw9DyELkMIAD1qsfYhPFurAYxa5gQjEmNkKFbBwDL7ZzgioJJ',
        'x-apihub-host': 'HR-Job-Description-Generator.allthingsdev.co',
        'x-apihub-endpoint': '973e3c09-74a9-4d41-a106-0d0d25e6b122'
    };

    const body = JSON.stringify({
        "uuid": "081d6ba5-329d-4723-b88f-a8c88bc3a9cb",
        "name": title,
        "country": location,
        "minimum_education": "Bachelor Degree",
        "minimum_work_experience": "2 years",
        "employment_type": "full time",
        "language": "English"
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        displayJobDescription(data);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        document.getElementById('job-results').innerHTML = `<p>Error fetching job descriptions. Please try again later.</p>`;
    }
}

// Function to display job descriptions (unchanged)
function displayJobDescription(data) {
    const resultsContainer = document.getElementById('job-results');
    const { job_requirements, job_responsibilities, job_short_description } = data.data.attributes.result;

    resultsContainer.innerHTML += `
        <div class="job-description">
            <h3>Job Summary</h3>
            <p>${job_short_description}</p>
            <h4>Job Requirements:</h4>
            <p>${job_requirements}</p>
            <h4>Job Responsibilities:</h4>
            <p>${job_responsibilities}</p>
        </div>
    `;
}

// Form submission handling for job search (unchanged)
document.getElementById('job-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const jobTitle = document.getElementById('job-title').value;
    const location = document.getElementById('location').value;

    fetchJobDescription(jobTitle, location);
});

// Form submission handling for announcements
document.getElementById('announcement-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const announcementText = event.target.querySelector('textarea').value;

    // Create a new announcement element
    const announcementContainer = document.getElementById('announcements-list');
    const newAnnouncement = document.createElement('div');
    newAnnouncement.className = 'announcement';
    newAnnouncement.textContent = announcementText;

    // Append the new announcement to the announcements list
    announcementContainer.appendChild(newAnnouncement);

    // Clear the text area
    event.target.querySelector('textarea').value = '';

    // Optional: Alert for feedback
    alert(`Announcement submitted: ${announcementText}`);
});
