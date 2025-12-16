export class IdentityProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.texts = {
      name: 'Nahuel Marcilli',
      role: 'Web Developer'
    };
    this.typingInterval = null;
    this.isDesktop = false;
    this.lastWidth = window.innerWidth; // Track width to ignore mobile height resize
  }

  static get observedAttributes() {
    return ['name', 'role'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.texts[name] = newValue;
      if (this.isConnected) {
        this.render(); 
        this.setupInteraction(); 
      }
    }
  }

  connectedCallback() {
    this.render();
    this.setupInteraction();
    // Bind resize with debouncing or careful check
    this.boundResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.boundResize);
    this.handleResize(); // Initial check
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.boundResize);
    if (this.typingInterval) clearInterval(this.typingInterval);
  }

  handleResize() {
    const currentWidth = window.innerWidth;
    
    // Ignore vertical resizes on mobile (URL bar appearing/disappearing)
    if (currentWidth === this.lastWidth) return;
    this.lastWidth = currentWidth;

    const wasDesktop = this.isDesktop;
    this.isDesktop = currentWidth >= 1024;

    // Only reset state if we cross the breakpoint boundary
    if (wasDesktop !== this.isDesktop) {
        this.deactivate(
            this.shadowRoot.querySelector('.role'),
            this.shadowRoot.querySelector('.trigger-zone')
        );
    }
  }

  /* --- LOGIC CONTROL --- */

  activate(roleEl, triggerZoneEl) {
    // Only activate if not already active to prevent glitches
    if (!triggerZoneEl.classList.contains('active')) {
        triggerZoneEl.classList.add('active');
        if (this.typingInterval) clearInterval(this.typingInterval);
        roleEl.textContent = this.texts.role; // Instant text
    }
  }

  deactivate(roleEl, triggerZoneEl) {
    if (!triggerZoneEl) triggerZoneEl = this.shadowRoot.querySelector('.trigger-zone');
    if (!roleEl) roleEl = this.shadowRoot.querySelector('.role');
    
    if (!triggerZoneEl || !roleEl) return;

    // Only deactivate if currently active
    if (triggerZoneEl.classList.contains('active')) {
        triggerZoneEl.classList.remove('active');
        this.typeText(roleEl); // Restart typing effect
    }
  }

  toggle(roleEl, triggerZoneEl) {
    if (triggerZoneEl.classList.contains('active')) {
      this.deactivate(roleEl, triggerZoneEl);
    } else {
      this.activate(roleEl, triggerZoneEl);
    }
  }

  typeText(element) {
    if (!element) return;
    element.textContent = '';
    const text = this.texts.role;
    let i = 0;
    if (this.typingInterval) clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 50);
  }

  setupInteraction() {
    const triggerZone = this.shadowRoot.querySelector('.trigger-zone');
    const roleEl = this.shadowRoot.querySelector('.role');
    const clickOverlay = this.shadowRoot.querySelector('.click-overlay'); 
    
    if (!triggerZone || !roleEl) return;

    this.typeText(roleEl);

    // 1. Hover (Desktop) - Interaction on the name
    // Using mouseenter/leave ensures stable state handling on desktop
    triggerZone.addEventListener('mouseenter', () => {
      if (this.isDesktop) {
        this.activate(roleEl, triggerZone);
      }
    });

    // 2. Click (Mobile) - Name Trigger
    // Using simple click is usually robust enough, preventDefault helps with some ghost clicks
    triggerZone.addEventListener('click', (e) => {
      // e.preventDefault(); // Optional: might block scrolling if not careful, better safe
      e.stopPropagation(); 
      if (!this.isDesktop) {
        this.toggle(roleEl, triggerZone);
      }
    });

    // 3. Click (Universal) - CLOSE VIA OVERLAY
    if (clickOverlay) {
        clickOverlay.addEventListener('click', (e) => {
          e.stopPropagation();
          // Always force close when clicking the image overlay
          this.deactivate(roleEl, triggerZone);
        });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --bg-color: var(--clr-bg, #000);
          --text-color: var(--clr-fg, #fff);
          --accent: var(--clr-accent, #a78bfa);
          --font-mono: 'Courier New', monospace;
        }

        .identity-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center; 
          padding: 1rem 0;
          margin-bottom: 2rem; 
          min-height: 300px;
          justify-content: center;
          pointer-events: none; 
        }

        /* TRIGGER ZONE */
        .trigger-zone { 
          position: relative;
          z-index: 30; 
          margin-bottom: 0.5rem;
          display: inline-block; 
          pointer-events: auto; 
          cursor: pointer;
          padding: 0; 
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* ANTI-GLITCH BRIDGE (Desktop Only) */
        @media (min-width: 1024px) {
            .trigger-zone::before {
                content: '';
                position: absolute;
                bottom: 100%;
                left: -20px;
                right: -20px;
                height: 0;
                z-index: -1; 
            }
            .trigger-zone:hover::before,
            .trigger-zone.active::before {
                height: 160px;
            }
        }

        /* TEXT VISUAL */
        .name {
          font-size: 2.5rem; 
          font-weight: 800;
          line-height: 1; 
          margin: 0;
          letter-spacing: -1px; 
          background: linear-gradient(to right, var(--accent), var(--text-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          text-align: center;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none; 
          display: block;
        }

        /* VISUAL ELEMENTS */
        .profile-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.5); 
          width: 160px; 
          height: 220px;
          background-image: 
              linear-gradient(var(--accent), var(--accent)), 
              linear-gradient(var(--accent), var(--accent));
          background-repeat: no-repeat;
          background-size: 2px 20px, 20px 2px;
          background-position: top left, top left;
          padding: 8px; 
          opacity: 0; 
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 15; 
          pointer-events: none; 
          box-sizing: border-box;
        }

        .profile-frame::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 100%; height: 100%;
          background-image: 
              linear-gradient(var(--accent), var(--accent)), 
              linear-gradient(var(--accent), var(--accent));
          background-repeat: no-repeat;
          background-size: 2px 20px, 20px 2px;
          background-position: bottom right, bottom right;
          pointer-events: none;
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          pointer-events: none; 
        }

        /* CLICK OVERLAY (FULL FRAME HITBOX) */
        .click-overlay {
            position: absolute;
            inset: 0; /* Covers everything inside profile-frame */
            z-index: 100; /* Extremely high Z-index local to the component to ensure top click priority */
            cursor: pointer;
            pointer-events: none; 
            background: transparent; 
            /* background: rgba(255, 0, 0, 0.2); Debugging visibility */
        }

        .role {
          font-family: var(--font-mono, monospace); 
          font-size: 1rem;
          color: var(--accent);
          display: inline-block;
          letter-spacing: 1px; 
          text-transform: uppercase;
          border-right: 2px solid var(--accent);
          padding-right: 5px;
          animation: blink 0.75s step-end infinite;
          min-height: 1.5em;
          margin-bottom: 0; 
          text-align: center;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 5;
          position: relative;
          pointer-events: auto;
        }

        @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: var(--accent) }
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1.5rem; 
          position: relative;
          z-index: 20; 
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: auto; 
        }

        .social-link {
          color: var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: all 0.3s;
          text-decoration: none;
          padding: 5px;
        }
        
        .social-link svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
          transition: transform 0.3s;
        }

        .social-link:hover {
          color: var(--accent);
          opacity: 1;
        }
        
        .social-link:hover svg {
           transform: scale(1.2);
        }

        /* --- MEDIA QUERIES --- */

        @media (min-width: 450px) {
          .name { font-size: 3.5rem; }
          .role { font-size: 1.1rem; }
          .profile-frame {
             width: 180px;
             height: 240px;
          }
        }

        @media (min-width: 1024px) {
          .identity-container {
            align-items: flex-end; 
            padding: 1rem;
            margin-bottom: 0;
            min-height: auto; 
          }
          
          .trigger-zone {
             justify-content: flex-end;
          }

          .name {
            font-size: 4rem;
            text-align: right;
          }
          
          .role {
            text-align: right;
          }
          
          .social-links {
            justify-content: flex-end; 
          }
          
          .profile-frame {
            left: auto;
            right: 0;
            top: 50%;
            transform: translateY(-50%) scale(0.8); 
          }
        }

        /* --- ANIMATION STATES --- */

        @media (min-width: 1024px) {
            .trigger-zone.active .name,
            .trigger-zone:hover .name { 
                transform: translateY(-140px); 
            }

            .trigger-zone.active ~ .role,
            .trigger-zone:hover ~ .role { 
                transform: translateY(140px); 
            }
            
            .trigger-zone.active ~ .social-links,
            .trigger-zone:hover ~ .social-links {
                transform: translateY(140px);
            }
            
            .trigger-zone.active ~ .profile-frame,
            .trigger-zone:hover ~ .profile-frame {
                opacity: 1;
                transform: translateY(-50%) scale(1); 
            }

            /* Enable Overlay Hitbox */
            .trigger-zone.active ~ .profile-frame .click-overlay,
            .trigger-zone:hover ~ .profile-frame .click-overlay {
                pointer-events: auto;
            }
        }

        @media (max-width: 1023px) {
            .trigger-zone.active .name { transform: translateY(-130px); }
            
            .trigger-zone.active ~ .role { transform: translateY(130px); }
            
            .trigger-zone.active ~ .social-links { transform: translateY(130px); }

            .trigger-zone.active ~ .profile-frame {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }

            /* Enable Overlay Hitbox - CRITICAL FIX */
            .trigger-zone.active ~ .profile-frame .click-overlay {
                pointer-events: auto;
            }
        }

      </style>

      <div class="identity-container">
        <div class="trigger-zone"> 
            <h1 class="name">${this.texts.name}</h1>
        </div>

        <span class="role"></span> 
        
        <div class="profile-frame">
            <img src="assets/img/5.1.jpg" alt="${this.texts.name}" class="profile-img" loading="lazy">
            <div class="click-overlay"></div>
        </div>
        
        <div class="social-links"> 
            <a href="https://github.com/marili-mn" target="_blank" class="social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://linkedin.com/in/nahuel-marcilli" target="_blank" class="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
        </div>
      </div>
    `;
  }
}

customElements.define('identity-profile', IdentityProfile);
