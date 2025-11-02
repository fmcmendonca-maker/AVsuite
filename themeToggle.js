function toggleTheme() {
  const link = document.getElementById('themeStylesheet');
  const current = link.getAttribute('href');
  const newTheme = current.includes('skyblue') ? 'style_flightops.css' : 'style_skyblue.css';
  link.setAttribute('href', newTheme);
  localStorage.setItem('suite_theme', newTheme);
  updateThemeButton(newTheme);
}
function updateThemeButton(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (theme.includes('skyblue')) btn.textContent = '🎨 Switch to Gold Theme';
  else btn.textContent = '🎨 Switch to Blue Theme';
}
(function restoreTheme() {
  const saved = localStorage.getItem('suite_theme') || 'style_skyblue.css';
  document.getElementById('themeStylesheet').setAttribute('href', saved);
  updateThemeButton(saved);
})();
