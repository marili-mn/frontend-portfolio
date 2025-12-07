import { translationService } from '../services/TranslationService.js';

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
    // Trigger a wave of glitches on scroll entry
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
                // Glitch Logic:
                // If index < iterations, show original char (resolving from left)
                // Else show random char
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(element.interval);
            element.innerText = originalText; // Ensure clean finish
        }

        iterations += 1 / 3; 
    }, 30);
  }

  typeText(element, text) {
    element.textContent = '';
    let i = 0;
    
    if (element.typingInterval) clearInterval(element.typingInterval);
    
    element.typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(element.typingInterval);
        }
    }, 50);
  }

  updateTexts() {
    const t = (k) => translationService.t(k);
    const s = this.shadowRoot;
    
    s.querySelector('.editorial-title').textContent = t('nav_about').toUpperCase(); 
    this.typeText(s.querySelector('.role'), t('about_role'));
    
    const descContainer = s.querySelector('.desc-container');
    const rawDescriptions = [t('about_desc_1'), t('about_desc_2'), t('about_desc_3')];
    
    // Transform <strong>text</strong> into <span class="cipher-text">text</span>
    // Key Change: Inner text is NOT scrambled initially. It is READABLE.
    const processedHtml = rawDescriptions.map(desc => {
        return `<p>${desc.replace(/<strong>(.*?)<\/strong>/g, (match, p1) => {
            return `<span class="cipher-text" data-original="${p1}">${p1}</span>`;
        })}</p>`;
    }).join('');

    descContainer.innerHTML = processedHtml;
    
    s.querySelector('#cv-btn').textContent = t('cv_button');

    // Re-attach listeners
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
      cvBtn.setAttribute('href', 'assets/pdf/Nahuel Marcilli - Desarrollador Full-Stack CV.pdf');
    } else {
      cvBtn.setAttribute('href', 'assets/pdf/Nahuel Marcilli - Web Developer Resume ENG.pdf');
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
        }

        .editorial-container {
            position: relative;
            padding: 8rem 2rem; /* Increased vertical padding */
            overflow: hidden;
            background-color: var(--bg-color);
            color: var(--text-color);
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        /* Background Giant Title */
        .editorial-title {
            position: absolute;
            top: 5%; /* Keep it at the top */
            left: 50%; /* Center horizontally point */
            transform: translateX(-50%); /* Perfect horizontal centering */
            width: 100%; /* Ensure full width container */
            text-align: center; /* Center text within container */
            
            font-size: 12vw; /* Balanced size for desktop */
            font-weight: 900;
            line-height: 0.8;
            opacity: 0.15; 
            pointer-events: none;
            white-space: nowrap;
            font-family: 'Poppins', sans-serif;
            z-index: 0;
            user-select: none;
            color: var(--text-color);
            letter-spacing: 5px;
            text-transform: uppercase;
        }



        /* Layout */
        .content-wrapper {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 0.8fr 1.5fr; /* Adjusted ratio */
            gap: 8rem; /* More air */
            align-items: start;
        }

        /* Left Column */
        .identity-col {
            text-align: right;
            padding-top: 2rem;
        }

        .name {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1;
            margin: 0 0 1.5rem 0;
            letter-spacing: -2px; /* Tight editorial style */
            word-spacing: 5px; /* Added spacing between words */
            background: linear-gradient(to right, var(--accent), var(--text-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
        }

        .role {
            font-family: 'Space Mono', monospace;
            font-size: 1.1rem;
            color: var(--accent);
            margin-bottom: 3rem;
            display: inline-block;
            letter-spacing: 2px; /* Tech style */
            text-transform: uppercase;
            border-right: 2px solid var(--accent);
            padding-right: 5px;
            animation: blink 0.75s step-end infinite;
            min-height: 1.5em;
        }

        @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: var(--accent) }
        }

        .social-links {
            display: flex;
            gap: 2rem;
            justify-content: flex-end;
        }

        .social-link {
            color: var(--text-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem; /* Fallback */
            opacity: 0.9;
            transition: all 0.3s;
        }

        .social-icon {
            width: 28px;
            height: 28px;
            fill: currentColor;
        }

        @media (hover: hover) {
          .social-link:hover {
              opacity: 1;
              color: var(--accent);
              transform: translateY(-3px);
          }
        }

        /* Right Column (Manifesto) */
        .manifesto-col {
            border-left: 1px solid rgba(128,128,128, 0.3);
            padding-left: 3rem;
        }

        .desc-container p {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
            color: var(--text-color);
            opacity: 0.9;
            max-width: 600px;
        }

        /* CIPHER TEXT STYLES */
        .cipher-text {
            font-family: 'Space Mono', monospace;
            color: var(--accent);
            font-weight: bold;
            background: rgba(0, 255, 153, 0.1); 
            padding: 0 4px;
            border-radius: 2px;
            cursor: default;
            display: inline-block;
            transition: background 0.3s;
        }
        
        @media (hover: hover) {
          .cipher-text:hover {
              background: rgba(0, 255, 153, 0.2);
          }
        }

        /* Links inside text */
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
            font-family: 'Space Mono', monospace;
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
                color: var(--bg-color); /* Invert text color on hover */
                animation: glitch-text 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
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
        @media (hover: hover) {
            .cv-btn:hover::before {
                width: 100%;
            }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
            .editorial-container {
                padding: 4rem 1.5rem;
                text-align: left;
            }

            .content-wrapper {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .identity-col {
                text-align: left;
                border-bottom: 1px solid rgba(128,128,128, 0.2);
                padding-bottom: 2rem;
            }

            .social-links {
                justify-content: flex-start;
            }

            .manifesto-col {
                border-left: none;
                padding-left: 0;
            }
            
            .editorial-title {
                font-size: 13vw; /* Large but fitting for mobile */
                top: 2%; 
                left: 50%; /* Center horizontally */
                transform: translateX(-50%); /* Maintain centering */
                width: 100%;
                text-align: center;
            }
        }
      </style>

      <div class="editorial-container">
        <!-- Background Title -->
        <div class="editorial-title">PROFILE</div>

        <div class="content-wrapper">
            <!-- Left: Identity -->
            <div class="identity-col">
                <h1 class="name">Nahuel Marcilli</h1>
                <span class="role">Web Developer</span>
                <div class="social-links">
                    <a href="https://github.com/marili-mn" target="_blank" class="social-link" aria-label="GitHub">
                        <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/nahuel-marcilli" target="_blank" class="social-link" aria-label="LinkedIn">
                        <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                </div>
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