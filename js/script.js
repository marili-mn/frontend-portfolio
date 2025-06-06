const Portfolio = {
  elements: {
    body: document.body,
    btnTheme: document.querySelector('#btn-theme'),
    btnHamburger: document.querySelector('.nav__hamburger'),
    navList: document.querySelector('.nav__list'),
    scrollTopBtn: document.querySelector('.scroll-top'),
    header: document.querySelector('.header'),
    navLinks: document.querySelectorAll('.link--nav'),
  },

  setTheme(theme, icon) {
    this.elements.body.className = theme;
    this.elements.btnTheme.className = `fas ${icon}`;
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-icon', icon);
  },

  toggleTheme() {
    const isDark = this.elements.body.classList.contains('dark');
    this.setTheme(isDark ? 'light' : 'dark', isDark ? 'fa-sun' : 'fa-moon');
  },

  toggleNav() {
    const icon = this.elements.btnHamburger.querySelector('i');
    const isOpen = icon.classList.contains('fa-bars');
    icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    this.elements.navList.classList.toggle('display-nav-list');
  },

  handleScroll() {
    const scrollY = window.scrollY;
    this.elements.scrollTopBtn.classList.toggle('visible', scrollY > 500);
    this.elements.header.classList.toggle('scrolled', scrollY > 50);
  },

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
          this.toggleNav();
        }
      });
    });
  },

  initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-animate]').forEach(element => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    gsap.fromTo(
      '.project',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects__grid',
          start: 'top 80%',
        },
      }
    );
  },

  init() {
    const theme = localStorage.getItem('portfolio-theme') || 'light';
    const icon = localStorage.getItem('portfolio-icon') || 'fa-sun';
    this.setTheme(theme, icon);

    this.elements.btnTheme?.addEventListener('click', () => this.toggleTheme());
    this.elements.btnHamburger?.addEventListener('click', () => this.toggleNav());
    window.addEventListener('scroll', () => this.handleScroll());
    this.initSmoothScroll();
    this.initAnimations();
  },
};

Portfolio.init();