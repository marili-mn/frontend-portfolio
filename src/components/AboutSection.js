import { translationService } from '../services/TranslationService.js';
import './IdentityProfile.js';

export class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.observer = null;
  }

  connectedCallback() {
    this.render();
    this.updateTexts();
    this.updateCVLink();
    
    window.addEventListener('language-changed', () => {
        this.updateTexts();
        this.updateCVLink();
    });

    this.setupObserver();
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }

  setupObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.triggerDecryption();
                this.observer.unobserve(entry.target);
            }
        });
    }, options);

    // Wait for render
    setTimeout(() => {
        const container = this.shadowRoot.querySelector('.editorial-container');
        if (container) this.observer.observe(container);
    }, 100);
  }

  triggerDecryption() {
    const ciphers = this.shadowRoot.querySelectorAll('.cipher-text');
    ciphers.forEach((el, i) => {
        setTimeout(() => this.glitchEffect(el), i * 100);
    });
  }

  glitchEffect(element) {
    const originalText = element.getAttribute('data-original');
    if (!originalText) return;

    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let iterations = 0;
    
    if(element.interval) clearInterval(element.interval);

    element.interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(element.interval);
            element.innerText = originalText; 
        }

        iterations += 1 / 3; 
    }, 30);
  }

  updateTexts() {
    const t = (k) => translationService.t(k);
    const s = this.shadowRoot;
    
    s.querySelector('.editorial-title').textContent = t('nav_about').toUpperCase(); 
    
    // Pass data to subcomponent
    const identityProfile = s.querySelector('identity-profile');
    if (identityProfile) {
        identityProfile.setAttribute('name', 'Nahuel Marcilli'); 
        identityProfile.setAttribute('role', t('about_role'));
    }
    
    const descContainer = s.querySelector('.desc-container');
    const rawDescriptions = [t('about_desc_1'), t('about_desc_2'), t('about_desc_3')];
    
    const processedHtml = rawDescriptions.map(desc => {
        return `<p>${desc.replace(/<strong>(.*?)<\/strong>/g, (match, p1) => {
            return `<span class="cipher-text" data-original="${p1}">${p1}</span>`;
        })}</p>`;
    }).join('');

    descContainer.innerHTML = processedHtml;
    
    s.querySelector('#cv-btn').textContent = t('cv_button');

    const ciphers = s.querySelectorAll('.cipher-text');
    ciphers.forEach(el => {
        el.addEventListener('mouseenter', () => this.glitchEffect(el));
        el.addEventListener('click', () => this.glitchEffect(el));
    });
  }

  updateCVLink() {
    const cvBtn = this.shadowRoot.querySelector('#cv-btn');
    const currentLang = translationService.currentLang;
    
    if (currentLang === 'es') {
      cvBtn.setAttribute('href', 'assets/pdf/Nahuel Marcilli - CV Ingeniería Software.pdf');
    } else if (currentLang === 'pt') {
      cvBtn.setAttribute('href', 'assets/htmlTemplates/resume_ats_pt.html');
    } else {
      cvBtn.setAttribute('href', 'assets/pdf/Nahuel Marcilli - Software Engineer Resume.pdf');
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <style>
        :host {
            display: block;
            width: 100%;
            --bg-color: var(--clr-bg);
            --text-color: var(--clr-fg);
            --accent: var(--clr-accent);
            --clr-accent-rgb-value: 167, 139, 250; 
        }
        body.light about-section {
            --clr-accent-rgb-value: 28, 25, 23; 
        }

        .editorial-container {
            position: relative;
            padding: 4rem 1.5rem; /* Mobile default padding */
            overflow: hidden;
            background-color: var(--bg-color);
            color: var(--text-color);
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .editorial-title {
            position: absolute;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            text-align: center;
            font-size: 13vw; /* Mobile Size */
            font-weight: 900;
            line-height: 0.8;
            opacity: 0.25;
            pointer-events: none;
            white-space: nowrap;
            font-family: 'Poppins', sans-serif;
            z-index: 0;
            user-select: none;
            color: var(--text-color);
            letter-spacing: 5px;
            text-transform: uppercase;
        }

        /* Layout - Responsive Grid */
        .content-wrapper {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            display: grid;
            /* Mobile: Single Column */
            grid-template-columns: 1fr; 
            gap: 2rem;
            align-items: center;
        }

        /* Left Column - Identity Component */
        .identity-col {
            width: 100%;
            display: flex;
            justify-content: center; /* Mobile Center */
        }

        /* Right Column (Manifesto) */
        .manifesto-col {
            padding-top: 1rem;
            border-top: 1px solid rgba(128,128,128, 0.3); /* Mobile separator */
        }

        /* --- DESKTOP LAYOUT (> 1024px) --- */
        @media (min-width: 1024px) {
            .editorial-container {
                padding: 8rem 2rem;
            }
            
            .editorial-title {
                font-size: 12vw;
            }

            .content-wrapper {
                /* Two columns */
                grid-template-columns: 0.8fr 1.5fr;
                gap: 6rem; /* Increased gap for safe zone */
                align-items: start;
            }

            .identity-col {
                justify-content: flex-end; /* Align to right edge of column */
                padding-top: 2rem;
            }

            .manifesto-col {
                border-top: none;
                border-left: 1px solid rgba(128,128,128, 0.3);
                padding-left: 3rem;
                padding-top: 0;
            }
        }

        .desc-container p {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
            color: var(--text-color);
            opacity: 0.9;
            max-width: 600px;
        }

        .cipher-text {
            font-family: var(--font-mono); 
            color: var(--accent);
            font-weight: bold;
            background: var(--clr-accent-transparent); 
            padding: 0 4px;
            border-radius: 2px;
            cursor: default;
            display: inline-block;
            transition: background 0.3s;
        }
        
        @media (hover: hover) {
          .cipher-text:hover {
              background: rgba(var(--clr-accent-rgb-value), 0.25); 
          }
        }

        .desc-container a {
            color: var(--accent);
            text-decoration: none;
            border-bottom: 1px dashed var(--accent);
            font-weight: 500;
        }

        .cv-btn {
            display: inline-block;
            margin-top: 1rem;
            padding: 12px 30px;
            border: 1px solid var(--accent);
            color: var(--accent);
            text-decoration: none;
            font-family: var(--font-mono); 
            font-weight: bold;
            letter-spacing: 1px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .cv-btn::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 0; height: 100%;
            background: var(--accent);
            transition: width 0.3s ease;
            z-index: -1;
        }

        @media (hover: hover) {
            .cv-btn:hover {
                color: var(--bg-color); 
                animation: glitch-text 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
            }
            .cv-btn:hover::before {
                width: 100%;
            }
        }

        @keyframes glitch-text {
            0% { text-shadow: none; }
            20% { text-shadow: 2px 0 #ff00de, -2px 0 #00ff00; }
            40% { text-shadow: 2px 0 #ff00de, -2px 0 #00ff00; }
            60% { text-shadow: 2px 0 #ff00de, -2px 0 #00ff00; }
            80% { text-shadow: 2px 0 #ff00de, -2px 0 #00ff00; }
            100% { text-shadow: none; }
        }
      </style>

      <div class="editorial-container">
        <!-- Background Title -->
        <div class="editorial-title">PROFILE</div>

        <div class="content-wrapper">
            <!-- Left: Identity Subcomponent -->
            <div class="identity-col">
                <identity-profile></identity-profile>
            </div>

            <!-- Right: Manifesto -->
            <div class="manifesto-col">
                <div class="desc-container">
                    <!-- Injected via JS -->
                </div>
                <a href="#" id="cv-btn" target="_blank" class="cv-btn">DOWNLOAD CV</a>
            </div>
        </div>
      </div>
    `;
  }
}

customElements.define('about-section', AboutSection);
