import { fallbackTranslations } from '../data/fallbackTranslations.js';

// Singleton pattern for Translation Service
class TranslationService {
  constructor() {
    if (TranslationService.instance) {
      return TranslationService.instance;
    }
    
    this.currentLang = localStorage.getItem('portfolio-lang') || 'es';
    this.translations = {};
    this.loaded = false;
    TranslationService.instance = this;
  }

  async init() {
    try {
      // Attempt to fetch fresh JSON with cache busting
      const response = await fetch(`./js/translations.json?v=${Date.now()}`);
      if (!response.ok) throw new Error('Failed to load translations JSON');
      this.translations = await response.json();
      console.log('TranslationService: JSON loaded successfully');
    } catch (error) {
      console.warn('TranslationService: JSON load failed, using fallbacks.', error);
      // We don't set this.translations to fallbackTranslations directly to allow mixed usage
      // (e.g. partial JSON load + fallbacks)
    } finally {
      this.loaded = true;
      this.setLanguage(this.currentLang);
      window.dispatchEvent(new CustomEvent('translations-loaded'));
    }
  }

  /**
   * Returns the translation for a given key in the current language
   * Robust Waterfall: JSON -> Fallback(Current Lang) -> Fallback(EN) -> Key
   * @param {string} key - The translation key
   * @returns {string} - The translated text
   */
  t(key) {
    const lang = this.currentLang;

    // 1. Try loaded JSON
    if (this.translations[key] && this.translations[key][lang]) {
        return this.translations[key][lang];
    }

    // 2. Try Fallback Dictionary (Current Language)
    if (fallbackTranslations[key] && fallbackTranslations[key][lang]) {
        return fallbackTranslations[key][lang];
    }

    // 3. Try Fallback Dictionary (English - Ultimate Safety)
    if (fallbackTranslations[key] && fallbackTranslations[key]['en']) {
        return fallbackTranslations[key]['en'];
    }

    // 4. Give up and return key (Should rarely happen now)
    return key;
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