import devsecConsoleStyles from './devsec-console-styles.js';
import { skills } from '../data/skillsData.js';
import { projects } from '../data/projectsData.js';
import { translationService } from '../services/TranslationService.js';
import { themeService } from '../services/ThemeService.js';

export class DevSecConsole extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isVisible = false;
        this.currentCommandIndex = -1;
        this.commandHistory = [];
    }

    async connectedCallback() {
        const consoleHtml = await this.fetchConsoleHtml();
        // INLINED CRITICAL STYLES to prevent FOUC
        const criticalStyles = `
            :host {
                display: block;
                position: fixed;
                top: 0; 
                left: 0;
                width: 100vw; 
                height: 100vh;
                z-index: 99999;
                pointer-events: none;
                visibility: hidden; 
            }
            :host(.visible) {
                pointer-events: auto;
                visibility: visible;
            }
        `;
        this.shadowRoot.innerHTML = `<style>${criticalStyles} ${devsecConsoleStyles}</style>${consoleHtml}`;
        
        this.elements = {
            terminalWindow: this.shadowRoot.getElementById('terminalWindow'),
            terminalBody: this.shadowRoot.getElementById('terminal'),
            promptInput: this.shadowRoot.getElementById('promtInput'),
            promptCloneTemplate: this.shadowRoot.getElementById('promptClone'),
            dateSpan: this.shadowRoot.getElementById('date'),
            header: this.shadowRoot.querySelector('.header')
        };

        this.injectWindowControls();
        
        // Theme Integration
        this.applyTheme(themeService.getTheme());
        window.addEventListener('theme-changed', (e) => this.applyTheme(e.detail.theme));

        // Language Integration
        if (translationService.loaded) {
            this.updateConsoleTexts();
            this.updateTemplates();
        } else {
            window.addEventListener('translations-loaded', () => {
                this.updateConsoleTexts();
                this.updateTemplates();
            });
        }
        
        window.addEventListener('language-changed', () => {
            this.updateConsoleTexts();
            this.updateTemplates();
        });

        this.elements.promptInput.focus();
        this.elements.terminalWindow.addEventListener('click', (e) => {
            if (!e.target.closest('.window-controls')) {
                this.elements.promptInput.focus();
            }
        });
        
        // Check if handleKeyDown exists before binding to avoid errors if class methods are missing
        if (this.handleKeyDown) {
            this.elements.promptInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        } else {
            console.error("DevSecConsole: handleKeyDown method is missing!");
        }

        this.updateTemplates();
    }

    updateConsoleTexts() {
        if (!translationService.loaded) return;

        // 1. Login Message
        const loginMsg = this.shadowRoot.querySelector('.alert-success');
        if (loginMsg) {
            let dateText = new Date().toDateString();
            const dateEl = this.shadowRoot.getElementById('date');
            if (dateEl && dateEl.innerText) dateText = dateEl.innerText;
            loginMsg.innerHTML = `${translationService.t('console_login')} - <span class="error" id="date">${dateText}</span>`;
        }

        // 2. Welcome Block
        const welcomeBlock = this.shadowRoot.getElementById('console-welcome-block');
        if (welcomeBlock) {
            welcomeBlock.innerHTML = `
                <div class="title">${translationService.t('console_welcome_title')}</div>
                ${translationService.t('console_welcome_text')} <span class="command">help</span>
            `;
        }

        // 3. Hint (System Message)
        let hintDiv = this.elements.terminalBody.querySelector('.system-hint');
        if (!hintDiv) {
            this.addSystemMessage(translationService.t('console_hint'), 'system-hint');
        } else {
            hintDiv.innerHTML = translationService.t('console_hint');
        }

        // 4. Prompt User
        const promptUser = this.shadowRoot.querySelector('.prompt .title');
        if(promptUser) promptUser.textContent = translationService.t('console_user');
    }

    applyTheme(theme) {
        if (theme === 'light') {
            this.classList.add('light');
        } else {
            this.classList.remove('light');
        }
    }

    injectWindowControls() {
        const controlsHtml = `
            <div class="window-controls">
                <div class="btn-control minimize" title="Minimize">─</div>
                <div class="btn-control maximize" title="Maximize">□</div>
                <div class="btn-control close" title="Close">✕</div>
            </div>
        `;
        this.elements.header.insertAdjacentHTML('beforeend', controlsHtml);

        this.shadowRoot.querySelector('.btn-control.close').addEventListener('click', () => this.close());
        this.shadowRoot.querySelector('.btn-control.minimize').addEventListener('click', () => this.close());
        this.shadowRoot.querySelector('.btn-control.maximize').addEventListener('click', () => this.toggleMaximize());
    }

    toggleMaximize() {
        const term = this.elements.terminalWindow;
        if (term.style.width === '100%') {
            term.style.width = '80%';
            term.style.height = '80%';
            term.style.borderRadius = '5px';
        } else {
            term.style.width = '100%';
            term.style.height = '100%';
            term.style.borderRadius = '0';
        }
    }

    addSystemMessage(htmlContent, className = '') {
        const msg = document.createElement('div');
        if (className) msg.classList.add(className);
        msg.innerHTML = htmlContent;
        msg.style.marginTop = "10px";
        msg.style.color = "var(--gray)";
        this.elements.terminalBody.appendChild(msg);
    }

    async fetchConsoleHtml() {
        const response = await fetch('views/console.html');
        return response.text();
    }

    // --- Command Logic (Restored) ---

    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.enterCommand(event);
        } else if (event.key === "ArrowUp") {
            event.preventDefault(); 
            this.navigateCommandHistory(1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault(); 
            this.navigateCommandHistory(-1);
        }
    }

    navigateCommandHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.currentCommandIndex += direction;

        if (this.currentCommandIndex >= this.commandHistory.length) {
            this.currentCommandIndex = this.commandHistory.length - 1;
        } else if (this.currentCommandIndex < 0) {
            this.currentCommandIndex = 0;
        }
        this.elements.promptInput.value = this.commandHistory[this.commandHistory.length - 1 - this.currentCommandIndex];
    }

    enterCommand(event) {
        const commandText = event.target.value.trim();
        if (commandText) {
            this.commandHistory.push(commandText);
            this.currentCommandIndex = -1; 
        }

        const promtElement = this.elements.promptCloneTemplate.cloneNode(true);
        promtElement.classList.remove('hidden-template');
        promtElement.querySelector('.promtCloneInput').innerHTML = commandText;
        
        const output = this.selectCommandBlock(commandText);
        promtElement.querySelector('.promtCloneContent').appendChild(output);
        
        this.elements.terminalBody.appendChild(promtElement);
        this.elements.promptInput.value = '';
        
        // Smooth scroll to bottom
        setTimeout(() => {
             this.elements.terminalBody.scrollTop = this.elements.terminalBody.scrollHeight;
        }, 10);
        
        this.elements.promptInput.focus();
    }

    selectCommandBlock(command) {
        const lowerCommand = command.toLowerCase();
        let element;

        switch (lowerCommand) {
            case 'help':
                element = this.shadowRoot.getElementById('help').cloneNode(true);
                break;
            case 'about':
                element = this.shadowRoot.getElementById('about').cloneNode(true);
                break;
            case 'social':
                element = this.shadowRoot.getElementById('social').cloneNode(true);
                break;
            case 'skills':
                element = this.shadowRoot.getElementById('skills-template').cloneNode(true);
                break;
            case 'education':
                element = this.shadowRoot.getElementById('education').cloneNode(true);
                break;
            case 'experience':
                element = this.shadowRoot.getElementById('experience').cloneNode(true);
                break;
            case 'projects':
                element = this.shadowRoot.getElementById('projects-template').cloneNode(true);
                break;
            case 'clear':
                return this.clearCommand();
            case 'exit':
                this.close();
                return document.createElement('span');
            default:
                return this.notFoundCommand(command);
        }
        element.classList.remove('hidden-template');
        return element;
    }

    clearCommand() {
        this.elements.terminalBody.innerHTML = `
            <div class="command">
                <div class="alert alert-success" role="alert"></div>
            </div>
            <div id="console-welcome-block"></div>
        `;
        this.updateConsoleTexts();
        return document.createElement('span'); 
    }

    notFoundCommand(command) {
        const element = document.createElement('span');
        element.innerText = `-bash: ${command}: command not found`;
        element.classList.add('error');
        return element;
    }

    updateTemplates() {
        // 1. Generic Translation for ALL Static Templates
        const templates = this.shadowRoot.querySelectorAll('.hidden-template');
        templates.forEach(template => {
            const translatables = template.querySelectorAll('[data-translate]');
            translatables.forEach(el => {
                const key = el.getAttribute('data-translate');
                el.textContent = translationService.t(key);
            });
        });

        // 2. Dynamic Content Injection (Skills, Projects, Socials)
        // SKILLS
        const skillsTemplate = this.shadowRoot.getElementById('skills-template');
        if (skillsTemplate) {
            const indentDiv = skillsTemplate.querySelector('.indent');
            if (indentDiv) {
                indentDiv.innerHTML = this.renderSkills();
            }
        }

        // PROJECTS
        const projectsTemplate = this.shadowRoot.getElementById('projects-template');
        if (projectsTemplate) {
            const indentDiv = projectsTemplate.querySelector('.indent');
            if (indentDiv) {
                indentDiv.innerHTML = this.renderProjects();
            }
        }
        
        // SOCIAL
        const socialTemplate = this.shadowRoot.getElementById('social');
        if (socialTemplate) {
            const indentDiv = socialTemplate.querySelector('.indent');
            if (indentDiv) {
                indentDiv.innerHTML = this.renderSocials();
            }
        }
    }

    renderSkills() {
        let skillsHtml = '';
        for (const category in skills) {
            skillsHtml += `<div><span class="command">${category.charAt(0).toUpperCase() + category.slice(1)}</span>:`;
            skillsHtml += `<div class="indent">`;
            skills[category].forEach(skill => {
                skillsHtml += `<span class="title">${skill.name}</span> `;
            });
            skillsHtml += `</div></div>`;
        }
        return skillsHtml;
    }

    renderProjects() {
        let projectsHtml = '<div class="list-group">';
        projects.forEach((project, index) => {
            projectsHtml += `<a href="${project.repoUrl}" class="list-group-item list-group-item-action" target="_blank">${index + 1}. ${project.title}</a>`;
        });
        projectsHtml += '</div>';
        return projectsHtml;
    }

    renderSocials() {
        const socialLinks = [
            { name: "Github", url: "https://github.com/marili-mn" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/nahuel-marcilli" }
        ];

        let socialsHtml = '<div class="list-group">';
        socialLinks.forEach((link, index) => {
            socialsHtml += `<a href="${link.url}" class="list-group-item list-group-item-action" target="_blank">${index + 1}. ${link.name}</a>`;
        });
        socialsHtml += '</div>';
        return socialsHtml;
    }

    // Public API
    open() {
        if (this.isVisible) return;
        this.classList.add('visible');
        this.isVisible = true;
        this.elements.promptInput.focus();
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.isVisible) return;
        this.classList.remove('visible');
        this.isVisible = false;
        document.body.style.overflow = '';
    }

    toggle() {
        if (this.isVisible) {
            this.close();
        } else {
            this.open();
        }
    }
}

customElements.define('devsec-console', DevSecConsole);