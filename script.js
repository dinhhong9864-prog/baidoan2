const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const progressBar = document.getElementById('progressBar');
const revealElements = document.querySelectorAll('.reveal');
const typingElement = document.querySelector('.typing');
const typeWords = ['Sáng tạo UI/UX', 'Thiết kế pastel', 'Câu chuyện du lịch', 'Người kể chuyện số'];
let typeIndex = 0;
let charIndex = 0;

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function revealOnScroll() {
  const trigger = window.innerHeight * 0.92;
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('show');
    }
  });
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
}

function toggleTheme() {
  if (body.dataset.theme === 'dark') {
    body.removeAttribute('data-theme');
    localStorage.setItem('portfolio-theme', 'light');
  } else {
    body.dataset.theme = 'dark';
    localStorage.setItem('portfolio-theme', 'dark');
  }
}

function loadTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'dark') body.dataset.theme = 'dark';
}

function typeWriter() {
  if (!typingElement) return;
  const current = typeWords[typeIndex];
  if (charIndex < current.length) {
    typingElement.textContent += current.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeWriter, 90);
  } else {
    setTimeout(() => {
      typingElement.textContent = '';
      charIndex = 0;
      typeIndex = (typeIndex + 1) % typeWords.length;
      typeWriter();
    }, 1800);
  }
}

navToggle.addEventListener('click', toggleMobileMenu);
mobileClose.addEventListener('click', toggleMobileMenu);
themeToggle.addEventListener('click', toggleTheme);
window.addEventListener('scroll', () => {
  updateProgress();
  revealOnScroll();
});
window.addEventListener('load', () => {
  loadTheme();
  updateProgress();
  revealOnScroll();
  typeWriter();
});
