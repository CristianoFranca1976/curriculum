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
    if (!localStorage.getItem("hasVisited")) {
      const res = await fetch("https://api.counterapi.dev/v1/cristiano/curriculum/up"); 
      if (!res.ok) throw new Error("API error: " + res.status);

      const data = await res.json();
      document.getElementById("views").innerHTML = "👀 Views: " + data.count;

      localStorage.setItem("hasVisited", "true");
      localStorage.setItem("viewCount", data.count);
    } else {
      let count = localStorage.getItem("viewCount");

      if (!count) {
        const res = await fetch("https://api.counterapi.dev/v1/cristiano/curriculum/up");
        const data = await res.json();
        count = data.count;
        localStorage.setItem("viewCount", count);
      }

      document.getElementById("views").innerHTML = "👀 Views: " + count;
    }
  } catch (e) {
    document.getElementById("views").innerHTML = "👀 Views: unavailable";
    console.error("View counter error:", e);
  }
}

async function resetViews() {
  try {
    // Corrigido: rota correta para resetar
    const res = await fetch("https://api.counterapi.dev/v1/cristiano/curriculum/set/0");
    if (!res.ok) throw new Error("API error: " + res.status);

    const data = await res.json();
    document.getElementById("views").innerHTML = "👀 Views: " + data.count;

    // Atualiza localStorage
    localStorage.setItem("viewCount", data.count);
    localStorage.removeItem("hasVisited");

    alert("Counter reset to 0 ✅");
  } catch (e) {
    console.error("Reset error:", e);
    alert("Failed to reset counter ❌");
  }
}
// 🔑 Atalho para admin: pressione Ctrl+Shift+A para desbloquear o botão
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "A") {
    const pass = prompt("Enter admin password:");
    if (pass === "minhaSenha123") { // <-- troque por sua senha secreta
      // Cria o botão dinamicamente
      const btn = document.createElement("button");
      btn.innerText = "Reset Views";
      btn.onclick = resetViews;
      btn.style.marginLeft = "10px";
      document.querySelector("header").appendChild(btn);
      alert("Admin mode activated ✅");
    }
  }
});

updateViews();




