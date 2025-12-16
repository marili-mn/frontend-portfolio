# Portfolio Profesional - Nahuel Marcilli

Un portfolio web moderno, escalable y de alto rendimiento, diseñado con una arquitectura de **Ingeniería de Software** utilizando **Vanilla JavaScript (ES6+)** y **Web Components Nativos**.

Este proyecto demuestra cómo construir una aplicación modular, reactiva e internacionalizada sin depender de frameworks pesados (como React o Angular), utilizando los estándares web modernos al máximo potencial.

## 🚀 Tecnologías y Herramientas

*   **Core:** HTML5 Semántico, CSS3 (Variables & Flexbox/Grid), JavaScript (ES Modules).
*   **Arquitectura:** Web Components (Custom Elements & Shadow DOM).
*   **Animaciones:** GSAP (GreenSock Animation Platform) + ScrollToPlugin + RequestAnimationFrame nativo.
*   **Estilos:** CSS Custom Properties para Theming (Dark/Light Mode) y diseño Responsive.
*   **Iconografía:** FontAwesome & SkillIcons.

## 🏗️ Arquitectura del Proyecto

El proyecto se aleja del clásico "script monolítico" para adoptar patrones de diseño profesionales:

### 1. Componentes Nativos (Web Components)
La UI está encapsulada en componentes reutilizables y autónomos ubicados en `src/components/`.
*   `<devsec-console>`: Terminal interactiva con sistema de comandos, historial y temas dinámicos.
*   `<identity-profile>`: **[Nuevo]** Subcomponente de identidad con lógica de interacción avanzada ("Inverted Magnet"), manejo de hitboxes precisos y soporte táctil/escritorio híbrido.
*   `<project-card>`: Renderiza proyectos dinámicamente con Shadow DOM para aislamiento de estilos.
*   `<app-header>`: Maneja la navegación y controles de estado.
*   `<skills-section>`: Genera la grilla de habilidades (Engineering Grid) con coordenadas interactivas.
*   `<artifacts-zone>`: Archivo de experimentos oculto con cinemática de entrada tipo "Typewriter" y layout optimizado para lectura.
*   `<contact-button>`: Botón inteligente con feedback visual y copiado al portapapeles.
*   `<contact-form>`: Ventana modal estilo "Terminal Segura" que orquesta el envío de mensajes.
*   `<toast-notification>`: Sistema de notificaciones no intrusivas.

### 2. Gestión de Estado & Resiliencia
La lógica de negocio y el estado global están desacoplados mediante servicios en `src/services/`.
*   **`TranslationService`:** Sistema de internacionalización híbrido y resiliente.
    *   **Capa 1:** Intenta cargar `translations.json` (Live update).
    *   **Capa 2:** Si falla la red o el caché, activa `fallbackTranslations.js` (Hardcoded backup).
    *   Garantiza que la UI nunca muestre claves de error (`lbl_name`) incluso offline.
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
│   │   ├── IdentityProfile.js # Lógica de identidad y animación
│   │   ├── ArtifactsZone.js
│   │   ├── SkillsSection.js
│   │   └── ...
│   ├── 📁 services/      # Lógica de Negocio & Estado
│   │   ├── TranslationService.js
│   │   ├── ThemeService.js
│   │   └── ContactService.js
│   ├── 📁 data/          # Fuentes de datos (JSON objects)
│   └── main.js           # Punto de entrada / Orquestador
├── 📁 assets/            # Recursos estáticos
│   ├── 📁 htmlTemplates/ # Plantillas de CV optimizadas (ATS & Foto)
│   └── ...
├── 📁 styles/            # Estilos Globales & Variables CSS
├── index.html            # Entry Point Semántico
└── js/                   # Archivos de traducción
```

## ✨ Características Clave

1.  **DevSec Terminal Integration:** Una consola de comandos completa y oculta (`Ctrl + Z` o UI Toggle) que permite explorar el perfil mediante comandos tipo bash (`help`, `projects`, `skills`).
2.  **Interactive Identity Profile:** Una sección "Sobre Mí" reimaginada con un componente de identidad que reacciona inteligentemente al cursor y al tacto. Implementa "zonas de disparo" precisas para evitar activaciones accidentales y mantiene la navegación social siempre accesible.
3.  **Secure Contact Workflow:** Sistema de contacto "Sin Fricción". Orquesta una coreografía de UX: Copia al portapapeles -> Feedback Visual -> Pausa -> Apertura de una **Terminal de Contacto Modal** (sin salir de la web).
4.  **Sistema de Traducción Resiliente:** Cambio de idioma en tiempo real (Español, Inglés, Portugués, Alemán) con arquitectura de "Doble Capa".
5.  **Mobile-First Optimization:** Navegación nativa en móviles, menús overlay optimizados y áreas de toque ampliadas.
6.  **Theming Avanzado:** Sistema de colores semánticos (Arcane OS / Paper & Ink) que adapta toda la interfaz.

### 📄 Estrategia de Reclutamiento (ATS & PDF Engineering)
El proyecto implementa una capa de "Ingeniería de Candidato" para maximizar la conversión:
*   **Formato "Raw Tech Harvard":** Plantillas HTML/PDF diseñadas para ser parseadas por algoritmos ATS sin errores.
*   **PDF Optimization:** CSS específico de impresión (`@media print`) que fuerza el uso de tipografía segura (`Arial`), renderizado de texto geométrico y capas interactivas (`z-index`) para garantizar enlaces clicables en cualquier visor PDF.
*   **Transparencia de Datos:** Uso de "enlaces crudos" y datos de contacto directos (WhatsApp, LinkedIn).
*   **Entrega Contextual:** Detección de idioma para servir el CV correcto (ES/EN/PT).

## 🛠️ Instalación y Uso

Al ser una aplicación basada en estándares nativos, no requiere un proceso de compilación complejo.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/marili-mn/frontend-portfolio.git
    ```

2.  **Ejecutar:**
    Puedes usar cualquier servidor estático (Python, Node, Live Server):
    ```bash
    # Dentro de la carpeta del proyecto
    python -m http.server 8000
    ```

3.  **Abrir:** Navega a `http://localhost:8000`.

---
Desarrollado por **Nahuel Marcilli** - 2025
