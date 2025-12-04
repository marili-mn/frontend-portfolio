export class ToastNotification extends HTMLElement {
  constructor() {
    super();
    this.timeoutId = null;
  }

  connectedCallback() {
    this.render();
    // Listen for the custom event to show the toast
    window.addEventListener('show-toast', (e) => {
        const message = e.detail?.message || 'Notification';
        this.show(message);
    });
  }

  show(message) {
    const toast = this.querySelector('.toast');
    const textEl = this.querySelector('.toast__message');
    
    if (!toast || !textEl) return;

    // Set content
    textEl.textContent = message;

    // Show animation
    toast.classList.add('visible');

    // Clear existing timer if spamming clicks
    if (this.timeoutId) clearTimeout(this.timeoutId);

    // Auto hide after 3 seconds
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
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px); /* Start hidden above */
            background-color: var(--clr-bg); /* Use theme bg but darken/lighten via opacity or border */
            color: var(--clr-fg);
            border: 1px solid var(--clr-accent);
            padding: 12px 24px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000; /* Top priority */
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bouncy effect */
            font-weight: 500;
            min-width: 280px;
            justify-content: center;
        }

        /* Contrast fix for light mode/dark mode consistency if needed, 
           or relying on global vars is fine. Let's make it stand out more. */
        .toast {
            background: #1a1a1a; /* Always dark for high contrast toast? Or theme adaptive? */
            color: #fff;
            border-left: 4px solid var(--clr-accent);
        }

        .toast.visible {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .toast__icon {
            color: var(--clr-accent);
            font-size: 1.2rem;
        }
      </style>
    `;
  }
}

customElements.define('toast-notification', ToastNotification);