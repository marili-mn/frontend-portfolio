// Theme Service Singleton
class ThemeService {
    constructor() {
      if (ThemeService.instance) {
        return ThemeService.instance;
      }
      
      this.theme = localStorage.getItem('portfolio-theme') || 'light';
      this.icon = localStorage.getItem('portfolio-icon') || 'fa-sun';
      
      // Explicitly set light mode as default for concentration if no preference is stored
      if (!localStorage.getItem('portfolio-theme')) {
        this.theme = 'light';
        this.icon = 'fa-sun';
        localStorage.setItem('portfolio-theme', this.theme);
        localStorage.setItem('portfolio-icon', this.icon);
      }

      this.init();
      
      ThemeService.instance = this;
    }
  
    init() {
      this.applyTheme(this.theme, this.icon);
      this.initListeners();
    }
  
    initListeners() {
      const btn = document.querySelector('#btn-theme');
      if (btn) {
        // We attach event to the parent button
        btn.parentElement.addEventListener('click', () => this.toggleTheme());
      }
    }
  
    applyTheme(theme, icon) {
      document.body.className = theme;
      const btnIcon = document.querySelector('#btn-theme');
      if (btnIcon) {
        btnIcon.className = `fas ${icon}`;
      }
      
      // Save state
      localStorage.setItem('portfolio-theme', theme);
      localStorage.setItem('portfolio-icon', icon);
      
      this.theme = theme;
      this.icon = icon;
    }
  
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light';
      const newIcon = this.theme === 'light' ? 'fa-moon' : 'fa-sun';
      this.applyTheme(newTheme, newIcon);
    }
  }
  
  export const themeService = new ThemeService();