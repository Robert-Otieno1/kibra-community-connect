// Function to submit a job (just a placeholder, no backend)
function submitJob() {
    alert("Submit a job feature coming soon!");
}

// Function to start learning
function startLearning() {
    alert("Redirecting to learning resources.");
}

// Handle announcement submission (adds it to the community announcements section)
const form = document.getElementById('announcement-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const announcementText = document.getElementById('announcement').value;
    if (announcementText) {
        const announcementsDiv = document.getElementById('community-announcements');
        const newAnnouncement = document.createElement('p');
        newAnnouncement.textContent = announcementText;
        announcementsDiv.appendChild(newAnnouncement);
        document.getElementById('announcement').value = ''; // Clear input
    } else {
        alert("Please enter an announcement before submitting.");
    }
});
