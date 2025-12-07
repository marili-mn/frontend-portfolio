import { translationService } from '../services/TranslationService.js';
import { ContactService } from '../services/ContactService.js';

export class ContactButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
    
    // Escuchar cambios de idioma
    window.addEventListener('language-changed', () => this.updateText());
    
    // Init Glitch Effect
    const btn = this.querySelector('.btn');
    const span = this.querySelector('span');
    
    if (btn && span) {
        btn.addEventListener('mouseenter', () => {
            // Ensure we have the latest text before glitching
            if(!span.getAttribute('data-original')) {
                span.setAttribute('data-original', span.textContent);
            }
            this.glitchEffect(span);
        });
    }
  }

  glitchEffect(element) {
    // Si no tiene texto original guardado (o ha cambiado), úsalo
    let originalText = element.getAttribute('data-original') || element.textContent;
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

        iterations += 1 / 2; // Speed of resolution
    }, 30);
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
        const key = btnText.getAttribute('data-translate');
        const newText = translationService.t(key);
        btnText.textContent = newText;
        // Update the source of truth for the glitch
        btnText.setAttribute('data-original', newText);
    }
  }

  render() {
    // Leemos clases opcionales pasadas al componente para estilizado (ej: "btn--editorial")
    const extraClasses = this.getAttribute('class-name') || 'btn--editorial';
    const translateKey = this.getAttribute('data-translate-key') || 'contact_button';

    this.innerHTML = `
      <a href="${ContactService.getMailtoLink()}" class="btn ${extraClasses}" role="button">
        <span data-translate="${translateKey}">${translationService.t(translateKey)}</span>
      </a>
    `;
  }
}

customElements.define('contact-button', ContactButton);