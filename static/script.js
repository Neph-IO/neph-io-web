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
  if (event.target.id === "lightbox" || event.target.id === "closeBtn") {
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

  // Réinitialise l’état
  lightboxImg.style.display = "none";
  document.getElementById("lightbox-loader").style.display = "block";
  lightboxCaption.classList.remove("visible");
  lightboxCaption.innerHTML = ""; // vide pendant le chargement

  // Chargement de l'image
  lightboxImg.onload = () => {
    document.getElementById("lightbox-loader").style.display = "none";
    lightboxImg.style.display = "block";
    lightboxCaption.innerHTML = `<strong>${title}</strong><br>${caption}`;
    // Forcer un léger délai pour assurer la transition
    setTimeout(() => {
      lightboxCaption.classList.add("visible");
    }, 30);
  };

  // Forcer le rechargement même si c’est la même image
  lightboxImg.src = "";
  lightboxImg.src = fullSrc;
}

function initPortfolioLazyLoad() {
  const grid = document.querySelector(".portfolio-grid");
  const images = [...document.querySelectorAll(".portfolio-grid img[data-src]")];
  if (!grid || images.length === 0) {
    return;
  }

  let msnry = null;
  if (window.Masonry) {
    msnry = new Masonry(grid, {
      itemSelector: ".portfolio-item",
      columnWidth: ".portfolio-item",
      percentPosition: true,
      gutter: 10,
      horizontalOrder: true,
    });
  }

  if (window.imagesLoaded && msnry) {
    imagesLoaded(grid).on("progress", function () {
      msnry.layout();
    });
  }

  const loadImage = (img) => {
    const src = img.getAttribute("data-src");
    if (!src) {
      return;
    }
    img.src = src;
    img.removeAttribute("data-src");
    img.addEventListener(
      "load",
      function () {
        if (msnry) {
          msnry.layout();
        }
      },
      { once: true }
    );
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            loadImage(img);
            obs.unobserve(img);
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    images.forEach((img) => observer.observe(img));
  } else {
    images.forEach(loadImage);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initPortfolioLazyLoad();
});

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
