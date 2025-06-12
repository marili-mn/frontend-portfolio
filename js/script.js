const Portfolio = {
  elements: {
    body: document.body,
    header: document.querySelector('.header'),
    themeButton: document.querySelector('#btn-theme'),
    hamburgerButton: document.querySelector('.nav__hamburger'),
    navList: document.querySelector('.nav__list'),
    navLinks: document.querySelectorAll('.link--nav'),
    scrollTopButton: document.querySelector('.scroll-top'),
    langToggleButton: document.querySelector('.nav__lang-toggle'),
    langMenu: document.querySelector('#lang-menu'),
    langOptions: document.querySelectorAll('.lang-option'),
    translatableElements: document.querySelectorAll('[data-translate]'),
  },

  state: {
    currentLanguage: localStorage.getItem('portfolio-lang') || 'es',
    currentNavLinkIndex: 0,
    isLangMenuOpen: false,
    translations: null,
    translationsLoaded: false,
  },

  // --- Initialization ---
  async init() {
    try {
      await this.loadTranslations();
      const theme = localStorage.getItem('portfolio-theme') || 'light';
      const icon = localStorage.getItem('portfolio-icon') || 'fa-sun';
      this.setTheme(theme, icon);
      this.initTranslations();
      this.initEventListeners();
      this.initAnimations();
      this.handleScroll();
    } catch (error) {
      console.error('Error during Portfolio initialization:', error);
      // Initialize without translations if they fail to load
      this.initFallback();
    }
  },

  // Fallback initialization without translations
  initFallback() {
    const theme = localStorage.getItem('portfolio-theme') || 'light';
    const icon = localStorage.getItem('portfolio-icon') || 'fa-sun';
    this.setTheme(theme, icon);
    this.initEventListeners();
    this.initAnimations();
    this.handleScroll();
    console.warn('Portfolio initialized without translations');
  },

  // --- Translation Management ---
  async loadTranslations() {
    try {
      // First, try to load from translations.json
      const response = await fetch('./translations.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      this.state.translations = await response.json();
      this.state.translationsLoaded = true;
      console.log('Translations loaded successfully from translations.json');
      
    } catch (error) {
      console.warn('Failed to load translations.json:', error.message);
      
      // Fallback: try to load from alternate paths
      const alternatePaths = ['translations.json', './assets/translations.json', './js/translations.json'];
      
      for (const path of alternatePaths) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            this.state.translations = await response.json();
            this.state.translationsLoaded = true;
            console.log(`Translations loaded from alternate path: ${path}`);
            return;
          }
        } catch (altError) {
          console.warn(`Failed to load from ${path}:`, altError.message);
        }
      }
      
      // Final fallback: use embedded translations
      console.warn('Using embedded translations as fallback');
      this.loadEmbeddedTranslations();
    }
  },

  // Embedded translations as ultimate fallback
  loadEmbeddedTranslations() {
    this.state.translations = {
      "nav_projects": { "es": "Proyectos", "en": "Projects", "pt": "Projetos", "de": "Projekte" },
      "nav_skills": { "es": "Skills", "en": "Skills", "pt": "Habilidades", "de": "Fähigkeiten" },
      "nav_contact": { "es": "Contacto", "en": "Contact", "pt": "Contato", "de": "Kontakt" },
      "about_role": { "es": "Desarrollador Web", "en": "Web Developer", "pt": "Desenvolvedor Web", "de": "Webentwickler" },
      "contact_title": { "es": "Contacto", "en": "Contact", "pt": "Contato", "de": "Kontakt" },
      "contact_button": { "es": "Escribíme", "en": "Email Me", "pt": "Envie um e-mail", "de": "E-Mail an mich" },
      "back_to_top_aria": { "es": "Volver arriba", "en": "Back to top", "pt": "Voltar ao topo", "de": "Nach oben" }
    };
    this.state.translationsLoaded = true;
  },

  translatePage(lang) {
    if (!this.state.translations || !this.state.translationsLoaded) {
      console.warn('Translations not loaded, skipping translation');
      return;
    }
    
    // Re-query translatable elements in case DOM has changed
    const translatableElements = document.querySelectorAll('[data-translate]');
    
    translatableElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      
      if (!key) {
        console.warn('Element missing data-translate key:', element);
        return;
      }
      
      const translation = this.state.translations[key];
      if (!translation) {
        console.warn(`Translation key not found: ${key}`);
        return;
      }
      
      const translatedText = translation[lang];
      if (!translatedText) {
        console.warn(`Translation not found for key: ${key}, language: ${lang}`);
        return;
      }
      
      try {
        // Handle different element types
        if (element.tagName === 'A' && element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', translatedText);
        } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', translatedText);
        } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
          element.setAttribute('alt', translatedText);
        } else {
          // For most elements, update text content
          element.textContent = translatedText;
        }
      } catch (error) {
        console.error(`Error translating element with key ${key}:`, error);
      }
    });
  },

  setLanguage(lang) {
    // Validate language
    const supportedLanguages = ['es', 'en', 'pt', 'de'];
    if (!supportedLanguages.includes(lang)) {
      console.warn(`Unsupported language: ${lang}, defaulting to 'es'`);
      lang = 'es';
    }
    
    this.state.currentLanguage = lang;
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
    
    // Update active language in UI
    this.updateLanguageUI(lang);
    
    // Translate page
    this.translatePage(lang);
    this.closeLangMenu();
    
    console.log(`Language changed to: ${lang}`);
  },

  updateLanguageUI(lang) {
    // Update language toggle button text
    if (this.elements.langToggleButton) {
      this.elements.langToggleButton.textContent = lang.toUpperCase();
    }
    
    // Update active state in language options
    this.elements.langOptions.forEach(option => {
      const optionLang = option.dataset.lang;
      option.classList.toggle('active', optionLang === lang);
    });
  },

  initTranslations() {
    // Wait for translations to load before setting language
    if (!this.state.translationsLoaded) {
      console.warn('Translations not loaded yet, retrying...');
      setTimeout(() => this.initTranslations(), 100);
      return;
    }
    
    this.setLanguage(this.state.currentLanguage);
    
    // Add event listeners to language options
    this.elements.langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = e.target.dataset.lang;
        if (selectedLang) {
          this.setLanguage(selectedLang);
        }
      });
    });
  },

  // --- Theme Management ---
  setTheme(theme = 'light', icon = 'fa-sun') {
    // Validate theme
    const validThemes = ['light', 'dark'];
    if (!validThemes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}, defaulting to 'light'`);
      theme = 'light';
    }
    
    this.elements.body.className = theme;
    if (this.elements.themeButton) {
      this.elements.themeButton.className = `fas ${icon}`;
    }
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-icon', icon);
  },

  toggleTheme() {
    const isDark = this.elements.body.classList.contains('dark');
    this.setTheme(isDark ? 'light' : 'dark', isDark ? 'fa-sun' : 'fa-moon');
  },

  // --- Navigation Management ---
  toggleNav() {
    const icon = this.elements.hamburgerButton?.querySelector('i');
    const isOpen = this.elements.navList?.classList.contains('display-nav-list');
    
    if (icon) {
      icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
    }
    
    if (this.elements.navList) {
      this.elements.navList.classList.toggle('display-nav-list');
    }
    
    if (this.state.isLangMenuOpen) {
      this.toggleLangMenu();
    }
  },

  closeNav() {
    if (this.elements.navList?.classList.contains('display-nav-list')) {
      this.toggleNav();
    }
  },

  // --- Language Menu Management ---
  toggleLangMenu() {
    this.state.isLangMenuOpen = !this.state.isLangMenuOpen;
    
    if (this.elements.langMenu) {
      this.elements.langMenu.classList.toggle('active', this.state.isLangMenuOpen);
    }
    
    if (this.state.isLangMenuOpen && this.elements.navList?.classList.contains('display-nav-list')) {
      this.toggleNav();
    }
  },

  closeLangMenu() {
    if (this.state.isLangMenuOpen) {
      this.state.isLangMenuOpen = false;
      if (this.elements.langMenu) {
        this.elements.langMenu.classList.remove('active');
      }
    }
  },

  // --- Scroll-based UI Updates ---
  handleScroll() {
    const scrollY = window.scrollY;
    
    if (this.elements.scrollTopButton) {
      this.elements.scrollTopButton.classList.toggle('visible', scrollY > 500);
    }
    
    if (this.elements.header) {
      this.elements.header.classList.toggle('scrolled', scrollY > 50);
    }
  },

  // --- Interactive Elements ---
  initSmoothScroll() {
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (!href || !href.startsWith('#')) {
          console.warn('Invalid link href:', href);
          return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth',
          });
          this.closeNav();
        } else {
          console.warn('Target element not found:', targetId);
        }
      });
    });
  },

  // --- Keyboard Navigation ---
  initKeyboardNav() {
    if (!this.elements.navList) return;
    
    this.elements.navList.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.state.currentNavLinkIndex = (this.state.currentNavLinkIndex + 1) % this.elements.navLinks.length;
        this.elements.navLinks[this.state.currentNavLinkIndex]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.state.currentNavLinkIndex = (this.state.currentNavLinkIndex - 1 + this.elements.navLinks.length) % this.elements.navLinks.length;
        this.elements.navLinks[this.state.currentNavLinkIndex]?.focus();
      }
    });
  },

  // --- Animations ---
  initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn('GSAP or ScrollTrigger not loaded, skipping animations');
      return;
    }
    
    try {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate elements with data-animate attribute
      document.querySelectorAll('[data-animate]').forEach(element => {
        gsap.fromTo(element, 
          { opacity: 0, y: 30 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: { 
              trigger: element, 
              start: 'top 85%', 
              toggleActions: 'play none none none' 
            }
          }
        );
      });
      
      // Animate project elements
      document.querySelectorAll('.project').forEach(project => {
        gsap.fromTo(project, 
          { scale: 0.95, opacity: 0 }, 
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6, 
            ease: 'power2.out',
            scrollTrigger: { 
              trigger: project, 
              start: 'top 85%' 
            }
          }
        );
      });
    } catch (error) {
      console.error('Error initializing animations:', error);
    }
  },

  // --- Event Listeners ---
  initEventListeners() {
    // Theme toggle
    this.elements.themeButton?.parentElement.addEventListener('click', () => this.toggleTheme());
    
    // Navigation toggle
    this.elements.hamburgerButton?.addEventListener('click', () => this.toggleNav());
    
    // Language toggle
    this.elements.langToggleButton?.addEventListener('click', () => this.toggleLangMenu());
    
    // Scroll handling
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Click outside to close language menu
    document.addEventListener('click', (e) => {
      if (this.state.isLangMenuOpen && 
          this.elements.langMenu && 
          this.elements.langToggleButton &&
          !this.elements.langMenu.contains(e.target) && 
          !this.elements.langToggleButton.contains(e.target)) {
        this.closeLangMenu();
      }
    });
    
    // Initialize smooth scroll and keyboard navigation
    this.initSmoothScroll();
    this.initKeyboardNav();
  },
};

const IframePreview = {
  init() {
    document.querySelectorAll('.project.with-preview').forEach(project => {
      const previewLink = project.querySelector('.project__links a[data-preview]');
      const previewIframe = project.querySelector('.preview-iframe');
      
      if (!previewLink || !previewIframe) return;
      
      let timeoutId;
      
      project.addEventListener('mouseenter', () => {
        timeoutId = setTimeout(() => {
          const previewUrl = previewLink.getAttribute('data-preview');
          if (previewUrl && previewIframe.src !== previewUrl) {
            previewIframe.src = previewUrl;
          }
        }, 200);
      });
      
      project.addEventListener('mouseleave', () => {
        clearTimeout(timeoutId);
      });
    });
  },
};

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Portfolio.init();
    IframePreview.init();
    console.log('Portfolio initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Portfolio:', error);
  }
});