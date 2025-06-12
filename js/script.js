const translations = {
  nav_projects: { es: 'Proyectos', en: 'Projects', pt: 'Projetos', de: 'Projekte' },
  nav_skills: { es: 'Skills', en: 'Skills', pt: 'Habilidades', de: 'Fähigkeiten' },
  nav_contact: { es: 'Contacto', en: 'Contact', pt: 'Contato', de: 'Kontakt' },
  about_role: { es: 'Desarrollador Web', en: 'Web Developer', pt: 'Desenvolvedor Web', de: 'Webentwickler' },
  about_desc_1: { 
    es: 'Soy Argentino y me formé como Técnico Universitario en Desarrollo Web en la Universidad Nacional de Entre Ríos (UNER). Actualmente, estudio Licenciatura en Ciberdefensa en la Facultad de Defensa Nacional (FADENA), donde me especializo en hacking ético y seguridad informática.',
    en: "I'm from Argentina and I graduated as a University Technician in Web Development from the National University of Entre Ríos (UNER). Currently, I'm studying for a Bachelor's Degree in Cyberdefense at the National Defense Faculty (FADENA), where I specialize in ethical hacking and cybersecurity.",
    pt: 'Sou argentino e me formei como Técnico Universitário em Desenvolvimento Web na Universidade Nacional de Entre Ríos (UNER). Atualmente, estudo a Licenciatura em Ciberdefesa na Faculdade de Defesa Nacional (FADENA), onde me especializo em hacking ético e segurança da informação.',
    de: 'Ich komme aus Argentinien und habe einen Abschluss als Universitätstechniker in Webentwicklung von der Nationalen Universität Entre Ríos (UNER). Derzeit studiere ich einen Bachelor in Cyberverteidigung an der Nationalen Verteidigungsfakultät (FADENA), wo ich mich auf ethisches Hacken und Cybersicherheit spezialisiere.'
  },
  about_desc_2: {
    es: 'Trabajo como freelance especializado en Backend, aunque disfruto abordar proyectos Full-Stack que integran diseño gráfico, arquitectura de software y ciberseguridad.',
    en: 'I work as a freelance developer specializing in Backend, although I enjoy taking on Full-Stack projects that integrate graphic design, software architecture, and cybersecurity.',
    pt: 'Trabalho como freelancer especializado em Backend, embora goste de assumir projetos Full-Stack que integram design gráfico, arquitetura de software e cibersegurança.',
    de: 'Ich arbeite als freiberuflicher Entwickler mit Spezialisierung auf Backend, obwohl ich gerne Full-Stack-Projekte übernehme, die Grafikdesign, Softwarearchitektur und Cybersicherheit integrieren.'
  },
  about_desc_3: {
    es: 'Me gusta pensar la tecnología desde una mirada multidisciplinaria: uniendo creatividad, análisis y técnica para crear soluciones sólidas y adaptables. Estoy siempre en búsqueda de nuevos retos que me permitan crecer y aportar valor real, colaborando en equipos y proyectos que crucen diferentes disciplinas.',
    en: 'I like to think about technology from a multidisciplinary perspective: combining creativity, analysis, and technique to create solid and adaptable solutions. I am always looking for new challenges that allow me to grow and provide real value, collaborating in teams and projects that cross different disciplines.',
    pt: 'Gosto de pensar a tecnologia a partir de uma perspectiva multidisciplinar: unindo criatividade, análise e técnica para criar soluções sólidas e adaptáveis. Estou sempre em busca de novos desafios que me permitam crescer e agregar valor real, colaborando em equipes e projetos que cruzam diferentes disciplinas.',
    de: 'Ich betrachte Technologie gerne aus einer multidisziplinären Perspektive: Kreativität, Analyse und Technik zu verbinden, um solide und anpassungsfähige Lösungen zu schaffen. Ich bin immer auf der Suche nach neuen Herausforderungen, die es mir ermöglichen, zu wachsen und echten Mehrwert zu schaffen, indem ich in Teams und Projekten zusammenarbeite, die verschiedene Disziplinen überschreiten.'
  },
  cv_button: { es: 'CV', en: 'Resume', pt: 'Currículo', de: 'Lebenslauf' },
  skills_title: { es: 'Skills', en: 'Skills', pt: 'Habilidades', de: 'Fähigkeiten' },
  frontend_title: { es: 'Frontend', en: 'Frontend', pt: 'Frontend', de: 'Frontend' },
  backend_title: { es: 'Backend', en: 'Backend', pt: 'Backend', de: 'Backend' },
  other_tech_title: { es: 'Otras Tecnologías', en: 'Other Technologies', pt: 'Outras Tecnologias', de: 'Andere Technologien' },
  projects_title: { es: 'Proyectos', en: 'Projects', pt: 'Projetos', de: 'Projekte' },
  project1_desc: {
    es: 'Primeras practicas de frontend aplicadas en un negocio real.',
    en: 'First frontend practices applied to a real business.',
    pt: 'Primeiras práticas de frontend aplicadas a um negócio real.',
    de: 'Erste Frontend-Praktiken, die auf ein reales Unternehmen angewendet wurden.'
  },
  source_code: { es: 'Código fuente', en: 'Source code', pt: 'Código fonte', de: 'Quellcode' },
  live_demo: { es: 'Demo', en: 'Demo', pt: 'Demo', de: 'Demo' },
  contact_title: { es: 'Contacto', en: 'Contact', pt: 'Contato', de: 'Kontakt' },
  contact_button: { es: 'Escribíme', en: 'Email Me', pt: 'Envie um e-mail', de: 'E-Mail an mich' },
  footer_desc: {
    es: 'Multidisciplinario por esencia: desarrollo, seguridad y diseño al servicio de soluciones creativas y precisas.',
    en: 'Multidisciplinary by essence: development, security, and design at the service of creative and precise solutions.',
    pt: 'Multidisciplinar por essência: desenvolvimento, segurança e design a serviço de soluções criativas e precisas.',
    de: 'Im Wesentlichen multidisziplinär: Entwicklung, Sicherheit und Design im Dienste kreativer und präziser Lösungen.'
  },
  footer_connect: { es: 'Conectemos', en: "Let's Connect", pt: 'Vamos conectar-nos', de: 'Verbinden wir uns' },
  footer_copyright: { es: '© 2025 mariDev. Todos los derechos reservados.', en: '© 2025 mariDev. All rights reserved.', pt: '© 2025 mariDev. Todos os direitos reservados.', de: '© 2025 mariDev. Alle Rechte vorbehalten.' },
  back_to_top_aria: { es: 'Volver arriba', en: 'Back to top', pt: 'Voltar ao topo', de: 'Nach oben' },
};

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
  },

  // --- Theme Management ---
  setTheme(theme = 'light', icon = 'fa-sun') {
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
    const icon = this.elements.hamburgerButton.querySelector('i');
    const isOpen = this.elements.navList.classList.contains('display-nav-list');
    icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
    this.elements.navList.classList.toggle('display-nav-list');
    if (this.state.isLangMenuOpen) {
      this.toggleLangMenu();
    }
  },

  closeNav() {
    if (this.elements.navList.classList.contains('display-nav-list')) {
      this.toggleNav();
    }
  },

  // --- Language Menu Management ---
  toggleLangMenu() {
    this.state.isLangMenuOpen = !this.state.isLangMenuOpen;
    this.elements.langMenu.classList.toggle('active', this.state.isLangMenuOpen);
    if (this.state.isLangMenuOpen && this.elements.navList.classList.contains('display-nav-list')) {
      this.toggleNav();
    }
  },

  closeLangMenu() {
    if (this.state.isLangMenuOpen) {
      this.state.isLangMenuOpen = false;
      this.elements.langMenu.classList.remove('active');
    }
  },

  // --- Scroll-based UI Updates ---
  handleScroll() {
    const scrollY = window.scrollY;
    this.elements.scrollTopButton.classList.toggle('visible', scrollY > 500);
    this.elements.header.classList.toggle('scrolled', scrollY > 50);
  },

  // --- Interactive Elements ---
  initSmoothScroll() {
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth',
          });
          this.closeNav();
        }
      });
    });
  },

  // --- Keyboard Navigation ---
  initKeyboardNav() {
    this.elements.navList.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.state.currentNavLinkIndex = (this.state.currentNavLinkIndex + 1) % this.elements.navLinks.length;
        this.elements.navLinks[this.state.currentNavLinkIndex].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.state.currentNavLinkIndex = (this.state.currentNavLinkIndex - 1 + this.elements.navLinks.length) % this.elements.navLinks.length;
        this.elements.navLinks[this.state.currentNavLinkIndex].focus();
      }
    });
  },

  // --- Translation Management ---
  translatePage(lang) {
    if (!translations) return;
    this.elements.translatableElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[key] && translations[key][lang]) {
        if (element.tagName === 'A' && element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', translations[key][lang]);
        } else {
          element.textContent = translations[key][lang];
        }
      }
    });
  },

  setLanguage(lang) {
    this.state.currentLanguage = lang;
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
    this.translatePage(lang);
    this.closeLangMenu();
  },

  initTranslations() {
    this.setLanguage(this.state.currentLanguage);
    this.elements.langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        this.setLanguage(e.target.dataset.lang);
      });
    });
  },

  // --- Animations ---
  initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
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
  },

  // --- Event Listeners ---
  initEventListeners() {
    this.elements.themeButton?.parentElement.addEventListener('click', () => this.toggleTheme());
    this.elements.hamburgerButton?.addEventListener('click', () => this.toggleNav());
    this.elements.langToggleButton?.addEventListener('click', () => this.toggleLangMenu());
    window.addEventListener('scroll', () => this.handleScroll());
    document.addEventListener('click', (e) => {
      if (this.state.isLangMenuOpen && !this.elements.langMenu.contains(e.target) && !this.elements.langToggleButton.contains(e.target)) {
        this.closeLangMenu();
      }
    });
    this.initSmoothScroll();
    this.initKeyboardNav();
  },

  // --- Main Initializer ---
  init() {
    const theme = localStorage.getItem('portfolio-theme') || 'light';
    const icon = localStorage.getItem('portfolio-icon') || 'fa-sun';
    this.setTheme(theme, icon);
    this.initTranslations();
    this.initEventListeners();
    this.initAnimations();
    this.handleScroll();
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
          if (previewIframe.src !== previewUrl) {
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

Portfolio.init();
IframePreview.init();