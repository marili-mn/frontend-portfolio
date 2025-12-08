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
    // Ensure translations are loaded before attempting to update texts initially.
    if (translationService.loaded) {
        this.updateTexts();
    } else {
        window.addEventListener('translations-loaded', () => this.updateTexts());
    }
    this.updateThemeIndicator(themeService.getTheme());
    this.updateLangIndicator(translationService.currentLang);
  }

  updateTexts() { // Removed lang parameter, as currentLang is accessed directly
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

    // Close menu when clicking a link
    const navLinks = this.querySelectorAll('.nav__link');
    navLinks.forEach(n => n.addEventListener('click', () => {
      const navMenu = this.querySelector('#nav-menu');
      navMenu.classList.remove('show-menu');
    }));
  }

  render() {
    this.innerHTML = `
      <style>
        /* --- Component Critical Styles --- */
        
        /* 1. Layout Grid for Perfect Centering */
        .nav-grid {
            display: grid;
            grid-template-columns: 1fr auto 1fr; /* Left, Center, Right */
            align-items: center;
            width: 100%;
            height: 100%;
        }

        /* 2. Logo (Left) */
        .nav-logo-area {
            justify-self: start;
        }
        
        /* 3. Navigation Links (Center) */
        .nav-center-area {
            justify-self: center;
        }
        
        /* 4. Actions (Right) */
        .nav-actions-area {
            justify-self: end;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        /* --- LARGE DESKTOP (> 1024px) --- */
        @media screen and (min-width: 1025px) {
            .nav__list {
                display: flex;
                flex-direction: row;
                gap: 2.5rem;
                margin: 0;
                padding: 0;
            }
            
            .nav__hamburger {
                display: none !important;
            }

            .nav__menu-overlay {
                display: block; 
                position: static;
                background: transparent;
                width: auto;
                height: auto;
                padding: 0;
                box-shadow: none;
                opacity: 1;
                pointer-events: auto;
            }
        }

        /* --- TABLET & MOBILE (<= 1024px) --- 
           We treat Tablets (iPad Air/Mini) as "Mobile" navigation wise 
           because the links often don't fit comfortably. 
        */
        @media screen and (max-width: 1024px) {
            .nav-grid {
                grid-template-columns: 1fr 1fr; /* Logo, Actions */
            }
            
            /* Actions area must be above overlay to allow toggling */
            .nav-actions-area {
                position: relative;
                z-index: 10001; 
            }
            
            /* Center area (Links) becomes the hidden overlay */
            .nav-center-area {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: -1; 
            }

            .nav__menu-overlay {
                position: fixed;
                top: -120%; /* Hidden above */
                left: 0;
                width: 100%;
                height: 100vh;
                padding: 0;
                background-color: var(--clr-bg); 
                backdrop-filter: blur(15px);
                transition: top 0.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease;
                z-index: 10000; 
                opacity: 0;
                pointer-events: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                display: flex;
            }

            .nav__menu-overlay.show-menu {
                top: 0;
                opacity: 1;
                pointer-events: auto;
            }

            .nav__list {
                display: flex;
                flex-direction: column;
                gap: 3rem;
                align-items: center;
                text-align: center;
            }
            
            .nav__link {
                font-size: 2rem; /* Big touch targets */
                font-weight: 600;
            }

            .nav__hamburger {
                display: block;
                cursor: pointer;
                font-size: 1.5rem;
                padding: 10px;
                transition: transform 0.3s ease;
            }
            
            .show-menu-active-state .nav__hamburger {
                color: var(--clr-accent);
            }
        }

        /* --- SMALL MOBILE (iPhone SE, Fold - <= 380px) --- */
        @media screen and (max-width: 380px) {
            .nav-actions-area {
                gap: 8px; /* Tighter spacing */
            }
            
            .btn--tech {
                font-size: 0.7rem; /* Smaller text */
                padding: 6px 8px;
            }
            
            .nav__hamburger {
                font-size: 1.2rem;
            }
            
            .logo {
                font-size: 1.2rem;
            }
        }
        
        /* Language Menu Fix */
        .nav__lang-container {
            position: relative;
            overflow: visible !important;
            z-index: 1001; 
        }
      </style>

      <header class="header" id="header">
        <nav class="nav container nav-grid">
          
          <!-- Area 1: Logo -->
          <div class="nav-logo-area">
             <a href="#" class="logo">NM</a>
          </div>

          <!-- Area 2: Center Links (Desktop) / Mobile Overlay -->
          <div class="nav-center-area">
              <div class="nav__menu-overlay" id="nav-menu">
                <ul class="nav__list">
                  <li class="nav__item">
                    <a href="#about" class="nav__link link--nav active-link" data-translate="nav_about">Sobre mí</a>
                  </li>
                  <li class="nav__item">
                    <a href="#skills" class="nav__link link--nav" data-translate="nav_skills">Habilidades</a>
                  </li>
                  <li class="nav__item">
                    <a href="#projects" class="nav__link link--nav" data-translate="nav_projects">Proyectos</a>
                  </li>
                  <li class="nav__item">
                    <a href="#contact" class="nav__link link--nav" data-translate="nav_contact">Contacto</a>
                  </li>
                </ul>
              </div>
          </div>

          <!-- Area 3: Actions -->
          <div class="nav-actions-area">
            
            <!-- Theme -->
            <button class="btn--tech" aria-label="Toggle Theme" id="theme-toggle-btn">
                <span id="theme-indicator" class="hover-brackets">SYS:LGT</span>
            </button>

            <!-- Lab Zone Button (Industrial Access) -->
            <button class="btn--tech" aria-label="Access Lab Zone" id="artifacts-btn">
                <span class="hover-brackets">LAB_ZONE</span>
            </button>

            <!-- Language -->
            <div class="nav__lang-container">
                <button class="btn--tech nav__lang-toggle" aria-label="Cambiar idioma" id="lang-btn">
                    <span id="lang-indicator" class="hover-brackets">LNG:ES</span>
                    <i class="fas fa-chevron-down" style="margin-left: 5px; font-size: 0.8em;"></i>
                </button>
                <!-- NOTE: The menu is manipulated by JS to be fixed positioning (Nuclear Solution) -->
                <ul class="lang-menu" id="lang-menu">
                    <li class="lang-option" data-lang="es">ESPAÑOL</li>
                    <li class="lang-option" data-lang="en">ENGLISH</li>
                    <li class="lang-option" data-lang="pt">PORTUGUÊS</li>
                    <li class="lang-option" data-lang="de">DEUTSCH</li>
                </ul>
            </div>

            <!-- Hamburger (Mobile Only) -->
            <div class="nav__toggle nav__hamburger" id="nav-toggle">
              <i class="fas fa-bars"></i>
            </div>
          </div>
          
        </nav>
      </header>
    `;

    // Re-attach listeners manually
    setTimeout(() => {
        // Theme
        this.querySelector('#theme-toggle-btn')?.addEventListener('click', () => themeService.toggleTheme());
        
        // Lab Zone Access
        this.querySelector('#artifacts-btn')?.addEventListener('click', () => {
            const zone = document.querySelector('artifacts-zone');
            if(zone) zone.open();
        });

        // --- DIRTY SOLUTION FOR LANG MENU (Re-applying) ---
        const langBtn = this.querySelector('#lang-btn');
        const langMenu = this.querySelector('#lang-menu');
        
        if(langBtn && langMenu) {
            Object.assign(langMenu.style, {
                display: 'none',
                position: 'fixed', 
                zIndex: '999999',
                backgroundColor: 'var(--clr-bg)',
                border: '1px solid var(--clr-accent)',
                borderRadius: '4px',
                padding: '5px 0',
                minWidth: '150px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
                opacity: '1',
                transform: 'none'
            });

            langBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isVisible = langMenu.style.display === 'block';
                if (isVisible) {
                    langMenu.style.display = 'none';
                } else {
                    const rect = langBtn.getBoundingClientRect();
                    langMenu.style.top = `${rect.bottom + 5}px`;
                    const leftPos = rect.right - 150; 
                    langMenu.style.left = `${Math.max(10, leftPos)}px`; 
                    langMenu.style.display = 'block';
                }
            });

            this.querySelectorAll('.lang-option').forEach(opt => {
                opt.addEventListener('click', (e) => {
                   const lang = e.target.getAttribute('data-lang');
                   if(translationService && lang) translationService.setLanguage(lang);
                   langMenu.style.display = 'none';
                });
            });

            window.addEventListener('click', (e) => {
                if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
                    langMenu.style.display = 'none';
                }
            });
            window.addEventListener('scroll', () => { langMenu.style.display = 'none'; });
        }
        
        // --- MOBILE MENU LOGIC (Global Toggle) ---
        if (!window.mobileMenuInitialized) {
            window.mobileMenuInitialized = true;
            
            document.addEventListener('click', (e) => {
                const target = e.target;
                const toggleBtn = target.closest('#nav-toggle');
                const navLink = target.closest('.nav__link');
                const menuOverlay = document.querySelector('#nav-menu');

                if (!menuOverlay) return;

                // Toggle Open/Close
                if (toggleBtn) {
                    e.preventDefault();
                    menuOverlay.classList.toggle('show-menu');
                }

                // Close on Link click
                if (navLink && menuOverlay.classList.contains('show-menu')) {
                    menuOverlay.classList.remove('show-menu');
                }
                
                // Close on click outside (backdrop)
                // Since overlay covers 100vh, clicking "empty space" is clicking the overlay
                if (target === menuOverlay && menuOverlay.classList.contains('show-menu')) {
                     menuOverlay.classList.remove('show-menu');
                }
            });
        }
    }, 0);
  }
}

customElements.define('app-header', AppHeader);