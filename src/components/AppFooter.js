import { translationService } from '../services/TranslationService.js';

export class AppFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.updateTexts();
    window.addEventListener('language-changed', () => this.updateTexts());
  }

  updateTexts() {
    const elements = this.querySelectorAll('[data-translate]');
    elements.forEach(el => {
      const key = el.getAttribute('data-translate');
      el.textContent = translationService.t(key);
    });
  }

  render() {
    // Ensure the component behaves like a block element
    this.style.display = 'block';
    this.style.width = '100%';

    this.innerHTML = `
      <footer class="footer">
        <div class="footer__content">
          <div class="footer__section footer__branding">
            <h4 class="footer__title">Nahuel Marcilli</h4>
            <p class="footer__desc" data-translate="footer_desc">
              Multidisciplinario por esencia: desarrollo, seguridad y diseño al servicio de soluciones creativas y precisas.
            </p>
          </div>
          <div class="footer__section footer__social">
            <h4 class="footer__title" data-translate="footer_connect">Conectemos</h4>
            <p class="footer__desc">maridev5@hotmail.com</p>
            <div class="footer__links">
              <a href="https://github.com/marili-mn" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/nahuel-marcilli" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="mailto:maridev5@hotmail.com" class="link link--icon" aria-label="Email"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
          <div class="footer__section footer__copyright">
            <p data-translate="footer_copyright">© 2025 mariDev. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);