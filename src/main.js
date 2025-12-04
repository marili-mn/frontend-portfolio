import { translationService } from './services/TranslationService.js';
import { themeService } from './services/ThemeService.js';

// Import components to register them
import './components/AppHeader.js';
import './components/AboutSection.js'; // New
import './components/SkillsSection.js';
import './components/ProjectCard.js';
import './components/AppFooter.js'; // New
import './components/ContactButton.js'; // New Contact Button Logic
import './components/ScrollTopBtn.js'; // New component
import './components/ToastNotification.js'; // New Toast Component

import { projects } from './data/projectsData.js';

class App {
  async init() {
    console.log('Initializing App...');
    
    // 1. Load Translations
    await translationService.init();
    
    // 2. Render Projects (This part is still imperative because we loop data to create elements)
    // Alternatively, we could make a <project-list> component.
    this.renderProjects();
    
    // 3. Initialize Anims (GSAP)
    this.initAnimations();

    // 4. Global Events (Smooth Scroll)
    this.setupGlobalEvents();

    console.log('App initialized!');
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
                
                // Smooth scroll with GSAP
                if (window.gsap) {
                    // Function to stop scrolling if user interacts
                    const killScroll = (e) => {
                        // Don't kill scroll if user is tapping a UI control (Hamburger or ScrollTop)
                        // This prevents the "kill" logic from eating the click event of the buttons
                        if (e.type === 'touchstart') {
                           const target = e.target;
                           if (target.closest('.nav__hamburger') || target.closest('scroll-top-btn')) {
                               return; 
                           }
                        }

                        gsap.killTweensOf(window);
                        window.removeEventListener('wheel', killScroll);
                        window.removeEventListener('touchmove', killScroll);
                        window.removeEventListener('touchstart', killScroll);
                    };

                    // Add listeners to detect user interaction
                    window.addEventListener('wheel', killScroll, { passive: true });
                    window.addEventListener('touchmove', killScroll, { passive: true });
                    window.addEventListener('touchstart', killScroll, { passive: true });

                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: { y: targetElement, offsetY: 100, autoKill: true }, 
                        ease: "power4.out",
                        onComplete: () => {
                            // Cleanup listeners when animation finishes naturally
                            window.removeEventListener('wheel', killScroll);
                            window.removeEventListener('touchmove', killScroll);
                            window.removeEventListener('touchstart', killScroll);
                        }
                    });
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }

                // Close Mobile Menu if open (Logic centralized here)
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
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());