import { translationService } from '../services/TranslationService.js';

export class AboutSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.updateTexts(); // Initial translation
    this.updateCVLink(); // Initial CV link logic

    // Subscribe to language changes
    window.addEventListener('language-changed', () => {
      this.updateTexts();
      this.updateCVLink();
    });
  }

  updateTexts() {
    const elements = this.querySelectorAll('[data-translate]');
    elements.forEach(el => {
      const key = el.getAttribute('data-translate');
      el.textContent = translationService.t(key);
    });
  }

  updateCVLink() {
    const cvBtn = this.querySelector('#cv-download-btn');
    if (!cvBtn) return;

    const currentLang = translationService.currentLang; // Access the getter from service
    
    // Logic: Default to English, use Spanish only if lang is 'es'
    // Note: Ensure filenames match exactly what's in your assets folder
    if (currentLang === 'es') {
      // Use the corrected Spanish CV
      cvBtn.setAttribute('href', 'assets/pdf/Nahuel Marcilli - Desarrollador Full-Stack CV.pdf');
    } else {
      cvBtn.setAttribute('href', 'assets/pdf/Nahuel Marcilli - Web Developer Resume ENG.pdf');
    }
  }

  render() {
    this.innerHTML = `
      <section class="about center" id="about" data-animate>
        <h1><span class="about__name">Nahuel Marcilli</span></h1>
        <h2 class="about__role" data-translate="about_role">Web Developer</h2>
        
        <p class="about__desc" data-translate="about_desc_1">
          Soy Argentino y me formé como Técnico Universitario en Desarrollo Web en la Universidad Nacional de Entre Ríos (UNER). Actualmente, estudio Licenciatura en Ciberdefensa en la Facultad de Defensa Nacional (FADENA), donde me especializo en hacking ético y seguridad informática.
        </p>
        <p class="about__desc" data-translate="about_desc_2">
          Trabajo como freelance especializado en Backend, aunque disfruto abordar proyectos Full-Stack que integran diseño gráfico, arquitectura de software y ciberseguridad.
        </p>
        <p class="about__desc" data-translate="about_desc_3">
          Me gusta pensar la tecnología desde una mirada multidisciplinaria: uniendo creatividad, análisis y técnica para crear soluciones sólidas y adaptables. Estoy siempre en búsqueda de nuevos retos que me permitan crecer y aportar valor real, colaborando en equipos y proyectos que cruzen diferentes disciplinas.
        </p>
        
        <div class="about__contact center">
          <a href="assets/Nahuel Marcilli - Web Developer Resume ENG.pdf" id="cv-download-btn" target="_blank" class="btn btn--outline" data-translate="cv_button">Descargar CV</a>
          
          <a href="https://github.com/marili-mn" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/nahuel-marcilli" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/marili.dev/" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </section>
    `;
  }
}

customElements.define('about-section', AboutSection);