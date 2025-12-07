export class ScrollTopBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.btn = this.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => this.handleScroll());

    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Check if GSAP and ScrollToPlugin are available
      if (window.gsap && window.ScrollToPlugin) {
        
        // Function to stop scrolling if user interacts
        const killScroll = () => {
            gsap.killTweensOf(window);
            window.removeEventListener('wheel', killScroll);
            window.removeEventListener('touchmove', killScroll);
            window.removeEventListener('touchstart', killScroll);
        };

        // Add listeners
        window.addEventListener('wheel', killScroll, { passive: true });
        window.addEventListener('touchmove', killScroll, { passive: true });
        window.addEventListener('touchstart', killScroll, { passive: true });

        gsap.to(window, { 
          duration: 1.5, 
          scrollTo: { y: 0, autoKill: true },
          ease: "power4.out",
          onComplete: () => {
            window.removeEventListener('wheel', killScroll);
            window.removeEventListener('touchmove', killScroll);
            window.removeEventListener('touchstart', killScroll);
          }
        });
      } else {
        // Fallback
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  handleScroll() {
    if (window.scrollY === 0) {
      this.btn.classList.remove('visible');
    } else if (window.scrollY > 100) { // Appear if scrolled past 100px
      this.btn.classList.add('visible');
    }
    // The button will remain visible if scrollY is between 1 and 100 once it has appeared.
  }

  render() {
    // We inherit global styles for .scroll-top from styles.css
    // Alternatively, we could shadow DOM it, but keeping global styles for simplicity with existing CSS
    this.innerHTML = `
      <a href="#" class="scroll-top" aria-label="Volver arriba">
        <i class="fas fa-arrow-up"></i>
      </a>
    `;
  }
}

customElements.define('scroll-top-btn', ScrollTopBtn);