import { themeService } from '../services/ThemeService.js';
import { translationService } from '../services/TranslationService.js';

export class ArtifactsZone extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initListeners();
    
    // Initial State
    const currentTheme = themeService.getTheme();
    this.applyThemeClass(currentTheme);
    this.updateTexts();
    this.updateThemeIndicator(currentTheme);
    this.updateLangIndicator(translationService.currentLang);

    // Global Listeners
    window.addEventListener('language-changed', (e) => {
        this.updateTexts();
        this.updateLangIndicator(e.detail.language);
    });

    window.addEventListener('theme-changed', (e) => {
        this.applyThemeClass(e.detail.theme);
        this.updateThemeIndicator(e.detail.theme);
    });
  }

  applyThemeClass(theme) {
      if (theme === 'light') {
          this.classList.add('light');
      } else {
          this.classList.remove('light');
      }
  }

  updateTexts() {
    const t = (k) => translationService.t(k);
    const set = (sel, k) => {
        const el = this.querySelector(sel);
        if(el) el.textContent = t(k);
    };

    set('[data-t="lab_title"]', 'lab_title');
    set('[data-t="lab_sec_level"]', 'lab_sec_level');
    set('[data-t="lab_btn_exit"]', 'lab_btn_exit');
    
    set('[data-t="lab_manifesto_title"]', 'lab_manifesto_title');
    set('[data-t="lab_manifesto_desc"]', 'lab_manifesto_desc');
    
    const statusLabel = this.querySelector('[data-t="lab_status"]');
    if(statusLabel) statusLabel.textContent = t('lab_status');
    const statusVal = this.querySelector('[data-t="lab_status_val"]');
    if(statusVal) statusVal.textContent = t('lab_status_val');

    set('[data-t="lab_algo_title"]', 'lab_algo_title');
    set('[data-t="lab_metrics_title"]', 'lab_metrics_title');
    set('[data-t="lab_proto_title"]', 'lab_proto_title');
    set('[data-t="lab_next_gen"]', 'lab_next_gen');
    set('[data-t="lab_next_gen_desc"]', 'lab_next_gen_desc');
    set('[data-t="lab_awaiting"]', 'lab_awaiting');
    set('[data-t="lab_classified"]', 'lab_classified');
  }
  
  updateThemeIndicator(theme) {
      const indicator = this.querySelector('#lab-theme-indicator');
      if(indicator) indicator.textContent = theme === 'dark' ? 'SYS:DRK' : 'SYS:LGT';
  }

  updateLangIndicator(lang) {
      const indicator = this.querySelector('#lab-lang-indicator');
      if(indicator) indicator.textContent = `LNG:${lang.toUpperCase()}`;
  }

  initListeners() {
    this.querySelector('#close-artifacts')?.addEventListener('click', () => this.close());
    this.querySelector('#lab-theme-btn')?.addEventListener('click', () => themeService.toggleTheme());
    this.querySelector('#lab-lang-btn')?.addEventListener('click', () => {
        const langs = ['es', 'en', 'pt', 'de'];
        const next = langs[(langs.indexOf(translationService.currentLang) + 1) % langs.length];
        translationService.setLanguage(next);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.classList.contains('active')) this.close();
    });
  }

  open() {
    this.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }

  close() {
    this.classList.remove('active');
    this.classList.add('closing');
    setTimeout(() => {
        this.classList.remove('closing');
        document.body.style.overflow = '';
    }, 800); 
  }

  render() {
    this.innerHTML = `
      <style>
        /* 
           R&D LAB - RESPONSIVE HYPER GLITCH THEME
        */
        artifacts-zone {
            /* DARK MODE (Default) */
            --z-bg: #050505;       
            --z-grid: #1a1a1a;     
            --z-text: #d4d4d4;     
            --z-accent: #ff3300;
            --z-sec: #333333;
            --z-mono: 'JetBrains Mono', 'Consolas', monospace;
            
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100dvh; 
            z-index: -1; /* Hide behind everything by default */
            pointer-events: none;
            visibility: hidden;
            display: block;
            font-family: var(--z-mono);
            font-size: 14px;
        }
        
        artifacts-zone.active {
            z-index: 9000; /* Bring to front when active */
            visibility: visible;
            pointer-events: auto;
        }
        
        artifacts-zone.closing {
            z-index: 9000; /* Keep on top while closing */
            visibility: visible;
            pointer-events: none;
        }

        /* LIGHT MODE */
        artifacts-zone.light {
            --z-bg: #e5e5e5;
            --z-grid: #d1d1d1;
            --z-text: #171717;
            --z-accent: #ff4400;
            --z-sec: #999999;
        }

        /* --- ANIMATIONS (Same as before) --- */
        .shutter-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; transform: translateY(100%); z-index: 9020; }
        .shutter-accent { background-color: var(--z-accent); z-index: 9025; }
        .shutter-base { background-color: var(--z-bg); z-index: 9020; }
        .scanline { position: fixed; top: 0; left: 0; width: 100%; height: 5px; background-color: var(--z-accent); opacity: 0.8; box-shadow: 0 0 10px var(--z-accent); z-index: 9030; display: none; }

        artifacts-zone.active .shutter-accent { animation: slash-in 0.6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }
        artifacts-zone.active .shutter-base { animation: slash-in 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.1s forwards; }
        artifacts-zone.active .scanline { display: block; animation: scan-down 0.8s linear forwards; }
        artifacts-zone.closing .shutter-accent { animation: slash-out 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.1s forwards; }
        artifacts-zone.closing .shutter-base { animation: slash-out 0.6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }

        @keyframes slash-in { 0% { transform: translateY(100%); clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 100%); } 40% { transform: translateY(0); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } 100% { transform: translateY(-100%); clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); } }
        @keyframes slash-out { 0% { transform: translateY(-100%); } 60% { transform: translateY(0); } 100% { transform: translateY(100%); } }
        @keyframes scan-down { 0% { top: 0; opacity: 1; } 90% { top: 100%; opacity: 0; } 100% { top: 100%; opacity: 0; } }

        /* --- CONTAINER --- */
        .zone-container {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--z-bg);
            opacity: 0; visibility: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch; /* Smooth scroll mobile */
            background-image: linear-gradient(var(--z-grid) 1px, transparent 1px), linear-gradient(90deg, var(--z-grid) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        artifacts-zone.active .zone-container { animation: content-snap 0.1s linear 0.4s forwards, chromatic-shake 0.5s linear 0.4s; pointer-events: auto; }
        artifacts-zone.closing .zone-container { animation: content-hide 0.1s linear 0.4s forwards; pointer-events: none; }
        @keyframes content-snap { to { opacity: 1; visibility: visible; } }
        @keyframes content-hide { to { opacity: 0; visibility: hidden; } }
        @keyframes chromatic-shake { 0% { transform: translate(0,0); filter: drop-shadow(-2px 0 0 rgba(255,0,0,0.5)) drop-shadow(2px 0 0 rgba(0,0,255,0.5)); } 40% { transform: translate(2px, -2px); filter: none; } 100% { transform: translate(0,0); } }

        /* --- RESPONSIVE HEADER --- */
        .zone-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 20px 40px;
            background-color: var(--z-bg);
            border-bottom: 2px solid var(--z-accent);
            position: sticky; top: 0; z-index: 100;
            gap: 20px;
        }

        .zone-brand { display: flex; align-items: center; gap: 15px; }
        .status-dot { width: 10px; height: 10px; background-color: var(--z-accent); animation: pulse-fast 0.5s infinite alternate; }
        .zone-brand h1 { font-size: 1.5rem; color: var(--z-text); margin: 0; letter-spacing: 2px; white-space: nowrap; }

        .zone-controls { display: flex; align-items: center; gap: 15px; }

        /* Mobile Header Adjustments */
        @media (max-width: 768px) {
            .zone-header {
                padding: 15px;
                flex-direction: column; /* Stack on mobile */
                align-items: stretch;
                gap: 15px;
            }
            
            .zone-brand {
                justify-content: space-between;
                width: 100%;
            }
            
            .zone-brand h1 { font-size: 1.2rem; }
            
            .zone-controls {
                justify-content: space-between;
                width: 100%;
                gap: 10px;
            }
            
            /* Hide tech readout on mobile to save space */
            .tech-readout { display: none; }
        }

        /* --- BUTTONS --- */
        .lab-btn {
            background: transparent; border: 1px solid var(--z-sec); color: var(--z-text);
            padding: 8px 12px; font-family: var(--z-mono); font-size: 0.75rem;
            cursor: pointer; transition: all 0.2s; text-transform: uppercase;
            white-space: nowrap;
            flex: 1; /* Grow buttons on mobile */
            display: flex; justify-content: center; align-items: center;
        }
        
        .lab-btn:hover, .lab-btn:active {
            border-color: var(--z-accent); color: var(--z-accent); background-color: rgba(255, 51, 0, 0.05);
        }

        .lab-btn-exit { border: 1px solid var(--z-accent); color: var(--z-accent); font-weight: 700; }
        .lab-btn-exit:hover, .lab-btn-exit:active { background-color: var(--z-accent); color: var(--z-bg); }

        /* --- RESPONSIVE GRID --- */
        .zone-grid-layout {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1px; background-color: var(--z-sec); border: 1px solid var(--z-sec);
            margin: 40px;
        }

        @media (max-width: 768px) {
            .zone-grid-layout {
                margin: 15px; /* Less margin on mobile */
                grid-template-columns: 1fr; /* Single column force */
                display: flex;
                flex-direction: column;
                gap: 15px; /* Use gap instead of borders for cleaner mobile look */
                background-color: transparent;
                border: none;
            }
            
            .zone-item {
                border: 1px solid var(--z-sec); /* Individual borders on mobile */
            }
        }

        /* --- ITEM CONTENT --- */
        .zone-item {
            background-color: var(--z-bg); padding: 0; display: flex; flex-direction: column; position: relative;
            transition: background-color 0.3s;
        }
        .zone-item:hover { background-color: rgba(128,128,128, 0.03); }
        
        .item-large { grid-column: span 2; }
        .item-wide { grid-column: 1 / -1; }

        /* Reset spans on mobile */
        @media (max-width: 900px) {
            .item-large, .item-wide { grid-column: span 1; }
        }

        .item-header { display: flex; justify-content: space-between; padding: 10px 15px; border-bottom: 1px solid var(--z-sec); color: var(--z-text); opacity: 0.7; font-size: 0.7rem; letter-spacing: 1px; }
        .item-content { padding: 20px; color: var(--z-text); flex-grow: 1; }
        .item-content h2 { margin-top: 0; color: var(--z-accent); text-transform: uppercase; font-size: 1.8rem; line-height: 1.1; margin-bottom: 10px; }
        .item-content h3 { margin-top: 0; color: var(--z-accent); text-transform: uppercase; font-size: 1.2rem; margin-bottom: 10px; }
        .item-content p { font-size: 0.9rem; line-height: 1.6; opacity: 0.8; margin-bottom: 20px; }

        @media (max-width: 400px) {
            .item-content h2 { font-size: 1.5rem; }
            .item-content { padding: 15px; }
        }

        .code-block { background-color: rgba(0,0,0,0.2); font-family: monospace; font-size: 0.75rem; color: var(--z-text); padding: 15px; overflow-x: auto; border-left: 2px solid var(--z-accent); }
        artifacts-zone.light .code-block { background-color: #f0f0f0; color: #333; }

        .tech-stat { border-top: 1px solid var(--z-sec); padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.75rem; }
        .item-footer { padding: 10px 15px; border-top: 1px solid var(--z-sec); font-size: 0.7rem; text-align: right; color: var(--z-accent); }

        .zone-watermark { position: fixed; bottom: 20px; right: 20px; font-size: 5rem; color: var(--z-text); opacity: 0.03; font-weight: 900; pointer-events: none; }
        @media (max-width: 768px) { .zone-watermark { font-size: 3rem; bottom: 10px; right: 10px; } }

        /* Charts */
        .visual-block { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 20px 0; }
        .bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 50px; }
        .bar { width: 12px; background-color: var(--z-accent); opacity: 0.3; transition: all 0.3s; }
        .zone-item:hover .bar { opacity: 1; }

        @keyframes pulse-fast { from { opacity: 1; } to { opacity: 0.4; } }
      </style>

      <!-- CINEMATIC LAYERS -->
      <div class="shutter-layer shutter-accent"></div>
      <div class="shutter-layer shutter-base"></div>
      <div class="scanline"></div>
      
      <div class="zone-container">
        <header class="zone-header">
            <div class="zone-brand">
                <span class="status-dot"></span>
                <h1 data-t="lab_title">R&D_ARCHIVE</h1>
            </div>
            
            <div class="zone-controls">
                <!-- Readout hidden on mobile -->
                <span class="tech-readout" data-t="lab_sec_level">SEC_LEVEL: MAX</span>
                
                <button id="lab-theme-btn" class="lab-btn">
                    <span id="lab-theme-indicator">SYS:LGT</span>
                </button>
                <button id="lab-lang-btn" class="lab-btn">
                    <span id="lab-lang-indicator">LNG:ES</span>
                </button>
                <button id="close-artifacts" class="lab-btn lab-btn-exit" data-t="lab_btn_exit">
                    [ EXIT ]
                </button>
            </div>
        </header>

        <div class="zone-grid-layout">
            
            <!-- Manifesto -->
            <div class="zone-item item-large">
                <div class="item-header">
                    <span>001</span><span data-t="lab_manifesto_title">MANIFESTO</span>
                </div>
                <div class="item-content">
                    <h2 data-t="lab_manifesto_title">ENGINEERING FIRST</h2>
                    <p data-t="lab_manifesto_desc">Raw architectural experiments. No polish.</p>
                    <div class="tech-stat">
                        <span data-t="lab_status">STATUS:</span> 
                        <span class="status-dot" style="display:inline-block; vertical-align:middle; margin-left:5px;"></span>
                        <span data-t="lab_status_val">LIVE</span>
                    </div>
                </div>
            </div>

            <!-- Algorithm -->
            <div class="zone-item">
                <div class="item-header">
                    <span>002</span><span data-t="lab_algo_title">ALGO</span>
                </div>
                <div class="item-content code-block">
                    <code>
// Shutter Logic
const trigger = () => {
  return "GLITCH_EXEC";
}
                    </code>
                </div>
            </div>

            <!-- Metrics -->
            <div class="zone-item">
                <div class="item-header">
                    <span>003</span><span data-t="lab_metrics_title">DATA</span>
                </div>
                <div class="item-content visual-block">
                    <div class="bar-chart">
                        <div class="bar" style="height:40%"></div>
                        <div class="bar" style="height:70%"></div>
                        <div class="bar" style="height:30%"></div>
                        <div class="bar" style="height:90%"></div>
                        <div class="bar" style="height:60%"></div>
                    </div>
                </div>
                <div class="item-footer">OP_LEVEL: 98%</div>
            </div>

            <!-- Prototype -->
            <div class="zone-item item-wide">
                <div class="item-header">
                    <span>004</span><span data-t="lab_proto_title">PROTO</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_next_gen">NEXT_GEN_UI</h3>
                    <p data-t="lab_next_gen_desc">WebGL Integration Tests.</p>
                </div>
                <div class="item-footer" data-t="lab_awaiting">
                   WAITING...
                </div>
            </div>

        </div>
        
        <div class="zone-watermark" data-t="lab_classified">CLASSIFIED</div>
      </div>
    `;
  }
}

customElements.define('artifacts-zone', ArtifactsZone);
