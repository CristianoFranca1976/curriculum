function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
function openModal(e, imgSrc) {
  const btn = e.currentTarget; // garante que é o botão clicado
  if (btn.hasAttribute("disabled")) {
    alert("Certificate not available");
    return;
  }
  document.getElementById("modal-img").src = imgSrc;
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

  async function updateViews() {
    try {
      const res = await fetch("https://api.countapi.dev/hit/cristiano-cv-site/visit");
      const data = await res.json();
      document.getElementById("views").innerHTML = "👀 Views: " + data.value;
    } catch (e) {
      document.getElementById("views").innerHTML = "👀 Views: error";
      console.error("View counter error:", e);
    }
  }
  updateViews();