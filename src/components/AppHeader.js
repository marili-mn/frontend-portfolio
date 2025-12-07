import { themeService } from '../services/ThemeService.js';
import { translationService } from '../services/TranslationService.js';

export class AppHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initListeners();
    
    window.addEventListener('language-changed', (e) => {
        this.updateTexts(e.detail.language);
        this.updateLangIndicator(e.detail.language);
    });
    
    window.addEventListener('theme-changed', (e) => {
        this.updateThemeIndicator(e.detail.theme);
    });
    
    // Init states
    this.updateTexts(translationService.currentLang);
    this.updateThemeIndicator(themeService.getTheme());
    this.updateLangIndicator(translationService.currentLang);
  }

  updateTexts(lang) {
    const links = this.querySelectorAll('[data-translate]');
    links.forEach(el => {
      const key = el.getAttribute('data-translate');
      el.textContent = translationService.t(key);
    });
  }
  
  updateThemeIndicator(theme) {
      const indicator = this.querySelector('#theme-indicator');
      if(indicator) {
          // Toggles between SYS: DRK and SYS: LGT
          indicator.textContent = theme === 'dark' ? 'SYS:DRK' : 'SYS:LGT';
      }
  }

  updateLangIndicator(lang) {
      const indicator = this.querySelector('#lang-indicator');
      if(indicator) {
          // Shows LNG: ES, LNG: EN, etc.
          indicator.textContent = `LNG:${lang.toUpperCase()}`;
      }
  }

  initListeners() {
    const hamburger = this.querySelector('.nav__hamburger');
    const navList = this.querySelector('.nav__list');
    const hamburgerText = this.querySelector('#menu-text');

    // Theme Toggle
    const themeBtn = this.querySelector('.btn--theme-toggle');
    themeBtn?.addEventListener('click', () => {
        themeService.toggleTheme();
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

    // Hamburger Menu
    hamburger?.addEventListener('click', () => {
        navList.classList.toggle('display-nav-list');
        if (hamburgerText) {
            // Toggle text between // MENU and // CLOSE
            hamburgerText.textContent = navList.classList.contains('display-nav-list') ? '// CLOSE' : '// MENU';
        }
    });

    // Close nav on link click
    const navLinks = this.querySelectorAll('.link--nav');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('display-nav-list')) {
                navList.classList.remove('display-nav-list');
                if (hamburgerText) hamburgerText.textContent = '// MENU';
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

        <!-- Tech Toggle: Theme -->
        <button type="button" aria-label="Alternar tema" class="btn btn--tech btn--theme-toggle">
            <span id="theme-indicator">SYS:DRK</span>
        </button>

        <!-- Tech Toggle: Lang -->
        <button type="button" aria-label="Cambiar idioma" class="btn btn--tech nav__lang-toggle">
            <span id="lang-indicator">LNG:ES</span>
        </button>
        
        <div class="lang-menu" id="lang-menu">
            <button class="lang-option" data-lang="es">ES - Español</button>
            <button class="lang-option" data-lang="en">EN - English</button>
            <button class="lang-option" data-lang="pt">PT - Português</button>
            <button class="lang-option" data-lang="de">DE - Deutsch</button>
        </div>

        <!-- Tech Toggle: Menu -->
        <button type="button" aria-label="Menú" class="btn btn--tech nav__hamburger">
            <span id="menu-text" class="hover-brackets">// MENU</span>
        </button>
        </nav>
    </header>
    `;
  }
}

customElements.define('app-header', AppHeader);