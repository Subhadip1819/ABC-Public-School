emailjs.init("fm8pT4fH_h13jZ5R2"); // 🔴 replace

// Navbar scroll color
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Section reveal
const sections = document.querySelectorAll(".section");
window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight * 0.85) {
            sec.classList.add("show");
        }
    });
});

// Gallery slider
let slides = document.querySelectorAll(".slide");
let index = 0;
setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
}, 3000);

// Mobile menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
hamburger.onclick = () => navMenu.classList.toggle("show");

// Career resume toggle
document.getElementById("enquiry").addEventListener("change", function () {
    document.getElementById("resumeField").style.display =
        this.value === "Career" ? "block" : "none";
});

// Submit form
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const enquiry = document.getElementById("enquiry").value;
    const resumeFile = document.getElementById("resume").files[0];

    const params = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        enquiry: enquiry,
        message: message.value,
        resume: ""
    };

    if (enquiry === "Career" && resumeFile) {
        const reader = new FileReader();
        reader.onload = function () {
            params.resume = reader.result;
            sendEmail(params);
        };
        reader.readAsDataURL(resumeFile);
    } else {
        sendEmail(params);
    }
});

function sendEmail(params) {
    emailjs.send(
        "service_js4al1d",   // 🔴 replace
        "template_7czzowi",  // 🔴 replace
        params
    ).then(() => {
        alert("Enquiry submitted successfully!");
        document.getElementById("contactForm").reset();
        document.getElementById("resumeField").style.display = "none";
    }).catch(error => {
        console.error(error);
        alert("Failed to send enquiry");
    });
}
