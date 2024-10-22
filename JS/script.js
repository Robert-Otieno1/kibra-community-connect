// Image rotation code
let currentIndex = 0;
const images = document.querySelectorAll('.banner-image');
const totalImages = images.length;

function changeImage() {
    // Remove the 'active' class from the current image
    images[currentIndex].classList.remove('active');

    // Update the index to the next image
    currentIndex = (currentIndex + 1) % totalImages;

    // Add the 'active' class to the new current image
    images[currentIndex].classList.add('active');
}

// Change image every second (1000 milliseconds)
setInterval(changeImage, 1000);

// Example of handling form submissions
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const announcementText = event.target.querySelector('textarea').value;

    if (announcementText) {
        // Here, you can handle the announcement, e.g., send it to a server or display it
        alert(`Announcement submitted: ${announcementText}`);

        // Clear the textarea after submission
        event.target.querySelector('textarea').value = '';
    } else {
        alert('Please enter an announcement before submitting.');
    }
});

// Example of button click functionality (if you have buttons in the nav or elsewhere)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        // You can implement navigation logic or smooth scrolling here
        alert(`Navigating to: ${this.textContent}`);
    });
});
