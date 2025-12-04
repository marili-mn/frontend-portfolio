# Portfolio Profesional - Nahuel Marcilli

Un portfolio web moderno, escalable y de alto rendimiento, diseñado con una arquitectura de **Ingeniería de Software** utilizando **Vanilla JavaScript (ES6+)** y **Web Components Nativos**.

Este proyecto demuestra cómo construir una aplicación modular, reactiva e internacionalizada sin depender de frameworks pesados (como React o Angular), utilizando los estándares web modernos al máximo potencial.

## 🚀 Tecnologías y Herramientas

*   **Core:** HTML5 Semántico, CSS3 (Variables & Flexbox/Grid), JavaScript (ES Modules).
*   **Arquitectura:** Web Components (Custom Elements & Shadow DOM).
*   **Animaciones:** GSAP (GreenSock Animation Platform) + ScrollToPlugin.
*   **Estilos:** CSS Custom Properties para Theming (Dark/Light Mode) y diseño Responsive.
*   **Iconografía:** FontAwesome & SkillIcons.

## 🏗️ Arquitectura del Proyecto

El proyecto se aleja del clásico "script monolítico" para adoptar patrones de diseño profesionales:

### 1. Componentes Nativos (Web Components)
La UI está encapsulada en componentes reutilizables y autónomos ubicados en `src/components/`.
*   `<devsec-console>`: Terminal interactiva con sistema de comandos, historial y temas dinámicos.
*   `<project-card>`: Renderiza proyectos dinámicamente con Shadow DOM para aislamiento de estilos.
*   `<app-header>`: Maneja la navegación y controles de estado.
*   `<skills-section>`: Genera la grilla de habilidades desde datos estructurados.
*   `<contact-button>`: Botón inteligente con feedback visual y copiado al portapapeles.
*   `<toast-notification>`: Sistema de notificaciones no intrusivas.

### 2. Gestión de Estado (Servicios Singleton)
La lógica de negocio y el estado global están desacoplados de la vista mediante servicios en `src/services/`.
*   **`TranslationService`:** Maneja la internacionalización (i18n). Carga archivos JSON y notifica cambios de idioma a través de `CustomEvents`.
*   **`ThemeService`:** Gestiona el tema (Claro/Oscuro) de forma reactiva mediante eventos.
*   **`ContactService`:** Centraliza la lógica de contacto (email, mailto, clipboard) para consistencia en toda la app.

### 3. Patrón de Diseño
*   **Observer Pattern (via Eventos):** Los componentes se suscriben a cambios de estado global.
*   **Singleton:** Los servicios aseguran una única instancia de verdad para el estado de la aplicación.

## 📂 Estructura de Directorios

```bash
frontend-portfolio/
├── 📁 src/
│   ├── 📁 components/    # Web Components (Lógica de UI)
│   │   ├── DevSecConsole.js
│   │   ├── ContactButton.js
│   │   ├── ToastNotification.js
│   │   ├── AppHeader.js
│   │   └── ...
│   ├── 📁 services/      # Lógica de Negocio & Estado
│   │   ├── TranslationService.js
│   │   ├── ThemeService.js
│   │   └── ContactService.js
│   ├── 📁 data/          # Fuentes de datos (JSON objects)
│   ├── 📁 components/    # Estilos encapsulados (JS Strings)
│   │   └── devsec-console-styles.js
│   └── main.js           # Punto de entrada / Orquestador
├── 📁 styles/            # Estilos Globales & Variables CSS
├── 📁 views/             # Plantillas HTML (Consola)
├── index.html            # Entry Point Semántico
└── js/                   # Archivos de traducción
```

## ✨ Características Clave

1.  **DevSec Terminal Integration:** Una consola de comandos completa y oculta (`Ctrl + Z` o UI Toggle) que permite explorar el perfil mediante comandos tipo bash (`help`, `projects`, `skills`), totalmente traducida y con temas dinámicos.
2.  **Sistema de Traducción Dinámico:** Cambio de idioma en tiempo real (Español, Inglés, Portugués, Alemán) afectando textos, consola y atributos ARIA.
3.  **Mobile-First Optimization:** Navegación nativa en móviles, menú overlay optimizado, áreas de toque ampliadas y scroll híbrido (Nativo en móvil, GSAP en escritorio) para máximo rendimiento.
4.  **Theming Avanzado:** Sistema de colores semánticos que adapta toda la interfaz, incluida la terminal, al modo Claro/Oscuro.
5.  **UX/Micro-interacciones:** Feedback inmediato en acciones (copiado de email, toasts, animaciones de footer).

## 🛠️ Instalación y Uso

Al ser una aplicación basada en estándares nativos, no requiere un proceso de compilación complejo (build step) para desarrollo, aunque se recomienda usar un servidor local para manejar los módulos ES6 correctamente (CORS).

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/marili-mn/frontend-portfolio.git
    ```

2.  **Ejecutar:**
    Puedes usar cualquier servidor estático, por ejemplo con la extensión "Live Server" de VS Code, o con Python:
    ```bash
    # Dentro de la carpeta del proyecto
    python -m http.server 8000
    ```

3.  **Abrir:** Navega a `http://localhost:8000`.

---
Desarrollado por **Nahuel Marcilli** - 2025