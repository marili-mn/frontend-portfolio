import { translationService } from '../services/TranslationService.js';
import { ContactService } from '../services/ContactService.js';

export class ContactButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
    
    // Escuchar cambios de idioma para actualizar el texto del botón
    window.addEventListener('language-changed', () => this.updateText());
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  async handleClick(e) {
    const target = e.target.closest('.btn');
    if (!target) return;
    
    e.preventDefault();

    // Helper para pausas
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 1. Copiar al portapapeles (Acción inmediata)
    await ContactService.copyToClipboard();

    // 2. Feedback Visual: Toast
    window.dispatchEvent(new CustomEvent('show-toast', { 
        detail: { message: translationService.t('email_copied') || 'Email copiado' } 
    }));

    // 3. Feedback Visual: Highlight en Footer (Coreografía visual)
    // Disparamos el evento para que el texto del email en el footer haga el efecto "pulse"
    window.dispatchEvent(new CustomEvent('email-copied'));
    
    // Cambiamos el estado del botón temporalmente
    this.classList.add('btn--success');

    // 4. Pausa Dramática (para que el usuario vea el highlight y el toast)
    await wait(1000);

    // Restaurar botón
    this.classList.remove('btn--success');

    // 5. Abrir el Formulario Terminal
    const contactForm = document.querySelector('contact-form');
    if (contactForm) {
        contactForm.open();
    } else {
        // Fallback
        window.location.href = ContactService.getMailtoLink();
    }
  }

  updateText() {
    const btnText = this.querySelector('[data-translate]');
    if (btnText) {
        // Asumimos que el atributo data-translate está en un span o en el mismo botón
        const key = btnText.getAttribute('data-translate');
        btnText.textContent = translationService.t(key);
    }
  }

  render() {
    // Leemos clases opcionales pasadas al componente para estilizado (ej: "btn--outline")
    const extraClasses = this.getAttribute('class-name') || 'btn--outline';
    const translateKey = this.getAttribute('data-translate-key') || 'contact_button';

    this.innerHTML = `
      <a href="${ContactService.getMailtoLink()}" class="btn ${extraClasses}" role="button">
        <i class="fas fa-envelope"></i>
        <span data-translate="${translateKey}">${translationService.t(translateKey)}</span>
      </a>
    `;
  }
}

customElements.define('contact-button', ContactButton);