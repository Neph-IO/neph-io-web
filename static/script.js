function openLightbox(src, caption) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox-caption").innerText = caption || "";
    document.getElementById("lightbox").style.display = "flex";
  }
  
  function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }
  