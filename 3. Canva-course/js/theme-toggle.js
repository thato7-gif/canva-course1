(function () {
  const STORAGE_KEY = "ikworx-theme";
  const html = document.documentElement;

  // Apply saved theme immediately (before paint)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    html.setAttribute("data-theme", saved);
  } else {
    // Default to light mode
    html.setAttribute("data-theme", "light");
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    updateIcon();
  }

  function updateIcon() {
    const isDark = html.getAttribute("data-theme") === "dark";
    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
      btn.addEventListener("click", toggleTheme);
    });
    updateIcon();
  });
})();