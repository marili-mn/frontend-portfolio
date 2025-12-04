import { themeService } from '../services/ThemeService.js';
import { translationService } from '../services/TranslationService.js';

export class AppHeader extends HTMLElement {
  constructor() {
    super();
    // Note: We are NOT using Shadow DOM here to inherit global styles easily for the complex nav 
    // and because CSS frameworks/utilities usually expect light DOM access. 
    // Ideally, we would use Shadow DOM and import styles, but for this refactor step, 
    // Light DOM keeps styling consistent with existing CSS without rewriting all CSS.
  }

  connectedCallback() {
    this.render();
    this.initListeners();
    
    // Listen for language changes to update own text
    window.addEventListener('language-changed', () => this.updateTexts());
    
    // Reactive Theme Icon Update
    window.addEventListener('theme-changed', (e) => {
        const icon = this.querySelector('#btn-theme');
        if (icon) icon.className = `fas ${e.detail.icon}`;
    });
    
    // Update initial state (Text only, icon handled by event)
    this.updateTexts();
  }

  updateTexts() {
    const links = this.querySelectorAll('[data-translate]');
    links.forEach(el => {
      const key = el.getAttribute('data-translate');
      el.textContent = translationService.t(key);
    });
  }

  initListeners() {
    // Variable Declarations for Hamburger Menu (moved here for scope)
    const hamburger = this.querySelector('.nav__hamburger');
    const navList = this.querySelector('.nav__list');
    const hamburgerIcon = hamburger?.querySelector('i');

    // Theme Toggle
    const themeBtn = this.querySelector('.btn--theme-toggle');
    themeBtn?.addEventListener('click', () => {
        themeService.toggleTheme();
        this.updateThemeIcon();
    });

    // Lang Menu Toggle
    const langToggle = this.querySelector('.nav__lang-toggle');
    const langMenu = this.querySelector('#lang-menu');
    langToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('active');
    });

    // Close lang menu on outside click
    document.addEventListener('click', (e) => {
        if (langMenu && !langMenu.contains(e.target) && !langToggle.contains(e.target)) {
            langMenu.classList.remove('active');
        }
    });

    // Language Selection
    const langOptions = this.querySelectorAll('.lang-option');
    langOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            translationService.setLanguage(lang);
            langMenu.classList.remove('active');
        });
    });

    // Hamburger Menu - Standard Click Event (Optimized via CSS touch-action)
    hamburger?.addEventListener('click', () => {
        navList.classList.toggle('display-nav-list');
        if (hamburgerIcon) {
            hamburgerIcon.className = navList.classList.contains('display-nav-list') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close nav on link click (mobile UX)
    const navLinks = this.querySelectorAll('.link--nav');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('display-nav-list')) {
                navList.classList.remove('display-nav-list');
                if (hamburgerIcon) hamburgerIcon.className = 'fas fa-bars';
            }
        });
    });
  }

  render() {
    this.innerHTML = `
    <header class="header center">
        <h3><a href="#" class="link logo">NM.</a></h3>
        <nav class="nav center">
        <ul class="nav__list center">
            <li class="nav__list-item">
            <a class="link link--nav" href="#about" data-translate="nav_about">Sobre mí</a>
            </li>
            <li class="nav__list-item">
            <a class="link link--nav" href="#skills" data-translate="nav_skills">Skills</a>
            </li>
            <li class="nav__list-item">
            <a class="link link--nav" href="#projects" data-translate="nav_projects">Proyectos</a>
            </li>
            <li class="nav__list-item">
            <a class="link link--nav" href="#contact" data-translate="nav_contact">Contacto</a>
            </li>
        </ul>

        <button type="button" aria-label="Alternar tema" class="btn btn--icon btn--theme-toggle">
            <i id="btn-theme" class="fas fa-moon" aria-hidden="true"></i>
        </button>

        <button type="button" aria-label="Cambiar idioma" class="btn btn--icon nav__lang-toggle">
            <i id="btn-lang" class="fas fa-globe" aria-hidden="true"></i>
        </button>
        <div class="lang-menu" id="lang-menu">
            <button class="lang-option" data-lang="es">Español</button>
            <button class="lang-option" data-lang="en">English</button>
            <button class="lang-option" data-lang="pt">Português</button>
            <button class="lang-option" data-lang="de">Deutsch</button>
        </div>

        <button type="button" aria-label="Menú" class="btn btn--icon nav__hamburger">
            <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
        </nav>
    </header>
    `;
  }
}

customElements.define('app-header', AppHeader);