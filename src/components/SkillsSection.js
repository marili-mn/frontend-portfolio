import { skills } from '../data/skillsData.js';
import { translationService } from '../services/TranslationService.js';

export class SkillsSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    window.addEventListener('language-changed', () => this.updateTexts());
  }

  updateTexts() {
      const titles = this.querySelectorAll('[data-translate]');
      titles.forEach(el => {
          el.textContent = translationService.t(el.getAttribute('data-translate'));
      });
  }

  createSkillItem(skill) {
    let iconImg;
    if (skill.customImg) {
        iconImg = `<img src="${skill.customImg}" alt="${skill.name} icon" class="skill-icon">`;
    } else {
        iconImg = `<img src="https://skillicons.dev/icons?i=${skill.icon}" alt="${skill.name} icon" class="skill-icon">`;
    }

    return `
      <button class="skills__list-item">
        ${iconImg} ${skill.name}
      </button>
    `;
  }

  createCategory(titleKey, skillList) {
    return `
      <section class="skills-category">
        <h3 data-translate="${titleKey}">${translationService.t(titleKey)}</h3>
        <nav class="skills__list" role="navigation" aria-label="${titleKey}">
          ${skillList.map(s => this.createSkillItem(s)).join('')}
        </nav>
      </section>
    `;
  }

  render() {
    this.innerHTML = `
      <h2 class="section__title" data-translate="skills_title">${translationService.t('skills_title')}</h2>
      ${this.createCategory('frontend_title', skills.frontend)}
      ${this.createCategory('backend_title', skills.backend)}
      ${this.createCategory('other_tech_title', skills.other)}
    `;
  }
}

customElements.define('skills-section', SkillsSection);