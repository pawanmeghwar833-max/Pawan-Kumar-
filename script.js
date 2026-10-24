"use strict";

// =========================
// MOBILE NAVIGATION
// =========================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("show");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuBtn.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");

        menuBtn.textContent = "☰";
    });
});

// =========================
// DARK / LIGHT MODE
// =========================

const themeBtn = document.getElementById("themeBtn");

// Restore the user's saved theme

try {
    const savedTheme = localStorage.getItem("pawan-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
} catch (error) {
    // Theme still works if browser storage is unavailable.
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");

    themeBtn.textContent = isDark ? "☀️" : "🌙";

    themeBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

updateThemeButton();

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    try {
        localStorage.setItem(
            "pawan-theme",
            isDark ? "dark" : "light"
        );
    } catch (error) {
        // Theme switching remains available for this page session.
    }

    updateThemeButton();
});

// =========================
// CURRENT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();

// =========================
// ACTIVE NAVIGATION LINK
// =========================

const sections = document.querySelectorAll("main section");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveLink, {
    passive: true
});

updateActiveLink();

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    formStatus.textContent =
        "Your form is ready, but message sending is not configured yet.";

    formStatus.style.color = "var(--primary)";
});