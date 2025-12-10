export class ToastNotification extends HTMLElement {
  constructor() {
    super();
    this.timeoutId = null;
  }

  connectedCallback() {
    this.render();
    window.addEventListener('show-toast', (e) => {
        const message = e.detail?.message || 'Notification';
        this.show(message);
    });
  }

  show(message) {
    const toast = this.querySelector('.toast');
    const textEl = this.querySelector('.toast__message');
    
    if (!toast || !textEl) return;

    textEl.textContent = message;
    
    toast.classList.add('visible');

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
  }

  render() {
    this.innerHTML = `
      <div class="toast">
        <i class="fas fa-check-circle toast__icon"></i>
        <span class="toast__message"></span>
      </div>
      <style>
        .toast {
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(-50px) scale(0.9);
            
            /* Professional Theme Styling */
            background-color: var(--clr-card-bg); 
            color: var(--clr-fg);
            border: 1px solid var(--clr-accent);
            border-left: 4px solid var(--clr-accent);
            
            padding: 16px 28px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            
            z-index: 11000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 600;
            font-family: var(--font-primary);
            min-width: 300px;
            justify-content: center;
            pointer-events: none;
        }

        .toast.visible {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        .toast__icon {
            color: var(--clr-accent);
            font-size: 1.4rem;
        }
      </style>
    `;
  }
}

customElements.define('toast-notification', ToastNotification);