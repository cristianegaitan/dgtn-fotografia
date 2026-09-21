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