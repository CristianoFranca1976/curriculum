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
    // Incrementa e pega o total
    const res = await fetch("https://api.counterapi.dev/v1/cristiano/curriculum/up");
    const data = await res.json();
    document.getElementById("views-badge").innerHTML = "👀 Views: " + data.count;
  } catch (e) {
    document.getElementById("views-badge").innerHTML = "👀 Views: error";
    console.error("View counter error:", e);
  }
}
