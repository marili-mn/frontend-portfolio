import { translationService } from '../services/TranslationService.js';

export class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.projectData = JSON.parse(this.getAttribute('data-project'));
    this.render();
    
    // Listen for language changes
    window.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    
    // Setup preview hover effect
    this.setupPreviewListeners();
  }

  disconnectedCallback() {
    window.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange() {
    this.updateTexts();
  }

  updateTexts() {
    // Efficiently update only text nodes without full re-render
    const descEl = this.shadowRoot.querySelector('.project__description');
    const sourceBtn = this.shadowRoot.querySelector('[data-key="source_code"] span');
    const demoBtn = this.shadowRoot.querySelector('[data-key="live_demo"] span');
    
    if (descEl) descEl.innerHTML = translationService.t(this.projectData.descriptionKey);
    if (sourceBtn) sourceBtn.textContent = translationService.t('source_code');
    if (demoBtn) demoBtn.textContent = translationService.t('live_demo');
  }

  getTechIcons(stack) {
    return stack.map(tech => 
      `<img src="https://skillicons.dev/icons?i=${tech}" alt="${tech} icon" class="stack-icon" title="${tech}" loading="lazy" width="24" height="24">`
    ).join('');
  }

  setupPreviewListeners() {
    if (!this.projectData.hasPreview) return;
    
    // Disable hover preview on devices that do not support hover (e.g., touchscreens)
    if (!window.matchMedia('(hover: hover)').matches) return;

    const container = this.shadowRoot.querySelector('.project');
    const iframe = this.shadowRoot.querySelector('.preview-iframe');
    let timeoutId;

    container.addEventListener('mouseenter', () => {
      timeoutId = setTimeout(() => {
        if (iframe.src !== this.projectData.demoUrl) {
          iframe.src = this.projectData.demoUrl;
        }
      }, 200);
    });

    container.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
    });
  }

  render() {
    const { title, descriptionKey, techStack, repoUrl, demoUrl, dateRange } = this.projectData;
    
    // We import FontAwesome logic into shadow DOM or use external stylesheet link
    const styles = `
      <style>
        :host {
          display: block;
          height: 100%;
        }
        
        .project {
            background: var(--clr-card-bg);
            padding: 1.8rem;
            border-radius: 0;
            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid var(--clr-border-light); /* Subtle border for definition */
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow);
        }
        
        .project:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border-color: var(--clr-accent);
        }

        /* Preview Styles */
        .project-content {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: opacity 0.4s ease;
            background: transparent; 
        }

        /* Dynamic Gradient Overlay based on Theme */
        .project::after {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--clr-card-bg); 
            opacity: 0; /* Hidden by default */
            z-index: 1;
            transition: opacity 0.5s ease;
            pointer-events: none;
        }

        .project.with-preview:hover .project-content {
           /* No hacemos nada con la opacidad del contenido, lo dejamos al 100% */
        }
        
        .project.with-preview:hover::after {
            opacity: 0; /* Vuelve a 0 */
        }

        .project-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0;
            transition: opacity 0.6s ease, transform 0.6s ease;
            pointer-events: none; 
            transform: scale(1.05);
        }
        
        .project.with-preview:hover .project-preview {
            opacity: 0.3; /* Vuelve a 0.3 */
            transform: scale(1);
        }

        .preview-iframe {
            width: 100%;
            height: 100%;
            border: none;
            filter: grayscale(0.3) contrast(1.1); 
            transition: filter 0.4s ease;
        }
        
        .project.with-preview:hover .preview-iframe {
            filter: grayscale(0) contrast(1);
        }

        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: var(--clr-heading);
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .project__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.5rem;
            flex-wrap: wrap; /* Allow wrapping for mobile */
        }

        .project__date {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.75rem;
            color: var(--clr-accent);
            background: rgba(0,0,0,0.2);
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid var(--clr-border-light);
            white-space: nowrap;
            margin-left: 10px;
        }

        @media (max-width: 576px) {
            .project__date {
                margin-left: 0;
                margin-top: 0.5rem;
                display: inline-block; /* Ensure it behaves nicely */
            }
            
            .project__links {
                flex-direction: column;
                gap: 12px;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
                white-space: nowrap; /* Prevent text wrapping */
                font-size: 0.7rem; /* Even smaller font for mobile */
                padding: 0.2em 0.4em; /* Even more compact padding for mobile */
            }
        }
        
        .project__description {
            color: var(--clr-text-secondary);
            margin-bottom: 1.2em;
            line-height: 1.6;
            font-size: 0.95rem;
            flex-grow: 1;
            /* Text shadow for better readability on varying backgrounds */
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        }
        
        .project__stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6em;
            margin-bottom: 1.5em;
            padding-top: 1.2em;
            border-top: 1px solid var(--clr-border-light);
        }
        
        .stack-icon {
            width: 24px;
            height: 24px;
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: grayscale(0.5);
            opacity: 0.9;
        }
        
        .stack-icon:hover {
            transform: scale(1.2);
            filter: grayscale(0);
            opacity: 1;
        }
        
        .project__links {
            display: flex;
            gap: 0.8em;
            margin-top: auto;
        }
        
        /* Laser Draw Animation for Buttons */
        @keyframes laser-draw {
            0% { background-size: 0% 1px, 1px 0%, 0% 1px, 1px 0%; }
            25% { background-size: 100% 1px, 1px 0%, 0% 1px, 1px 0%; }
            50% { background-size: 100% 1px, 1px 100%, 0% 1px, 1px 0%; }
            75% { background-size: 100% 1px, 1px 100%, 100% 1px, 1px 0%; }
            100% { background-size: 100% 1px, 1px 100%, 100% 1px, 1px 100%; }
        }

        .btn {
            text-decoration: none;
            padding: 0.3em 0.6em; /* Even smaller padding for desktop */
            color: var(--clr-text-secondary);
            font-weight: 600;
            font-family: 'Consolas', monospace;
            font-size: 0.85rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
            
            /* Reset Box Style */
            background: transparent;
            border: none;
            border-radius: 0;
            position: relative;
            
            /* Laser Setup */
            background-image: 
                linear-gradient(var(--clr-accent), var(--clr-accent)), 
                linear-gradient(var(--clr-accent), var(--clr-accent)), 
                linear-gradient(var(--clr-accent), var(--clr-accent)), 
                linear-gradient(var(--clr-accent), var(--clr-accent)); 
            background-repeat: no-repeat;
            background-position: top left, top right, bottom right, bottom left;
            /* Start invisible (0 size) */
            background-size: 0% 1px, 1px 0%, 0% 1px, 1px 0%;
            
            transition: color 0.3s ease;
        }
        
        .btn:hover {
            color: var(--clr-accent);
            animation: laser-draw 0.4s linear forwards;
            background-color: rgba(0, 255, 153, 0.05); /* Subtle tech fill */
        }
        
        /* Icon fix for alignment */
        .btn i {
            font-size: 1rem;
        }

        /* FontAwesome fallback for Shadow DOM */
        @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <article class="project with-preview">
        <div class="project-content">
          <div class="project__header">
              <h3>${title}</h3>
              <span class="project__date">${dateRange || '2024'}</span>
          </div>
          <p class="project__description">${translationService.t(descriptionKey)}</p>
          <div class="project__stack">
            ${this.getTechIcons(techStack)}
          </div>
          <div class="project__links">
            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn" data-key="source_code">
              <i class="fab fa-github"></i> <span>${translationService.t('source_code')}</span>
            </a>
            <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="btn" data-key="live_demo">
              <i class="fas fa-external-link-alt"></i> <span>${translationService.t('live_demo')}</span>
            </a>
          </div>
        </div>
        <div class="project-preview">
           <iframe src="" frameborder="0" class="preview-iframe"></iframe>
        </div>
      </article>
    `;
  }
}

customElements.define('project-card', ProjectCard);