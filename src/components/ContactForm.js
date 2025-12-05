import { translationService } from '../services/TranslationService.js';
import { themeService } from '../services/ThemeService.js';

// Reutilizamos la estética de la consola pero adaptada a un formulario
const styles = `
:host {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
  
  /* Heredamos las variables de tema para consistencia total */
  --console-bg: #1a1a1a;
  --console-text: #cccccc;
  --console-header: #333333;
  --console-prompt: #00ff99;
  --console-border: #444444;
}

:host(.light) {
  --console-bg: #f5f5f5;
  --console-text: #333333;
  --console-header: #e0e0e0;
  --console-prompt: #0088cc;
  --console-border: #cccccc;
  background-color: rgba(255, 255, 255, 0.5);
}

:host(.visible) {
  opacity: 1;
  visibility: visible;
}

.wrapper {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
}

.terminal-window {
  background-color: var(--console-bg);
  color: var(--console-text);
  border: 1px solid var(--console-border);
  border-radius: 6px;
  overflow: hidden;
  height: auto;
  max-height: 90vh;
  width: 90%;
  max-width: 500px; /* Más estrecho que la consola principal para parecer un diálogo */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  font-family: 'Space Mono', monospace; /* Consistencia tipográfica */
  font-size: 14px;
  transform: translateY(20px) scale(0.98);
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

:host(.visible) .terminal-window {
  transform: translateY(0) scale(1);
}

.terminal-window.maximized {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  border-radius: 0;
  border: none;
}

.header {
  height: 32px;
  background-color: var(--console-header);
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Título a la izquierda como en consola */
  padding-left: 15px;
  position: relative;
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--console-text);
  border-bottom: 1px solid var(--console-border);
  user-select: none;
}

.window-controls {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
}

.btn-control {
    width: 46px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    color: var(--console-text);
}

.btn-control:hover { background-color: rgba(128, 128, 128, 0.2); }
.btn-control.close:hover { background-color: #e81123; color: white; }

.body {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
}

/* Estilos de Formulario tipo Terminal */
.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    color: var(--console-prompt);
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 0.9em;
}

label::before { content: "> "; }

input, textarea {
    width: 100%;
    background: rgba(0,0,0,0.1);
    border: 1px solid var(--console-border);
    color: var(--console-text);
    font-family: 'Space Mono', monospace;
    padding: 8px;
    font-size: 14px;
    border-radius: 0; /* Estilo más raw/terminal */
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, background 0.2s;
}

input:focus, textarea:focus {
    border-color: var(--console-prompt);
    background: rgba(0,0,0,0.2);
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px dashed var(--console-border);
}

.submit-btn {
    background: transparent;
    border: 1px solid var(--console-prompt);
    color: var(--console-prompt);
    font-family: 'Space Mono', monospace;
    padding: 8px 24px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    transition: all 0.2s;
}

.submit-btn:hover {
    background: var(--console-prompt);
    color: var(--console-bg);
    box-shadow: 0 0 10px var(--console-prompt);
}

.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
}

.system-msg {
    margin-bottom: 20px;
    color: var(--console-text);
    opacity: 0.8;
    font-size: 0.9em;
    border-left: 2px solid var(--console-text);
    padding-left: 10px;
}

/* Estados de éxito/error para el botón */
.submit-btn.success {
    border-color: #28a745;
    color: #28a745;
}
.submit-btn.success:hover {
    background: #28a745;
    color: white;
}

.submit-btn.error {
    border-color: #dc3545;
    color: #dc3545;
}

@media (max-width: 768px) {
    .terminal-window {
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        border-radius: 0;
        border: none;
    }
    .header { padding-left: 15px; height: 40px; }
    .btn-control { width: 48px; }
}
`;

export class ContactForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isMaximized = false;
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
        this.applyTheme(themeService.getTheme());

        // Intento inicial de traducción
        if (translationService.loaded) {
            this.updateTexts();
        } else {
            window.addEventListener('translations-loaded', () => this.updateTexts());
        }

        // Listeners Globales
        window.addEventListener('theme-changed', (e) => this.applyTheme(e.detail.theme));
        window.addEventListener('language-changed', () => this.updateTexts());
    }

    applyTheme(theme) {
        if (theme === 'light') this.classList.add('light');
        else this.classList.remove('light');
    }

    bindEvents() {
        const s = this.shadowRoot;
        
        // Window Controls
        s.querySelector('.close').addEventListener('click', () => this.close());
        s.querySelector('.minimize').addEventListener('click', () => this.close()); 
        s.querySelector('.maximize').addEventListener('click', () => this.toggleMaximize());
        
        // Close on backdrop click
        s.querySelector('.wrapper').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.close();
        });

        // Form Submission
        s.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));

        // Keydown (ESC)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.classList.contains('visible')) this.close();
        });
    }

    toggleMaximize() {
        const win = this.shadowRoot.querySelector('.terminal-window');
        this.isMaximized = !this.isMaximized;
        if (this.isMaximized) win.classList.add('maximized');
        else win.classList.remove('maximized');
    }

    open() {
        this.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        
        // Focus on first input after transition
        setTimeout(() => {
            const firstInput = this.shadowRoot.querySelector('input:not([type="hidden"])');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    close() {
        this.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scroll
        
        // Reset form after animation
        setTimeout(() => {
            this.resetForm();
        }, 300);
    }

    resetForm() {
        const form = this.shadowRoot.querySelector('form');
        const btn = this.shadowRoot.querySelector('.submit-btn');
        
        if(form) form.reset();
        if(btn) {
            btn.disabled = false;
            btn.classList.remove('success', 'error');
            btn.textContent = translationService.t('btn_send') || 'ENVIAR';
        }
    }

    updateTexts() {
        const t = (k) => translationService.t(k);
        const s = this.shadowRoot;
        
        const setTxt = (sel, key) => {
            const el = s.querySelector(sel);
            if (el) el.textContent = t(key);
        };

        setTxt('.window-title', 'contact_form_title');
        setTxt('.system-msg', 'contact_form_intro_note');
        setTxt('label[for="name"]', 'lbl_name');
        setTxt('label[for="email"]', 'lbl_email');
        setTxt('label[for="subject"]', 'lbl_subject');
        setTxt('label[for="message"]', 'lbl_message');
        
        const btn = s.querySelector('.submit-btn');
        if (btn && !btn.disabled && !btn.classList.contains('success') && !btn.classList.contains('error')) {
            btn.textContent = t('btn_send');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('.submit-btn');
        const t = (k) => translationService.t(k);

        btn.disabled = true;
        btn.textContent = t('btn_sending') || 'ENVIANDO...';

        try {
            const response = await fetch("https://formspree.io/f/xwpgqqvv", {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btn.textContent = t('msg_sent') || 'ENVIADO';
                btn.classList.add('success');
                
                window.dispatchEvent(new CustomEvent('show-toast', {
                    detail: { message: t('toast_sent') || 'Mensaje enviado' }
                }));

                setTimeout(() => this.close(), 1500);
            } else {
                throw new Error('Formspree Error');
            }
        } catch (error) {
            console.error(error);
            btn.textContent = t('msg_error') || 'ERROR';
            btn.classList.add('error');
            
            window.dispatchEvent(new CustomEvent('show-toast', {
                detail: { message: t('toast_error') || 'Error al enviar' }
            }));

            setTimeout(() => {
                btn.disabled = false;
                btn.classList.remove('error');
                btn.textContent = t('btn_send');
            }, 3000);
        }
    }

    render() {
        const t = (k) => translationService.t(k);
        
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="wrapper">
                <div class="terminal-window">
                    <div class="header">
                        <span class="window-title">${t('contact_form_title') || 'Nuevo Mensaje'}</span>
                        <div class="window-controls">
                            <div class="btn-control minimize" title="Minimize">─</div>
                            <div class="btn-control maximize" title="Maximize">□</div>
                            <div class="btn-control close" title="Close">✕</div>
                        </div>
                    </div>
                    
                    <div class="body">
                        <div class="system-msg" data-translate="contact_form_intro_note"></div>

                        <form>
                            <input type="text" name="_gotcha" style="display:none">
                            
                            <div class="form-group">
                                <label for="name">${t('lbl_name') || 'Nombre'}</label>
                                <input type="text" id="name" name="name" required autocomplete="name">
                            </div>

                            <div class="form-group">
                                <label for="email">${t('lbl_email') || 'Email'}</label>
                                <input type="email" id="email" name="email" required autocomplete="email">
                            </div>

                            <div class="form-group">
                                <label for="subject">${t('lbl_subject') || 'Asunto'}</label>
                                <input type="text" id="subject" name="subject" required>
                            </div>

                            <div class="form-group">
                                <label for="message">${t('lbl_message') || 'Mensaje'}</label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>

                            <div class="actions">
                                <button type="submit" class="submit-btn">
                                    ${t('btn_send') || 'ENVIAR'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        this.updateTexts();
    }
}

customElements.define('contact-form', ContactForm);