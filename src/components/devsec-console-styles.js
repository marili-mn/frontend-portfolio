// devsec-console-styles.js
// Contiene los estilos CSS específicos para el componente DevSecConsole
// Estos estilos serán inyectados en el Shadow DOM para un encapsulamiento completo.

const devsecConsoleStyles = `
:host {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh; /* Fallback */
  height: 100dvh;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5); /* Backdrop slightly transparent */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
  padding-top: env(safe-area-inset-top);
  
  /* Theme Variables - Default Dark */
  --console-bg: #1a1a1a;
  --console-text: #cccccc;
  --console-header: #333333;
  --console-prompt: #00ff99;
  --console-border: #444444;
}

:host(.light) {
  /* Theme Variables - Light Mode */
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

main {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
}

.terminal {
  background-color: var(--console-bg);
  color: var(--console-text);
  padding: 0; /* Padding handled by content area */
  border: 1px solid var(--console-border);
  border-radius: 6px;
  overflow: hidden; /* Clip content to radius */
  height: 80%;
  width: 80%;
  max-width: 900px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

.header {
  height: 32px;
  background-color: var(--console-header);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--console-text);
  border-bottom: 1px solid var(--console-border);
  user-select: none;
}

/* Windows-style Controls */
.window-controls {
    position: absolute;
    right: 0; /* Right aligned like Windows/Linux */
    top: 0;
    height: 100%;
    display: flex;
}

.btn-control {
    width: 46px; /* Wide clickable area */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    color: var(--console-text);
    font-size: 14px;
}

.btn-control:hover { background-color: rgba(128, 128, 128, 0.2); }
.btn-control.close:hover { background-color: #e81123; color: white; }

/* Terminal Body */
#terminal {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.prompt {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

input {
  background-color: transparent;
  color: var(--console-text);
  font-size: 14px;
  font-family: 'Space Mono', monospace;
  border: none;
  flex-grow: 1;
  outline: none;
}

/* Utility Classes */
.command { color: var(--console-prompt); font-weight: bold; }
.title { color: #ffbd2e; font-weight: bold; } /* Accent color */
.error { color: #ff5f56; }
.indent { margin-left: 15px; }

/* Alert overrides */
.alert {
    background: transparent;
    border: 1px dashed var(--console-prompt);
    color: var(--console-prompt);
    padding: 10px;
    margin-bottom: 15px;
}

.list-group-item {
    color: var(--console-text);
    padding: 4px 0;
}
.list-group-item:hover {
    color: var(--console-prompt);
    text-decoration: none;
    background: rgba(128,128,128,0.1);
    padding-left: 5px;
}

.hidden-template { display: none; }

@media (max-width: 750px) {
  .terminal {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border: none;
  }
  
  .header {
    height: 40px;
    justify-content: flex-start; /* Left align title on mobile */
    padding-left: 15px;
  }

  .window-controls {
    /* On mobile, keep them large */
  }
  
  .btn-control {
    width: 48px;
    font-size: 16px;
  }
}
`;

export default devsecConsoleStyles;