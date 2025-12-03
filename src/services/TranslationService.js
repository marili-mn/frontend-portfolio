// Singleton pattern for Translation Service
class TranslationService {
  constructor() {
    if (TranslationService.instance) {
      return TranslationService.instance;
    }
    
    this.currentLang = localStorage.getItem('portfolio-lang') || 'es';
    this.translations = {};
    this.loaded = false;
    this.observers = new Set(); // Pattern Observer for components
    TranslationService.instance = this;
  }

  async init() {
    try {
      const response = await fetch('./js/translations.json');
      if (!response.ok) throw new Error('Failed to load translations');
      this.translations = await response.json();
      this.loaded = true;
      this.setLanguage(this.currentLang);
    } catch (error) {
      console.error('TranslationService Error:', error);
      // Fallback could be implemented here
    }
  }

  /**
   * Returns the translation for a given key in the current language
   * @param {string} key - The translation key (e.g., "nav_projects")
   * @returns {string} - The translated text
   */
  t(key) {
    if (!this.translations[key]) return key;
    return this.translations[key][this.currentLang] || key;
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
    
    // Dispatch custom event so components can react globally
    window.dispatchEvent(new CustomEvent('language-changed', { 
      detail: { language: lang } 
    }));
  }
  
  getCurrentLang() {
    return this.currentLang;
  }
}

export const translationService = new TranslationService();