export class ScrollTopBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.btn = this.querySelector('.scroll-top');
    
    // Throttled scroll handler using requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                this.handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Simple check for mobile/tablet
      const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
          // MOBILE OPTIMIZATION:
          // We call scrollTo(0,0) (instant). 
          // Because 'html { scroll-behavior: smooth; }' exists in CSS, 
          // the BROWSER NATIVELY animates this. 
          // This decouples the animation from the JS thread, making it immune to touch interruptions.
          window.scrollTo(0, 0);
      } else if (window.gsap && window.ScrollToPlugin) {
        
        // Function to stop scrolling if user interacts
        const killScroll = () => {
            gsap.killTweensOf(window);
            window.removeEventListener('wheel', killScroll);
            window.removeEventListener('touchmove', killScroll); // Fallback for touch laptops
            window.removeEventListener('touchstart', killScroll);
        };

        // Add listeners with a delay
        setTimeout(() => {
            window.addEventListener('wheel', killScroll, { passive: true });
            window.addEventListener('touchmove', killScroll, { passive: true });
            window.addEventListener('touchstart', killScroll, { passive: true });
        }, 100); // Short delay for desktop is fine

        gsap.to(window, { 
          duration: 1.5, 
          scrollTo: { y: 0, autoKill: false },
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