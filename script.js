const portfolioImages = document.querySelectorAll(".portfolio-image");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(image) {
    const card = image.closest(".portfolio-card");
    const title = card.querySelector("h3").textContent;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = title;

    lightbox.showModal();
}

portfolioImages.forEach((image) => {
    image.addEventListener("click", () => {
        openLightbox(image);
    });
});

lightboxClose.addEventListener("click", () => {
    lightbox.close();
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.close();
    }
});

// Menú para celulares
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");

function closeMenu() {
    navList.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
}

navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");

    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navList.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
});