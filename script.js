let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const words = [
        "Frontend Developer",
        "Web Designer",
        "UI/UX Specialist",
        "Software Engineer"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("changing-text");

    function typeEffect() {
        const currentWord = words[wordIndex]; // Word to type

        if (!isDeleting) {
            // Type the text with space after "I'm a "
            textElement.textContent = " " + currentWord.substring(0, charIndex + 1);
            charIndex++;
        } else {
            // Delete the text
            textElement.textContent = " " + currentWord.substring(0, charIndex - 1);
            charIndex--;
        }

        let typingSpeed = isDeleting ? 50 : 100; // Adjust speed for typing & deleting

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word starts typing
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect(); // Start the animation
});

function openHirePopup() {
    document.getElementById('hire-popup').style.display = 'block';
}

function closeHirePopup() {
    document.getElementById('hire-popup').style.display = 'none';
}

function formatMessage() {
    // Collect form input values
    const name = document.getElementById('name').value || "N/A";
    const email = document.getElementById('email').value || "N/A";
    const message = document.getElementById('user_message').value || "N/A";

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    const formattedTime = currentDate.toLocaleTimeString('en-US'); // HH:MM:SS AM/PM format

    // Format the email content
    const emailContent = `
        📩 New Message From Your Portfolio Website 

            Hello,
                You’ve received a new inquiry through your Portfolio Website, 
            The message details are as follows:

            🔍 Submission Details:-
                👤 Name: ${name}
                📧 Email: ${email}
                💬 Message: ${message}

            📌 Submitted On:-
                📅 Date: ${formattedDate}
                ⏰ Time: ${formattedTime}

                Best regards,
            Your Portfolio Website
    `.trim();

    // Assign the formatted content to the hidden message field
    document.getElementById('formattedMessage').value = emailContent;

    return true; // Allow the form to be submitted
}

// Function to send contact form data to WhatsApp
function sendContactToWhatsApp(event) {
    event.preventDefault(); // Prevent form refresh

    // Get input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // WhatsApp number (International format without "+")
    let phoneNumber = "919403403371"; 

    // Get current date and time
    let currentDate = new Date().toLocaleDateString();
    let currentTime = new Date().toLocaleTimeString();

    // Structured WhatsApp Message (Encoding Special Characters)
    let whatsappMessage = `🚀 *New Contact Request!*%0A%0A` + 
                          `👤 *Name:* ${name}%0A` +
                          `📧 *Email:* ${email}%0A` +
                          `📞 *Phone:* ${phone}%0A` +
                          `📌 *Subject:* ${subject}%0A%0A` +
                          `💬 *Message:* %0A━━━━━━━━━━━━━━━━━━%0A${message}%0A%0A` +
                          `📆 *Date:* ${currentDate}%0A` +
                          `🕒 *Time:* ${currentTime}%0A%0A` +
                          `✅ *Action Required: Please review and respond!*%0A` +
                          `🔹 *Thank you!*`;

    // WhatsApp API link (Make sure the message is properly encoded)
    let whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank");
}

document.getElementById("year").textContent = new Date().getFullYear();

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}