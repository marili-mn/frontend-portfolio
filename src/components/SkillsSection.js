import { skills } from '../data/skillsData.js';
import { translationService } from '../services/TranslationService.js';

export class SkillsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    window.addEventListener('language-changed', () => this.updateTexts());
    
    // Strict check for desktop capability
    if (window.matchMedia('(pointer: fine)').matches) {
        this.initDesktopInteractions();
    }
  }

  updateTexts() {
      const titles = this.shadowRoot.querySelectorAll('[data-translate]');
      titles.forEach(el => {
          const key = el.getAttribute('data-translate');
          el.textContent = translationService.t(key);
      });
  }

  initDesktopInteractions() {
    const wrapper = this.shadowRoot.querySelector('.skills-wrapper');
    const cards = this.shadowRoot.querySelectorAll('.skill-card');

    if (!wrapper) return;

    // --- GLOBAL CROSSHAIR LOGIC ---
    let rafId = null;
    let lastX = 0, lastY = 0;

    wrapper.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        
        if (!rafId) {
            rafId = requestAnimationFrame(() => {
                const rect = wrapper.getBoundingClientRect();
                const x = lastX - rect.left;
                const y = lastY - rect.top;
                
                wrapper.style.setProperty('--cursor-x', `${x}px`);
                wrapper.style.setProperty('--cursor-y', `${y}px`);
                wrapper.classList.add('interacting');
                rafId = null;
            });
        }
    });

    wrapper.addEventListener('mouseleave', () => {
        wrapper.classList.remove('interacting');
        if(rafId) cancelAnimationFrame(rafId);
    });

    // --- LOCAL CARD LOGIC (COORDS) ---
    cards.forEach(card => {
        let cardRaf = null;
        const coordsDisplay = card.querySelector('.tech-coords');
        let isHovering = false;

        card.addEventListener('mouseenter', () => {
            isHovering = true;
            if(coordsDisplay) coordsDisplay.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            if(cardRaf) cancelAnimationFrame(cardRaf);
            
            if (coordsDisplay) {
                coordsDisplay.classList.remove('active');
                // Reset text after transition
                setTimeout(() => {
                    if(!isHovering) coordsDisplay.textContent = 'READY';
                }, 200);
            }
        });
        
        card.addEventListener('mousemove', (e) => {
            // Only process if hovering this specific card
            if (!isHovering) return;

            if (!cardRaf) {
                cardRaf = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = Math.floor(e.clientX - rect.left);
                    const y = Math.floor(e.clientY - rect.top);
                    
                    card.style.setProperty('--local-x', `${x}px`);
                    card.style.setProperty('--local-y', `${y}px`);
                    
                    if (coordsDisplay) {
                        coordsDisplay.textContent = `X:${x} Y:${y}`;
                    }
                    cardRaf = null;
                });
            }
        });
    });
  }

  getStyles() {
    return `
      <style>
        :host {
          display: block;
          
          /* GLOBAL VARS from root */
          --bg-main: var(--clr-bg); 
          --grid-line-color-dark: rgba(255, 255, 255, 0.25); /* Increased for better prominence */
          --grid-line-color-light: rgba(0, 0, 0, 0.25);   /* Increased for better prominence */
          
          /* Determine actual grid line color based on body class */
          --grid-actual-color: var(--grid-line-color-dark);
          
          /* Card backgrounds for skills */
          --card-bg-dark: #1e293b; 
          --card-bg-light: #ffffff; 
          --card-bg-actual: var(--card-bg-dark);

          /* Text colors */
          --text-main: var(--clr-fg);
          --text-dim: var(--clr-text-secondary);
          --accent-color: var(--clr-accent);
          
          --crosshair-color: var(--clr-accent); 
          --crosshair-width: 1.5px;
          --crosshair-opacity: 0.6; 

          --font-tech: var(--font-mono); 
        }

        /* Adjust colors based on body theme via CSS cascade if host context doesn't catch it 
           Using :host-context to robustly detect theme on parent */
        :host-context(body.light) {
            --grid-actual-color: var(--grid-line-color-light);
            --card-bg-actual: var(--card-bg-light);
            --text-main: #1c1917; /* Ensure dark text */
            --text-dim: #57534e;
        }

        /* Fallback if :host-context isn't supported or working as expected with the specific setup */
        body.light skills-section {
            --grid-actual-color: var(--grid-line-color-light);
            --card-bg-actual: var(--card-bg-light);
        }

        .skills-wrapper {
          position: relative;
          --cursor-x: -1000px;
          --cursor-y: -1000px;
          padding: 4rem 1rem;
          overflow: hidden;
          
          /* GRID BACKGROUND */
          background-color: var(--bg-main);
          background-image: 
            linear-gradient(var(--grid-actual-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-actual-color) 1px, transparent 1px);
          background-size: 40px 40px;
          border-top: 1px solid var(--grid-actual-color);
          border-bottom: 1px solid var(--grid-actual-color);
        }

        /* ... [Rest of Styles] ... */

        .skill-card { 
          background: var(--card-bg-actual); 
          /* Permanent subtle border for differentiation in both modes */
          border: 1px solid var(--grid-actual-color); 
          position: relative; height: 130px; padding: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: all 0.2s ease; z-index: 2; overflow: hidden; --local-x: 50%; --local-y: 50%; 
          color: var(--text-main); 
        }
        
        /* Dark Mode Specific: Enhance border visibility slightly if grid color is too subtle */
        :host-context(body:not(.light)) .skill-card {
            border-color: rgba(255, 255, 255, 0.15); /* Slightly clearer border than the grid */
        }
        
        /* Specific Light Mode Card Overrides */
        :host-context(body.light) .skill-card {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); 
        }
        
        :host-context(body.light) .tech-name {
            color: var(--text-main);
            font-weight: 600;
        }
        
        /* Light Mode: Icon Tint/Illumination in resting state (Optional, keeps it clean but distinct) */
        :host-context(body.light) .tech-icon {
            /* Give icons a slight presence even without hover */
            opacity: 0.8; 
            filter: grayscale(100%); 
        }

        /* Light Mode Hover Effect - "Illuminated" */
        :host-context(body.light) .skill-card:hover {
            background: #ffffff;
            border-color: var(--accent-color);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--accent-color);
        }

        /* Dark Mode Hover Effect */
        :host-context(body:not(.light)) .skill-card:hover {
            background: var(--card-bg-dark);
            box-shadow: 0 0 20px rgba(167, 139, 250, 0.15); /* Violet glow */
            outline: 1px solid var(--accent-color);
        }

        /* ============================================================
           DESKTOP EXPERIENCE (Crosshair + Dynamic Coords)
           ============================================================ */
        @media (hover: hover) and (pointer: fine) {
            .skills-wrapper {
                cursor: crosshair;
            }

            /* Global Crosshair Elements */
            .skills-wrapper::before,
            .skills-wrapper::after {
                content: '';
                position: absolute;
                background: var(--crosshair-color);
                z-index: 5; /* Ensured visibility over grid */
                pointer-events: none;
                opacity: 0; 
                transition: opacity 0.1s;
                /* Optional glow for crosshair */
                box-shadow: 0 0 2px var(--crosshair-color);
            }
            
            /* Vertical Line */
            .skills-wrapper::before { 
                top: 0; bottom: 0; left: var(--cursor-x); width: var(--crosshair-width); 
            }
            
            /* Horizontal Line */
            .skills-wrapper::after { 
                left: 0; right: 0; top: var(--cursor-y); height: var(--crosshair-width); 
            }

            /* Show Crosshair when interacting class is added via JS */
            .skills-wrapper.interacting::before,
            .skills-wrapper.interacting::after { 
                opacity: 0.4; /* Reduced from 0.8 for subtler effect globally */
            }
            
            /* Light Mode specific crosshair adjustments if needed */
            :host-context(body.light) .skills-wrapper.interacting::before,
            :host-context(body.light) .skills-wrapper.interacting::after {
                opacity: 0.2; /* Even subtler on white background */
            }

            /* Card Hover Effects on Desktop */
            .skill-card:hover {
                background: var(--card-bg-actual);
                z-index: 10;
                outline: 1px solid var(--accent-color); 
            }

            /* Light Mode Specific Hover Styling for "Illuminated" feel */
            :host-context(body.light) .skill-card:hover {
                background: #ffffff;
                /* Stronger, more colored shadow for illumination */
                box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--accent-color);
                outline: none; 
                border-color: var(--accent-color);
            }
            
            /* Ensure icons get full color on hover in light mode */
            :host-context(body.light) .skill-card:hover .tech-icon {
                filter: grayscale(0%) opacity(1) !important; 
                transform: scale(1.15);
            }
            
            /* Dark Mode Specific Hover Styling */
            :host-context(body:not(.light)) .skill-card:hover {
                box-shadow: 0 0 20px rgba(167, 139, 250, 0.15);
            }

            /* Show internal axis on hover */
            .skill-card:hover .local-axis-x, 
            .skill-card:hover .local-axis-y { opacity: 0.5; }
            
            .skill-card:hover .local-intersection { opacity: 1; }
            
        /* Icon Scale (Common for both light/dark hover) */
            .skill-card:hover .tech-icon { filter: grayscale(0%) opacity(1); transform: scale(1.15); }
            /* Text Color for Hover */
            :host-context(body:not(.light)) .skill-card:hover .tech-icon-text { transform: scale(1.15); color: var(--accent-color); text-shadow: 0 0 8px var(--accent-color); }
            /* Light Mode Specific Hover for Text Icons: Invert and "illuminate" */
            :host-context(body.light) .skill-card:hover .tech-icon-text { 
                transform: scale(1.15); 
                color: var(--clr-bg); /* Use paper color for text */
                background-color: var(--accent-color); /* Use black ink color for background */
                box-shadow: 0 0 5px rgba(0,0,0,0.2); /* Subtle glow for the pill */
                border-radius: 3px; /* Slightly rounded corners for the pill effect */
                padding: 0 4px; /* Some padding for the pill */
                transition: all 0.2s ease; /* Smooth transition */
            }
        }

        /* ============================================================
           MOBILE EXPERIENCE (Touch Feedback Only)
           ============================================================ */
        @media (hover: none), (pointer: coarse) {
            .skills-wrapper {
                cursor: default;
                background-size: 20px 20px;
                padding: 3rem 1rem;
            }
            
            .skills-grid { gap: 1rem; }

            .skill-card {
                border: 1px solid var(--grid-actual-color); /* Use grid color for mobile card border */
                height: 115px;
                -webkit-tap-highlight-color: transparent;
            }

            /* Active State for Touch */
            .skill-card:active {
                background: var(--card-bg-actual);
                outline: 1px solid var(--accent-color);
                z-index: 5;
            }

            /* Show elements on active/touch */
            .local-axis-x, .local-axis-y, .local-intersection, .tech-coords {
                opacity: 0;
                transition: opacity 0.1s;
            }
            
            .skill-card:active .local-axis-x,
            .skill-card:active .local-axis-y,
            .skill-card:active .local-intersection,
            .skill-card:active .tech-coords {
                opacity: 1;
            }

            /* Always colored icons on mobile */
            .tech-icon { filter: grayscale(0%) opacity(1); transform: scale(1); }
            .tech-icon-text { color: var(--text-main); transform: scale(1); }
            
            /* Static centered crosshair for mobile aesthetic */
            .skill-card { --local-x: 50% !important; --local-y: 50% !important; }
        }

        /* ============================================================
           COMMON STYLES
           ============================================================ */
        .section-header { text-align: center; margin-bottom: 3rem; z-index: 2; }
        .section-title { font-family: var(--font-tech); font-size: clamp(2rem, 5vw, 2.5rem); color: var(--text-main); margin: 0; text-transform: uppercase; letter-spacing: 5px; background: var(--bg-main); padding: 0 15px; line-height: 1; display: inline-block; }

        .categories-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }
        .category-title-wrapper { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; gap: 1rem; }
        .category-title { font-family: var(--font-tech); color: var(--text-dim); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 3px; }
        .line-deco { height: 1px; background: var(--accent-color); width: 40px; opacity: 0.5; }

        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 2px; justify-content: center; }

        .skill-card { 
          background: var(--card-bg-actual); 
          border: 1px solid var(--grid-actual-color); /* Added explicit border for separation */
          position: relative; height: 130px; padding: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: all 0.2s ease; z-index: 2; overflow: hidden; --local-x: 50%; --local-y: 50%; 
        }

        /* Internal Axis Lines */
        .local-axis-x, .local-axis-y { position: absolute; background: var(--accent-color); pointer-events: none; transition: opacity 0.2s; opacity: 0; }
        .local-axis-x { top: 0; bottom: 0; left: var(--local-x); width: 1px; }
        .local-axis-y { left: 0; right: 0; top: var(--local-y); height: 1px; }

        /* Ticks */
        .local-axis-x::before { content: ''; position: absolute; top: 0; left: -2px; width: 5px; height: 1px; background: var(--accent-color); }
        .local-axis-x::after { content: ''; position: absolute; bottom: 0; left: -2px; width: 5px; height: 1px; background: var(--accent-color); }
        .local-axis-y::before { content: ''; position: absolute; left: 0; top: -2px; height: 5px; width: 1px; background: var(--accent-color); }
        .local-axis-y::after { content: ''; position: absolute; right: 0; top: -2px; height: 5px; width: 1px; background: var(--accent-color); }

        .local-intersection { position: absolute; left: var(--local-x); top: var(--local-y); width: 6px; height: 6px; border: 1px solid var(--accent-color); transform: translate(-50%, -50%); border-radius: 50%; opacity: 0; transition: opacity 0.2s; }

        .card-main { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; z-index: 2; width: 100%; }
        .tech-icon { width: 40px; height: 40px; filter: grayscale(100%) opacity(0.7); transition: transform 0.3s, filter 0.3s; }
        .tech-icon-text { font-family: var(--font-tech); font-weight: 800; font-size: 1.5rem; color: var(--text-dim); display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; transition: transform 0.3s, color 0.3s; }
        .tech-name { font-family: var(--font-tech); font-size: 0.85rem; color: var(--text-main); font-weight: 500; letter-spacing: 1px; text-align: center; }

        /* Coords Text */
        .tech-coords {
            position: absolute; bottom: 5px; right: 5px; font-size: 0.6rem; color: var(--accent-color); font-family: var(--font-tech);
            opacity: 0.5; /* Visible as READY by default */
            transition: opacity 0.3s;
            pointer-events: none;
        }
        
        .tech-coords.active { opacity: 1; font-weight: bold; }

      </style>
    `;
  }

  createSkillCard(skill) {
    let contentHtml;
    if (skill.textIcon) {
        contentHtml = `<span class="tech-icon-text">${skill.textIcon}</span>`;
    } else {
        let iconSrc = skill.customImg ? skill.customImg : `https://skillicons.dev/icons?i=${skill.icon}`; 
        contentHtml = `<img src="${iconSrc}" alt="${skill.name}" class="tech-icon" loading="lazy">`;
    }

    return `
      <div class="skill-card">
        <div class="local-axis-x"></div>
        <div class="local-axis-y"></div>
        <div class="local-intersection"></div>
        <div class="card-main">
            ${contentHtml}
            <span class="tech-name">${skill.name}</span>
        </div>
        <div class="tech-coords">READY</div>
      </div>
    `;
  }

  createCategory(titleKey, skillList) {
    return `
      <div class="category-block">
        <div class="category-title-wrapper">
            <div class="line-deco"></div>
            <div class="category-title" data-translate="${titleKey}">${translationService.t(titleKey)}</div>
            <div class="line-deco"></div>
        </div>
        <div class="skills-grid">
          ${skillList.map(s => this.createSkillCard(s)).join('')}
        </div>
      </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="skills-wrapper">
        <header class="section-header">
            <h2 class="section-title" data-translate="skills_title">${translationService.t('skills_title')}</h2>
        </header>
        
        <div class="categories-container">
            ${this.createCategory('frontend_title', skills.frontend)}
            ${this.createCategory('backend_title', skills.backend)}
            ${this.createCategory('other_tech_title', skills.other)}
        </div>
      </div>
    `;
  }
}

customElements.define('skills-section', SkillsSection);