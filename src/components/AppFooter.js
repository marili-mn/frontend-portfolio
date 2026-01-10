import { translationService } from '../services/TranslationService.js';
import { ContactService } from '../services/ContactService.js';

export class AppFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.updateTexts();
    window.addEventListener('language-changed', () => this.updateTexts());
    window.addEventListener('email-copied', () => this.highlightEmail());

    // DevSec Toggle Logic
    const devSecSwitch = this.querySelector('#devsec-toggle');
    devSecSwitch?.addEventListener('change', (e) => {
        const consoleComponent = document.querySelector('devsec-console');
        if (consoleComponent) {
            // If checked, open; if unchecked, close (though closing happens inside console usually)
            // Better: Just toggle. But for a switch, sync state is good.
            if (devSecSwitch.checked) {
                consoleComponent.open();
            } else {
                consoleComponent.close();
            }
        }
        // Reset switch after a delay to simulate "activation" rather than permanent state, 
        // or keep it on? Let's reset it so it can be clicked again if closed via other means.
        setTimeout(() => { devSecSwitch.checked = false; }, 500);
    });
  }

  highlightEmail() {
    const emailEl = this.querySelector('.footer__email-text');
    if (emailEl) {
      emailEl.classList.add('highlight-pulse');
      // Remove class after animation completes
      setTimeout(() => {
        emailEl.classList.remove('highlight-pulse');
      }, 1500);
    }
  }

  updateTexts() {
    const elements = this.querySelectorAll('[data-translate]');
    elements.forEach(el => {
      const key = el.getAttribute('data-translate');
      el.innerHTML = translationService.t(key);
    });
  }

  render() {
    const email = ContactService.getEmail();
    const mailto = ContactService.getMailtoLink();

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
            <p class="footer__desc">
                <span class="footer__email-text">${email}</span>
            </p>
            <div class="footer__links">
              <a href="https://github.com/marili-mn" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/nahuel-marcilli" target="_blank" rel="noopener noreferrer" class="link link--icon" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div class="footer__section footer__copyright">
            <p data-translate="footer_copyright">© 2026 mariDev. Todos los derechos reservados.</p>
            
            <!-- DevSec Access Hint -->
            <div class="devsec-access">
                <span class="blink-text"><i class="fas fa-terminal"></i> DevSec Mode:</span>
                <span><kbd class="keycap">Ctrl</kbd> + <kbd class="keycap">Z</kbd></span>
                <label class="switch" aria-label="Activar consola">
                  <input type="checkbox" id="devsec-toggle">
                  <span class="slider"></span>
                </label>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
