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
    const res = await fetch("https://api.counterapi.dev/v1/cristiano/curriculum/up"); 
    if (!res.ok) throw new Error("API error: " + res.status);
    
    const data = await res.json();
    document.getElementById("views").innerHTML = "👀 Views: " + data.count;
  } catch (e) {
    document.getElementById("views").innerHTML = "👀 Views: unavailable";
    console.error("View counter error:", e);
  }
}

updateViews();

