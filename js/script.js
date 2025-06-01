const body = document.body;
const btnTheme = document.querySelector('#btn-theme');
const btnHamburger = document.querySelector('.nav__hamburger');
const navList = document.querySelector('.nav__list');
const scrollTopBtn = document.querySelector('.scroll-top');

const setTheme = (theme, icon) => {
  body.className = theme;
  btnTheme.className = `fas ${icon}`;
  localStorage.setItem('portfolio-theme', theme);
  localStorage.setItem('portfolio-icon', icon);
};

const toggleTheme = () => {
  const isDark = body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark', isDark ? 'fa-sun' : 'fa-moon');
};

const toggleNav = () => {
  const icon = btnHamburger.querySelector('i');
  const isOpen = icon.classList.contains('fa-bars');
  icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  navList.classList.toggle('display-nav-list');
};

const handleScroll = () => {
  scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
};

// Inicialización
(() => {
  const theme = localStorage.getItem('portfolio-theme') || 'dark';
  const icon = localStorage.getItem('portfolio-icon') || 'fa-moon';
  setTheme(theme, icon);
})();

// Listeners
btnTheme?.addEventListener('click', toggleTheme);
btnHamburger?.addEventListener('click', toggleNav);
window.addEventListener('scroll', handleScroll);
