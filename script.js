'use strict';
const theme = document.querySelector('#theme');
function setTheme(light) {
 document.body.classList.toggle('light', light);
 theme.setAttribute('aria-pressed', String(light));
 theme.textContent = light ? 'Dark mode' : 'Light mode';
}
try { setTheme(localStorage.getItem('cv-theme') === 'light'); } catch {}
theme.addEventListener('click', () => {
 const light = !document.body.classList.contains('light');
 setTheme(light);
 try { localStorage.setItem('cv-theme', light ? 'light' : 'dark'); } catch {}
});
document.querySelector('#print').addEventListener('click', () => window.print());
document.querySelector('#share').addEventListener('click', async () => {
 const status = document.querySelector('#status');
 if (!/^https?:$/.test(location.protocol)) {
  status.textContent = 'Sharing is available after this CV is hosted online.';
  return;
 }
 const data = { title: 'Cristiano Ferro de Franca | Professional CV', url: location.href.split('#')[0] };
 try {
  if (navigator.share) { await navigator.share(data); status.textContent = 'Share options opened.'; }
  else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(data.url); status.textContent = 'CV link copied.'; }
  else { status.textContent = 'Copy the address from your browser to share this CV.'; }
 } catch (error) {
  status.textContent = error.name === 'AbortError' ? 'Sharing cancelled.' : 'Copy the address from your browser to share this CV.';
 }
});
