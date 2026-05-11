// Portfolio interactive effects: theme toggle, scroll reveal, typing and cursor glow
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const revealElements = document.querySelectorAll('.reveal');
const scrollProgress = document.getElementById('scrollProgress');
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const cursorGlow = document.getElementById('cursorGlow');
const heroTyping = document.querySelector('.hero-typing');

function setTheme(theme) {
  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<span class="icon">☀️</span><span>Light mode</span>';
  } else {
    body.removeAttribute('data-theme');
    themeToggle.innerHTML = '<span class="icon">🌙</span><span>Dark mode</span>';
  }
}

function loadTheme() {
  const storedTheme = localStorage.getItem('portfolio-theme');
  setTheme(storedTheme === 'dark' ? 'dark' : 'light');
}

function toggleTheme() {
  const currentTheme = body.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
}

function handleScrollReveal() {
  const triggerBottom = window.innerHeight * 0.9;
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      element.classList.add('show');
    }
  });
}

function handleScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

function toggleNavbar() {
  navbar.classList.toggle('active');
}

function updateCursor(e) {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
  cursorGlow.style.opacity = 1;
}

function hideCursor() {
  cursorGlow.style.opacity = 0;
}

function initTyping() {
  if (!heroTyping) return;
  const items = Array.from(heroTyping.children).map((span) => span.textContent);
  let currentIndex = 0;
  const update = () => {
    heroTyping.innerHTML = `<span>${items[currentIndex]}</span>`;
    currentIndex = (currentIndex + 1) % items.length;
  };
  update();
  setInterval(update, 3200);
}

themeToggle.addEventListener('click', toggleTheme);
menuToggle.addEventListener('click', toggleNavbar);
window.addEventListener('scroll', () => {
  handleScrollReveal();
  handleScrollProgress();
});
window.addEventListener('mousemove', updateCursor);
window.addEventListener('mouseout', hideCursor);
window.addEventListener('load', () => {
  loadTheme();
  handleScrollReveal();
  handleScrollProgress();
  initTyping();
});

const links = navbar.querySelectorAll('a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
  });
});
