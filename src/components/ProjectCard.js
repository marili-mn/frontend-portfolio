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
      `<img src="https://skillicons.dev/icons?i=${tech}" alt="${tech} icon" class="stack-icon" title="${tech}">`
    ).join('');
  }

  setupPreviewListeners() {
    if (!this.projectData.hasPreview) return;
    
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
    const { title, descriptionKey, techStack, repoUrl, demoUrl } = this.projectData;
    
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
            border-radius: 20px;
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
        
        .btn {
            text-decoration: none;
            padding: 0.5em 1.2em;
            border: 1px solid var(--clr-border-btn);
            color: var(--clr-text-secondary);
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.85rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--clr-btn-bg);
            cursor: pointer;
        }
        
        .btn:hover {
            background: var(--clr-accent);
            border-color: var(--clr-accent);
            color: #fff; /* Always white text on hover for contrast against green */
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
          <h3>${title}</h3>
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