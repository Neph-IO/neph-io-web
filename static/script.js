function openLightbox(src, title, caption) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-caption").innerHTML =
    `<strong>${title}</strong><br>${caption || ""}`;
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
