import { themeService } from '../services/ThemeService.js';
import { translationService } from '../services/TranslationService.js';

export class ArtifactsZone extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initListeners();
    
    // Initial State
    const currentTheme = themeService.getTheme();
    this.applyThemeClass(currentTheme);
    this.updateThemeIndicator(currentTheme);
    this.updateLangIndicator(translationService.currentLang);

    // Defer text rendering until translations are loaded
    if (translationService.loaded) {
        this.updateTexts();
    } else {
        window.addEventListener('translations-loaded', () => this.updateTexts(), { once: true });
    }

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
        const el = this.shadowRoot.querySelector(sel);
        if(el) el.innerHTML = t(k);
    };

    set('[data-t="lab_title"]', 'lab_title');
    set('[data-t="lab_sec_level"]', 'lab_sec_level');
    set('[data-t="lab_btn_exit"]', 'lab_btn_exit');
    
    set('[data-t="lab_manifesto_title"]', 'lab_manifesto_title');
    set('[data-t="lab_manifesto_desc"]', 'lab_manifesto_desc');
    
    const statusLabel = this.shadowRoot.querySelector('[data-t="lab_status"]');
    if(statusLabel) statusLabel.textContent = t('lab_status');
    const statusVal = this.shadowRoot.querySelector('[data-t="lab_status_val"]');
    if(statusVal) statusVal.textContent = t('lab_status_val');

    set('[data-t="lab_classified"]', 'lab_classified');

    // New Artifacts Zone Translations
    set('[data-t="lab_visual_engine"]', 'lab_visual_engine');
    set('[data-t="lab_system_core"]', 'lab_system_core');
    set('[data-t="lab_comp_theory"]', 'lab_comp_theory');

    set('[data-t="lab_css_print_engine_title"]', 'lab_css_print_engine_title');
    set('[data-t="lab_css_print_engine_desc"]', 'lab_css_print_engine_desc');
    set('[data-t="lab_css_print_engine_type"]', 'lab_css_print_engine_type');

    set('[data-t="lab_grid_layout_sys_hk_title"]', 'lab_grid_layout_sys_hk_title');
    set('[data-t="lab_grid_layout_sys_hk_desc"]', 'lab_grid_layout_sys_hk_desc');
    set('[data-t="lab_grid_layout_sys_hk_type"]', 'lab_grid_layout_sys_hk_type');

    set('[data-t="lab_ui_proto_archviz_title"]', 'lab_ui_proto_archviz_title');
    set('[data-t="lab_ui_proto_archviz_desc"]', 'lab_ui_proto_archviz_desc');
    set('[data-t="lab_ui_proto_archviz_type"]', 'lab_ui_proto_archviz_type');

    set('[data-t="lab_ubuntu_svr_deploy_title"]', 'lab_ubuntu_svr_deploy_title');
    set('[data-t="lab_ubuntu_svr_deploy_desc"]', 'lab_ubuntu_svr_deploy_desc');
    set('[data-t="lab_ubuntu_svr_deploy_type"]', 'lab_ubuntu_svr_deploy_type');

    set('[data-t="lab_proc_scheduling_title"]', 'lab_proc_scheduling_title');
    set('[data-t="lab_proc_scheduling_desc"]', 'lab_proc_scheduling_desc');
    set('[data-t="lab_proc_scheduling_type"]', 'lab_proc_scheduling_type');

    set('[data-t="lab_win32_sys_manual_title"]', 'lab_win32_sys_manual_title');
    set('[data-t="lab_win32_sys_manual_desc"]', 'lab_win32_sys_manual_desc');
    set('[data-t="lab_win32_sys_manual_type"]', 'lab_win32_sys_manual_type');

    set('[data-t="lab_bootloader_rec_title"]', 'lab_bootloader_rec_title');
    set('[data-t="lab_bootloader_rec_desc"]', 'lab_bootloader_rec_desc');
    set('[data-t="lab_bootloader_rec_type"]', 'lab_bootloader_rec_type');

    set('[data-t="lab_js_math_engine_title"]', 'lab_js_math_engine_title');
    set('[data-t="lab_js_math_engine_desc"]', 'lab_js_math_engine_desc');
    set('[data-t="lab_js_math_engine_type"]', 'lab_js_math_engine_type');

    set('[data-t="lab_data_struct_ref_title"]', 'lab_data_struct_ref_title');
    set('[data-t="lab_data_struct_ref_desc"]', 'lab_data_struct_ref_desc');
    set('[data-t="lab_data_struct_ref_type"]', 'lab_data_struct_ref_type');

    set('[data-t="lab_lang_theory_docs_title"]', 'lab_lang_theory_docs_title');
    set('[data-t="lab_lang_theory_docs_desc"]', 'lab_lang_theory_docs_desc');
    set('[data-t="lab_lang_theory_docs_type"]', 'lab_lang_theory_docs_type');

    set('[data-t="lab_root_repo_title"]', 'lab_root_repo_title');
    set('[data-t="lab_root_repo_desc"]', 'lab_root_repo_desc');
    set('[data-t="lab_root_repo_type"]', 'lab_root_repo_type');
    
    // Buttons
    this.shadowRoot.querySelectorAll('[data-t="lab_btn_src"]').forEach(el => el.textContent = t('lab_btn_src'));
    this.shadowRoot.querySelectorAll('[data-t="lab_btn_demo"]').forEach(el => el.textContent = t('lab_btn_demo'));

    // Joyitas (New Artifacts)
    set('[data-t="lab_massoluciones_title"]', 'lab_massoluciones_title');
    set('[data-t="lab_massoluciones_desc"]', 'lab_massoluciones_desc');
    set('[data-t="lab_massoluciones_type"]', 'lab_massoluciones_type');

    set('[data-t="lab_apuntes_title"]', 'lab_apuntes_title');
    set('[data-t="lab_apuntes_desc"]', 'lab_apuntes_desc');
    set('[data-t="lab_apuntes_type"]', 'lab_apuntes_type');

    set('[data-t="lab_karting_title"]', 'lab_karting_title');
    set('[data-t="lab_karting_desc"]', 'lab_karting_desc');
    set('[data-t="lab_karting_type"]', 'lab_karting_type');
  }
  
  updateThemeIndicator(theme) {
      const indicator = this.shadowRoot.querySelector('#lab-theme-indicator');
      if(indicator) indicator.textContent = theme === 'dark' ? 'SYS:DRK' : 'SYS:LGT';
  }

  updateLangIndicator(lang) {
      const indicator = this.shadowRoot.querySelector('#lab-lang-indicator');
      if(indicator) indicator.textContent = `LNG:${lang.toUpperCase()}`;
  }

  initListeners() {
    this.shadowRoot.querySelector('#close-artifacts')?.addEventListener('click', () => this.close());
    this.shadowRoot.querySelector('#lab-theme-btn')?.addEventListener('click', () => themeService.toggleTheme());
    this.shadowRoot.querySelector('#lab-lang-btn')?.addEventListener('click', () => {
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
  
      // Hide background elements
      const main = document.querySelector('main');
      const footer = document.querySelector('app-footer');
      const scrollBtn = document.querySelector('scroll-top-btn');
      
      if(main) main.style.display = 'none';
      if(footer) footer.style.display = 'none';
      if(scrollBtn) scrollBtn.style.display = 'none';
  
      // Reset cinematic state
      const wrapper = this.shadowRoot.querySelector('.cinematic-wrapper');
      if (wrapper) {
          wrapper.style.display = 'flex';
          wrapper.style.opacity = '1';
      }
  
      // Run Cinematic
      this.typeText(">> ENTERING LABORATORY...", () => {
          // Fade out cover to reveal content
          if (wrapper) {
              wrapper.style.opacity = '0';
              setTimeout(() => {
                  wrapper.style.display = 'none';
              }, 500);
          }
      });
    }
  
    close() {
      this.classList.remove('active');
      this.classList.add('closing');
  
      // Restore background elements
      const main = document.querySelector('main');
      const footer = document.querySelector('app-footer');
      const scrollBtn = document.querySelector('scroll-top-btn');
  
      if(main) main.style.display = '';
      if(footer) footer.style.display = '';
      if(scrollBtn) scrollBtn.style.display = '';
  
      setTimeout(() => {
          this.classList.remove('closing');
          document.body.style.overflow = '';
      }, 500); 
    }
  
    typeText(text, callback) {
        const textEl = this.shadowRoot.querySelector('.cinematic-text');
        if(!textEl) { 
            if(callback) callback(); 
            return; 
        }
  
        textEl.textContent = '';
        let i = 0;
        const speed = 35; 
  
        const type = () => {
            if (i < text.length) {
                textEl.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(callback, 600);
            }
        };
        
        setTimeout(type, 200);
    }
  
    render() {
      // Helper function for translations
      const t = (k) => translationService.t(k);
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100vw !important;
              height: 100dvh !important;
              pointer-events: none !important;
              visibility: hidden !important;
              display: block !important;
              font-family: var(--z-mono) !important;
              font-size: 14px !important;
              background-color: var(--z-bg) !important;
              opacity: 0 !important;
              transition: opacity 0.3s ease !important;
          }
          
          :host(.active) {
              z-index: 9000 !important;
              visibility: visible !important;
              pointer-events: auto !important;
              opacity: 1 !important;
          }
          
          :host(.closing) {
              z-index: 9000 !important;
              visibility: visible !important;
              pointer-events: none !important;
              opacity: 0 !important;
          }
  
          :host {
              --z-bg: #050505;
              --z-grid: #1a1a1a;
              --z-text: #f8fafc;
              --z-accent: #a78bfa;
              --z-accent-rgb-value: 167, 139, 250;
              --z-sec: #94a3b8;
              --z-mono: 'JetBrains Mono', 'Consolas', monospace;
          }
          
          :host(.light) {
              --z-bg: #fafaf9;
              --z-grid: #e7e5e4;
              --z-text: #1c1917;
              --z-accent: #ea580c;
              --z-accent-rgb-value: 234, 88, 12;
              --z-sec: #57534e;
          }
  
          /* CINEMATIC LAYER */
          .cinematic-wrapper {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              display: none; 
              align-items: center !important;
              justify-content: center !important;
              z-index: 9005 !important;
              /* Solid background to cover content */
              background-color: var(--z-bg) !important;
              pointer-events: none !important;
              transition: opacity 0.5s ease !important;
          }
          
          .cinematic-text {
              font-family: var(--z-mono) !important;
              font-size: clamp(1.2rem, 5vw, 2.5rem) !important;
              font-weight: 700 !important;
              color: var(--z-accent) !important;
              text-shadow: 0 0 15px rgba(var(--z-accent-rgb-value), 0.8) !important;
              letter-spacing: 2px !important;
              text-align: center !important;
          }
          
          .cursor {
              display: inline-block !important;
              width: 10px !important;
              height: 1.2em !important;
              background-color: var(--z-accent) !important;
              margin-left: 5px !important;
              vertical-align: bottom !important;
              animation: blink 0.8s infinite !important;
          }
          
          @keyframes blink { 
              0%, 100% { opacity: 1; } 
              50% { opacity: 0; } 
          }
  
          .scanline {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              pointer-events: none !important;
              background: linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%) !important;
              background-size: 100% 4px !important;
              animation: scanline-anim 15s linear infinite !important;
              opacity: 0.2 !important;
              z-index: 9001 !important;
          }
          @keyframes scanline-anim {
              0% { background-position: 0 0; }
              100% { background-position: 0 100vh; }
          }
          
          .zone-container {
              position: relative !important;
              width: 100% !important;
              height: 100% !important;
              overflow-y: auto !important;
              overflow-x: hidden !important; 
              padding: 15px !important; 
              color: var(--z-text) !important;
              background: 
                  linear-gradient(var(--z-grid) 1px, transparent 1px),
                  linear-gradient(90deg, var(--z-grid) 1px, transparent 1px) !important;
              background-size: 30px 30px !important;
              -webkit-overflow-scrolling: touch !important; 
          }
        .zone-header {
            display: flex !important;
            flex-wrap: wrap !important; /* Allow wrapping on small screens */
            justify-content: space-between !important;
            align-items: center !important;
            gap: 10px !important;
            padding: 10px 15px !important;
            background: rgba(var(--z-accent-rgb-value), 0.05) !important;
            border: 1px solid var(--z-grid) !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 100 !important;
            backdrop-filter: blur(5px);
        }
        
        .zone-brand {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
        }

        .zone-brand h1 {
            font-size: 1.1rem !important;
            font-weight: 700 !important;
            margin: 0 !important;
            color: var(--z-text) !important;
            white-space: nowrap !important;
        }

        .status-dot {
            width: 10px !important;
            height: 10px !important;
            border-radius: 50% !important;
            background-color: var(--z-accent) !important;
            animation: pulse-fast 1.5s ease-in-out infinite alternate !important;
        }

        .zone-controls {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            flex-grow: 1;
            justify-content: flex-end;
        }

        .tech-readout {
            font-size: 0.7rem !important;
            font-weight: 500 !important;
            display: none !important; /* Hidden on mobile to save space */
        }
        
        @media (min-width: 600px) {
            .tech-readout { display: inline-block !important; }
        }

        .lab-btn {
            font-family: var(--z-mono) !important;
            font-size: 0.8rem !important;
            font-weight: 500 !important;
            background: rgba(0,0,0,0.2) !important;
            border: 1px solid var(--z-sec) !important;
            color: var(--z-text) !important;
            padding: 8px 12px !important; /* Larger touch target */
            cursor: pointer !important;
            transition: all 0.2s !important;
            min-height: 40px !important; /* Better for touch */
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .lab-btn:active {
             transform: scale(0.95);
        }

        .lab-btn:hover {
            background: var(--z-accent) !important;
            color: var(--z-bg) !important;
            border-color: var(--z-accent) !important;
        }
        
        .lab-btn-exit {
            color: var(--z-accent) !important;
            border-color: var(--z-accent) !important;
            font-weight: 700 !important;
        }

        /* MOBILE FIRST LAYOUT: FLEX COLUMN */
        .zone-grid-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
            padding: 20px 0 80px 0 !important; /* Bottom padding for easy scroll */
        }
        
        .zone-item {
            background: var(--z-bg) !important;
            border: 1px solid var(--z-grid) !important;
            text-decoration: none !important;
            color: var(--z-text) !important;
            transition: all 0.2s !important;
            display: flex !important;
            flex-direction: column !important;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
        }

        .zone-item:hover, .zone-item:active {
            border-color: var(--z-accent) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        }

        .item-header {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important; /* Spread out */
            padding: 12px 15px !important;
            border-bottom: 1px solid var(--z-grid) !important;
            font-size: 0.75rem !important;
            font-weight: 700 !important;
        }

        .item-content {
            padding: 15px !important;
            flex-grow: 1 !important;
        }

        .item-content h2, .item-content h3 {
            font-size: 1.1rem !important; /* Slightly larger heading */
            margin: 0 0 10px 0 !important;
            font-weight: 700 !important;
            color: var(--z-text) !important;
        }
        
        .item-content p {
            font-size: 0.95rem !important; /* Readable text */
            color: var(--z-sec) !important;
            line-height: 1.6 !important;
            margin: 0 !important;
        }
        
        /* DESKTOP LAYOUT RESTORATION */
        @media (min-width: 768px) {
            .zone-grid-layout {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
                gap: 20px !important;
                padding: 20px 0 !important;
            }
            .item-large {
                grid-column: span 2 !important;
            }
            .lab-btn {
                padding: 5px 10px !important;
                min-height: auto !important;
            }
            .zone-header {
                flex-wrap: nowrap !important;
            }
        }

        .tech-stat {
            margin-top: 15px !important;
            font-size: 0.8rem !important;
            color: var(--z-sec) !important;
        }

        .featured-artifact {
            border: 1px solid var(--z-accent) !important;
            background: linear-gradient(180deg, rgba(var(--z-accent-rgb-value), 0.02), rgba(var(--z-accent-rgb-value), 0.08)) !important;
            z-index: 2 !important;
        }
        
        .featured-artifact:hover {
            box-shadow: 0 0 20px rgba(var(--z-accent-rgb-value), 0.2) !important;
            transform: translateY(-2px) !important;
            border-color: var(--z-text) !important;
        }
        
        :host(.light) .featured-artifact:hover {
             box-shadow: 0 0 20px rgba(var(--z-accent-rgb-value), 0.2) !important;
        }

        .featured-artifact .item-header {
            background-color: var(--z-accent) !important;
            color: var(--z-bg) !important;
            font-weight: 800 !important;
            border-bottom: none !important;
            justify-content: flex-start !important;
            gap: 10px !important;
        }
        
        .featured-artifact .category-label {
            border-color: rgba(0,0,0,0.3) !important;
            color: inherit !important;
            background: rgba(0,0,0,0.1) !important;
        }

        .item-footer {
            padding: 12px 15px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 10px !important;
            flex-wrap: wrap !important; /* Allow wrapping of buttons */
            border-top: 1px solid var(--z-grid) !important;
        }

        .artifact-actions {
            display: flex !important;
            gap: 8px !important;
            flex-shrink: 0 !important;
        }

        .artifact-btn {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-decoration: none !important;
            font-size: 0.75rem !important;
            font-weight: 700 !important;
            color: var(--z-accent) !important;
            border: 1px solid var(--z-accent) !important;
            padding: 8px 16px !important; /* Larger hit area */
            transition: all 0.2s !important;
            background: transparent !important;
            white-space: nowrap !important;
            min-width: 80px !important;
            line-height: 1 !important;
        }

        .artifact-btn:hover {
            background-color: var(--z-accent) !important;
            color: var(--z-bg) !important;
            box-shadow: 0 0 10px var(--z-accent) !important;
        }

        .zone-watermark { 
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            font-size: 5rem !important;
            color: var(--z-text) !important;
            opacity: 0.03 !important;
            font-weight: 900 !important;
            pointer-events: none !important;
            z-index: 0 !important;
        }
        @media (max-width: 768px) {
            .zone-watermark {
                font-size: 3rem !important;
                bottom: 10px !important;
                right: 10px !important;
            }
        }

        .category-label {
            font-size: 0.6rem !important;
            padding: 2px 6px !important;
            border: 1px solid var(--z-accent) !important;
            border-radius: 2px !important;
            color: var(--z-accent) !important;
        }

        @keyframes pulse-fast {
            from { opacity: 1; }
            to { opacity: 0.4; }
        }
      </style>
      
      <!-- CINEMATIC LAYERS -->
      <div class="shutter-layer shutter-accent"></div>
      <div class="shutter-layer shutter-base"></div>
      <div class="scanline"></div>
      
      <!-- NEW TYPEWRITER LAYER -->
      <div class="cinematic-wrapper">
         <span class="cinematic-text"></span><span class="cursor"></span>
      </div>
      
      <div class="zone-container">
        <header class="zone-header">
            <div class="zone-brand">
                <span class="status-dot"></span>
                <h1 data-t="lab_title">R&D_ARCHIVE</h1>
            </div>
            
            <div class="zone-controls">
                <span class="tech-readout" data-t="lab_sec_level">ACCESS: GRANTED</span>
                
                <button id="lab-theme-btn" class="lab-btn">
                    <span id="lab-theme-indicator">SYS:LGT</span>
                </button>
                <button id="lab-lang-btn" class="lab-btn">
                    <span id="lab-lang-indicator">LNG:ES</span>
                </button>
                <button id="close-artifacts" class="lab-btn lab-btn-exit" data-t="lab_btn_exit">
                    [ CLOSE ]
                </button>
            </div>
        </header>
        <div class="zone-grid-layout">
            
            <div class="zone-item item-large">
                <div class="item-header">
                    <span>000</span><span data-t="lab_manifesto_title">MANIFESTO</span>
                </div>
                <div class="item-content">
                    <h2 data-t="lab_manifesto_title">ENGINEERING FIRST</h2>
                    <p data-t="lab_manifesto_desc"></p>
                    <div class="tech-stat">
                        <span data-t="lab_status">STATUS:</span> 
                        <span class="status-dot" style="display:inline-block; vertical-align:middle; margin-left:5px;"></span>
                        <span data-t="lab_status_val">LIVE</span>
                    </div>
                </div>
            </div>
            <div class="zone-item featured-artifact">
                <div class="item-header">
                    <span>001</span><span class="category-label" data-t="lab_system_core">SYSTEM_CORE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_massoluciones_title"></h3>
                    <p data-t="lab_massoluciones_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_massoluciones_type"></span>
                    <div class="artifact-actions">
                        <a href="https://github.com/marili-mn/MasSoluciones" target="_blank" class="artifact-btn" data-t="lab_btn_src">[ SRC ]</a>
                        <a href="https://mas-soluciones.vercel.app/" target="_blank" class="artifact-btn" data-t="lab_btn_demo">[ DEMO ]</a>
                    </div>
                </div>
            </div>
            <div class="zone-item featured-artifact">
                <div class="item-header">
                    <span>002</span><span class="category-label" data-t="lab_visual_engine">VISUAL_ENGINE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_apuntes_title"></h3>
                    <p data-t="lab_apuntes_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_apuntes_type"></span>
                    <div class="artifact-actions">
                        <a href="https://github.com/marili-mn/ApuntesDelFondo" target="_blank" class="artifact-btn" data-t="lab_btn_src">[ SRC ]</a>
                        <a href="https://apuntes-del-fondo.vercel.app/" target="_blank" class="artifact-btn" data-t="lab_btn_demo">[ DEMO ]</a>
                    </div>
                </div>
            </div>
            <div class="zone-item featured-artifact">
                <div class="item-header">
                    <span>003</span><span class="category-label" data-t="lab_comp_theory">COMP_THEORY</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_karting_title"></h3>
                    <p data-t="lab_karting_desc"></p>
                </div>
                <div class.item-footer">
                    <span data-t="lab_karting_type"></span>
                    <div class="artifact-actions">
                        <a href="https://github.com/marili-mn/finalIDW" target="_blank" class="artifact-btn" data-t="lab_btn_src">[ SRC ]</a>
                        <a href="https://final-idw-three.vercel.app/" target="_blank" class="artifact-btn" data-t="lab_btn_demo">[ DEMO ]</a>
                    </div>
                </div>
            </div>
            <!-- MODULE: ROOT_ACCESS -->
            <a href="https://graphic-desing-practices.vercel.app/" target="_blank" class="zone-item item-wide" style="border-color: var(--z-accent);">
                <div class="item-header">
                    <span>014</span><span class="category-label" data-t="lab_system_core">SYSTEM_CORE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_root_repo_title"></h3>
                    <p data-t="lab_root_repo_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_root_repo_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            <a href="https://graphic-desing-practices.vercel.app/cardVectors/business_card_white_a4_frame_print.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>004</span><span class="category-label" data-t="lab_visual_engine">VISUAL_ENGINE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_css_print_engine_title"></h3>
                    <p data-t="lab_css_print_engine_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_css_print_engine_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            <a href="https://graphic-desing-practices.vercel.app/hakaiLetter/Hakai.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>005</span><span class="category-label" data-t="lab_visual_engine">VISUAL_ENGINE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_grid_layout_sys_hk_title"></h3>
                    <p data-t="lab_grid_layout_sys_hk_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_grid_layout_sys_hk_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            
             <a href="https://graphic-desing-practices.vercel.app/hackDesing/arquinteriorNewConcept.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>006</span><span class="category-label" data-t="lab_visual_engine">VISUAL_ENGINE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_ui_proto_archviz_title"></h3>
                    <p data-t="lab_ui_proto_archviz_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_ui_proto_archviz_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            <a href="https://graphic-desing-practices.vercel.app/otherAssets/SO-S13-A1/" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>007</span><span class="category-label" data-t="lab_system_core">SYSTEM_CORE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_ubuntu_svr_deploy_title"></h3>
                    <p data-t="lab_ubuntu_svr_deploy_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_ubuntu_svr_deploy_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            <a href="https://graphic-desing-practices.vercel.app/dokumenterienFadena/" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>008</span><span class="category-label" data-t="lab_system_core">SYSTEM_CORE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_proc_scheduling_title"></h3>
                    <p data-t="lab_proc_scheduling_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_proc_scheduling_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            
            <a href="https://graphic-desing-practices.vercel.app/winDoc.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>009</span><span class="category-label" data-t="lab_system_core">SYSTEM_CORE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_win32_sys_manual_title"></h3>
                    <p data-t="lab_win32_sys_manual_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_win32_sys_manual_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            <a href="https://graphic-desing-practices.vercel.app/otherAssets/grubRestoreMap.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>010</span><span class="category-label" data-t="lab_system_core">SYSTEM_CORE</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_bootloader_rec_title"></h3>
                    <p data-t="lab_bootloader_rec_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_bootloader_rec_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
             <a href="https://graphic-desing-practices.vercel.app/otherAssets/%C3%81lgebrajavascript.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>011</span><span class="category-label" data-t="lab_comp_theory">COMP_THEORY</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_js_math_engine_title"></h3>
                    <p data-t="lab_js_math_engine_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_js_math_engine_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            <a href="https://graphic-desing-practices.vercel.app/otherAssets/guia_datos.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>012</span><span class="category-label" data-t="lab_comp_theory">COMP_THEORY</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_data_struct_ref_title"></h3>
                    <p data-t="lab_data_struct_ref_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_data_struct_ref_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
            
             <a href="https://graphic-desing-practices.vercel.app/otherAssets/guia_lenguajes.html" target="_blank" class="zone-item">
                <div class="item-header">
                    <span>013</span><span class="category-label" data-t="lab_comp_theory">COMP_THEORY</span>
                </div>
                <div class="item-content">
                    <h3 data-t="lab_lang_theory_docs_title"></h3>
                    <p data-t="lab_lang_theory_docs_desc"></p>
                </div>
                <div class="item-footer">
                    <span data-t="lab_lang_theory_docs_type"></span>
                    <span class="click-hint">↗</span>
                </div>
            </a>
        </div>
        
        <div class="zone-watermark" data-t="lab_classified">OPEN ARCHIVE</div>
      </div>
    `;
  }
}

customElements.define('artifacts-zone', ArtifactsZone);