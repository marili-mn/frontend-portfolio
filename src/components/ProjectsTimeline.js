import { projects } from '../data/projectsData.js';
import { translationService } from '../services/TranslationService.js';

export class ProjectsTimeline extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initAnimations();
    window.addEventListener('language-changed', () => this.updateTexts());
  }

  updateTexts() {
    // Los nodos HEAD y ROOT podrían necesitar traducción si decides cambiar el texto técnico
    // Por ahora son "técnicos" (inglés universal), así que no es crítico, 
    // pero re-renderizamos por si acaso.
    this.render();
    this.initAnimations();
  }

  render() {
    // Projects are already sorted Newest -> Oldest in data
    const items = projects.map((project, index) => `
      <div class="timeline-item" data-animate-item>
        <div class="timeline-connector"></div>
        <project-card data-project='${JSON.stringify(project)}'></project-card>
      </div>
    `).join('');

    this.innerHTML = `
      <div class="timeline-container">
        
        <!-- HEAD NODE -->
        <div class="timeline-node head-node">
            <div class="node-label">ACTUALIDAD</div>
            <div class="node-indicator"></div>
        </div>

        <!-- THE STACK -->
        <div class="timeline-stack">
            <div class="timeline-line"></div>
            ${items}
        </div>

        <!-- ROOT NODE -->
        <div class="timeline-node root-node">
            <div class="node-indicator"></div>
            <div class="node-label">ORÍGENES</div>
        </div>

      </div>
    `;
  }

  initAnimations() {
    // GSAP integration if available
    if (window.gsap && window.ScrollTrigger) {
        const items = this.querySelectorAll('.timeline-item');
        
        items.forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Animate the line drawing? 
        // For now, simple fade in of the whole container is enough or per-item
    }
  }
}

customElements.define('projects-timeline', ProjectsTimeline);
