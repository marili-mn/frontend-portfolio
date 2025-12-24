export class ScrollTopBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.btn = this.querySelector('.scroll-top');
    
    let ticking = false;
    const updateVisibility = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 300) {
            this.btn.classList.add('visible');
        } else {
            this.btn.classList.remove('visible');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateVisibility);
            ticking = true;
        }
    }, { passive: true });

    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.scrollToTop();
    });
  }

  scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    const topElement = document.getElementById('top') || document.body;
    if (topElement) {
        topElement.focus({ preventScroll: true }); 
        if (document.activeElement === topElement) {
             topElement.blur(); 
        }
    }
  }

  render() {
    // Using a robust Unicode Arrow (↑) instead of FontAwesome
    // This ensures visibility even if external libraries fail to load.
    this.innerHTML = `
      <a href="#" class="scroll-top" aria-label="Scroll to top">
        <span class="scroll-top__icon">↑</span>
      </a>
    `;
  }
}

customElements.define('scroll-top-btn', ScrollTopBtn);