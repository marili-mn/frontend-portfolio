import { translationService } from './services/TranslationService.js';
import { themeService } from './services/ThemeService.js';

// Import components to register them
import './components/AppHeader.js';
import './components/AboutSection.js';
import './components/SkillsSection.js';
import './components/ProjectCard.js';
import './components/ProjectsTimeline.js';
import './components/AppFooter.js';
import './components/ContactButton.js';
import './components/ContactForm.js';
import './components/ScrollTopBtn.js';
import './components/DevSecConsole.js';
import './components/ArtifactsZone.js';

// --- Initialization ---

import { projects } from './data/projectsData.js';

class App {
  async init() {
    console.log('Initializing App...');
    
    // 1. Load Translations
    await translationService.init();

    // 2. Theme Initialization (Global Listener)
    window.addEventListener('theme-changed', (e) => {
        document.body.className = e.detail.theme;
    });
    themeService.init(); // Trigger initial application
    
    // 3. Render Projects
    this.renderProjects();
    
    // 4. Initialize Anims (GSAP)
    this.initAnimations();

    // 5. Global Events (Smooth Scroll, DevSec Console Trigger)
    this.setupGlobalEvents();
    
    // 6. Initial Global Translation (For static elements like H2)
    this.updateGlobalTexts();
    window.addEventListener('language-changed', () => this.updateGlobalTexts());

    console.log('App initialized!');
  }

  updateGlobalTexts() {
      // Updates static elements outside of Web Components (like section titles in index.html)
      document.querySelectorAll('[data-translate]').forEach(el => {
          // Skip elements inside web components if possible, though mostly harmless
          if (el.tagName.includes('-')) return; 
          
          const key = el.getAttribute('data-translate');
          const text = translationService.t(key);
          if (text) el.textContent = text;
      });
  }

  // Utility to check for mobile environment
  isMobile() {
    return window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches;
  }

  renderProjects() {
    const grid = document.querySelector('.projects__grid');
    if (!grid) return;
    
    grid.innerHTML = ''; 
    
    projects.forEach(project => {
      const card = document.createElement('project-card');
      card.setAttribute('data-project', JSON.stringify(project));
      grid.appendChild(card);
    });
  }

  initAnimations() {
    // Wait a bit for components to render
    setTimeout(() => {
        if (!window.gsap || !window.ScrollTrigger) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate main sections
        document.querySelectorAll('[data-animate]').forEach(element => {
            gsap.fromTo(element, 
            { opacity: 0, y: 50 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: { 
                trigger: element, 
                start: 'top 80%', 
                toggleActions: 'play none none reverse' 
                }
            }
            );
        });
    }, 100);
  }

  setupGlobalEvents() {
    // Register GSAP Plugin if available
    if (window.gsap && window.ScrollToPlugin) {
        gsap.registerPlugin(ScrollToPlugin);
    }

    // Global Smooth Scroll for all anchor links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        
        if (link) {
            const targetId = link.getAttribute('href');
            
            // Ignore empty links or pure '#'
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Adaptive Scroll Logic
                if (this.isMobile()) {
                     // NATIVE SCROLL FOR MOBILE (Robust, hardware accelerated, no conflicts)
                     const headerOffset = 100;
                     const elementPosition = targetElement.getBoundingClientRect().top;
                     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                 
                     window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                     });
                } else if (window.gsap) {
                    // GSAP FOR DESKTOP
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: { y: targetElement, offsetY: 100, autoKill: true }, 
                        ease: "power4.out"
                    });
                } else {
                    // Fallback
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }

                // Close Mobile Menu if open
                const hamburger = document.querySelector('.nav__hamburger');
                const navList = document.querySelector('.nav__list');
                const icon = hamburger?.querySelector('i');
                
                if (navList && navList.classList.contains('display-nav-list')) {
                    navList.classList.remove('display-nav-list');
                    if(icon) icon.className = 'fas fa-bars';
                }
            }
        }
    });

    // DevSec Console Keyboard Trigger (Ctrl + Z)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            const devSecConsole = document.querySelector('devsec-console');
            if (devSecConsole) {
                devSecConsole.toggle();
            }
        }
    });
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());