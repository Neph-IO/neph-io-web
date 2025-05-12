const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const portfolioItems = [...document.querySelectorAll(".portfolio-img-wrapper")];

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.style.display = "flex";
}

function closeLightbox(event) {
  if (event.target.id === "lightbox") {
    lightbox.style.display = "none";
  }
}

function nextImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex + 1) % portfolioItems.length;
  updateLightbox();
}

function prevImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
  updateLightbox();
}

function updateLightbox() {
  const item = portfolioItems[currentIndex];
  const fullSrc = item.getAttribute("data-full");
  const img = item.querySelector("img");
  const title = img.alt;
  const caption = item.getAttribute("data-caption") || "";

  // Affiche le loader
  document.getElementById("lightbox-loader").style.display = "block";
  lightboxImg.style.display = "none";
  lightboxImg.src = ""; // force rechargement

  // Attendre le chargement
  lightboxImg.onload = () => {
    document.getElementById("lightbox-loader").style.display = "none";
    lightboxImg.style.display = "block";
  };

  // Déclenche le chargement
  lightboxImg.src = fullSrc;
  lightboxCaption.innerHTML = `<strong>${title}</strong><br>${caption}`;
}


document.addEventListener("keydown", function (e) {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      nextImage(e);
    } else if (e.key === "ArrowLeft") {
      prevImage(e);
    } else if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
  }
});
