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
    if (target) {
       e.preventDefault();
       
       // Helper for delays
       const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

       // 1. Immediate Feedback: Copy & Change Button State
       await ContactService.copyToClipboard();
       
       // Trigger Toast
       window.dispatchEvent(new CustomEvent('show-toast', { 
         detail: { message: '¡Email copiado al portapapeles!' } 
       }));
       
       // Give toast time to appear before button changes
       await delay(400);

       // Visual feedback on button (color only, no text change to keep it clean)
       this.classList.add('btn--success');

       // 2. Short Delay before animating footer (allows user to register button change)
       await delay(300);
       
       // Trigger Footer Animation
       window.dispatchEvent(new CustomEvent('email-copied'));

       // 3. Longer Delay before opening mail client (so animation is seen)
       await delay(800);

       // Restore Button State
       this.classList.remove('btn--success');

       // Open Client
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