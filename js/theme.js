const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Apply theme
function setTheme(theme) {
  root.setAttribute("data-theme", theme);

  localStorage.setItem("studyspace-theme", theme);

  // Update switch state
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark");

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("studyspace-theme");

  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  setTheme(savedTheme || preferredTheme);
}

// Smooth transition when opening the login page
document.querySelectorAll('a[href="login.html"], a[href="index.html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    // Allow new tabs and modified clicks to work normally
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;

    event.preventDefault();

    document.body.classList.add("page-leaving");

    setTimeout(() => {
      window.location.href = link.href;
    }, 350);
  });
});

// Theme switch
themeToggle?.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");

  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  navMenu?.classList.toggle("open");
});

// Close mobile menu after clicking a link
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("open");
  });
});

// Initialize
loadTheme();
