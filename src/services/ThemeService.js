// Theme Service Singleton (Refactored: Pure State & Events)
class ThemeService {
    constructor() {
      if (ThemeService.instance) {
        return ThemeService.instance;
      }
      
      // State initialization from storage or default
      this.theme = localStorage.getItem('portfolio-theme') || 'light';
      this.icon = localStorage.getItem('portfolio-icon') || 'fa-sun';
      
      // Enforce default if clean slate
      if (!localStorage.getItem('portfolio-theme')) {
        this.saveState(this.theme, this.icon);
      }

      ThemeService.instance = this;
    }
  
    init() {
      // Broadcast initial state so listeners can update the UI
      this.emitChange();
    }

    // Getters for sync access if needed
    getTheme() { return this.theme; }
    getIcon() { return this.icon; }
  
    saveState(theme, icon) {
      localStorage.setItem('portfolio-theme', theme);
      localStorage.setItem('portfolio-icon', icon);
      this.theme = theme;
      this.icon = icon;
    }
  
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light';
      const newIcon = this.theme === 'light' ? 'fa-moon' : 'fa-sun';
      
      this.saveState(newTheme, newIcon);
      this.emitChange();
    }

    emitChange() {
        window.dispatchEvent(new CustomEvent('theme-changed', {
            detail: {
                theme: this.theme,
                icon: this.icon
            }
        }));
    }
  }
  
  export const themeService = new ThemeService();