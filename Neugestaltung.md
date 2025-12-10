================================================================================
ESTADO DEL PROYECTO: PORTFOLIO PROFESIONAL (MARI-DEV)
FECHA: 09/12/2025
================================================================================

1. RESUMEN DE SITUACIÓN ACTUAL
--------------------------------------------------------------------------------
El portafolio ha evolucionado de una presentación "junior/estudiante" a un perfil 
profesional de "Ingeniería de Software & Ciberseguridad". La arquitectura técnica 
es sólida (Vanilla JS, Web Components), y ahora la narrativa ("Lore") acompaña 
ese nivel técnico, destacando la fusión entre arquitectura segura y diseño creativo.

2. FASES COMPLETADAS (Hitos Recientes)
--------------------------------------------------------------------------------
[x] ANÁLISIS DE ARQUITECTURA
    - Diagnóstico de código: Alta calidad, modularidad en componentes y servicios.
    - Identificación de deuda técnica: Acoplamiento en ThemeService.

[x] REINGENIERÍA DE NARRATIVA (LORE)
    - Reposicionamiento: De "Estudiante" a "Ingeniero Full-Stack & Sec".
    - Copywriting Estratégico: Uso de palabras clave (Arquitectura, Seguridad, Diseño).
    - Formato: Implementación de negritas HTML (<strong>) para escaneabilidad.

[x] MEJORAS DE UX/UI EN TEXTOS
    - Enlaces Contextuales: Links directos a UNER y FADENA en la bio.
    - Estilos Visuales: CSS personalizado para resaltar hipervínculos en la bio
      (negrita + color de acento + hover animado).
    - Renderizado HTML: Actualización de componentes (AboutSection, AppFooter, 
      ProjectCard) para soportar .innerHTML y renderizar estilos enriquecidos.

[x] OPTIMIZACIÓN DE EXPERIENCIA MÓVIL (MOBILE-FIRST)
    - Menú de Navegación: Transformación a Overlay de pantalla completa con animación 
      de opacidad para mejor usabilidad táctil.
    - Espaciado y Ritmo: Aumento del gap en grillas (80px) para mejorar la "respiración"
      visual y legibilidad en pantallas pequeñas.
    - Integración Nativa: Implementación de meta tags `theme-color` para unificar 
      la UI del navegador con la app.

[x] INGENIERÍA DE CONTACTO & INTERACTIVIDAD
    - Arquitectura de Servicios: Creación de `ContactService.js` y `ContactButton.js` 
      para desacoplar lógica de negocio de la vista (Footer).
    - Micro-interacciones: Implementación de secuencia orquestada (Click -> Copy -> 
      Toast -> Footer Animation -> Mailto) para feedback robusto.
    - Feedback Visual: Desarrollo de componente `<toast-notification>` no intrusivo.

[x] REINGENIERÍA DE PERFIL TÉCNICO (SKILLS)
    - Jerarquía Estratégica: Reordenamiento de stack para priorizar JavaScript/Node 
      como dominio principal, seguido de lenguajes estrictos (C++, Assembler).
    - Limpieza de Datos: Eliminación de tecnologías legadas/no deseadas (Hibernate, Haskell)
      y adición de competencias clave (Express.js, MongoDB).

[x] FASE 2: REFACTORIZACIÓN ARQUITECTÓNICA (Completada)
    - Objetivo: Desacoplar ThemeService del DOM.
    - Acción: Implementado patrón de eventos (CustomEvent 'theme-changed') similar
      al TranslationService. `ThemeService` ahora es un gestor de estado puro.
    - Beneficio: Código más limpio, sin manipulación directa del DOM desde el servicio.
      Mejora la testabilidad y alineación con una "arquitectura robusta".
      (Resolvió un bug de doble toggle silencioso).

[x] FASE 3: INTEGRACIÓN "DEVSEC" (La Consola) (Completada)
    - Objetivo: Conectar la terminal oculta (console.html) con la experiencia principal.
    - Acciones:
        - Creación de componente `<devsec-console>` encapsulado con Shadow DOM.
        - Refactorización de lógica a OOP dentro del componente.
        - **Internacionalización Total:** Comandos, ayuda, bienvenida y outputs traducidos dinámicamente.
        - **Theme-Aware:** La terminal responde al tema Claro/Oscuro global.
        - **Mobile-First:** Layout optimizado, botones táctiles grandes, scroll nativo y teclado virtual safe.
        - Atajos (`Ctrl+Z`) y Switch visual en footer.
    - Meta Lograda: Experiencia de "Hacker Mode" pulida y profesional.

[x] FASE 3.5: REFINAMIENTO VISUAL (Skills 2.0 - Math Engineering)
    - Concepto: "Ingeniería de Precisión". Transformar la lista de skills en un plano técnico interactivo.
    - Estética: Fondo de papel milimetrado (Grid Paper), tipografía Monospace pura, iconos desaturados.
    - **Interacción Desktop High-End:**
        - Cursor Crosshair Global (Ejes X/Y infinitos) siguiendo al mouse.
        - Tarjetas con sistemas de coordenadas locales y ticks de regla.
        - Feedback en tiempo real de posición (X:120 Y:45) con transición suave desde "READY".
    - **Optimización (Performance):**
        - Uso de `requestAnimationFrame` para sincronizar las animaciones con el refresco de pantalla (60fps).
        - Eliminación de lag mediante segregación de lógica pesada.
    - **Mobile-First Real:**
        - Desactivación condicional de efectos de mouse (`@media (hover: none)`).
        - Feedback Táctil: Las tarjetas reaccionan al toque (`:active`) mostrando sus datos técnicos.
        - Layout limpio y accesible sin bloquear el scroll.
    - Detalle: Implementación de icono de texto "ASM" para Assembler, manteniendo consistencia visual.

[x] FASE 3.6: ARTEFACTOS 2.0 (The Archives) (Completada)
    - Concepto: Evolución de la zona de experimentos a un "Archivo Clasificado" con alta narrativa.
    - **Cinemática de Entrada ("The Breach"):** 
        - Reemplazo de animaciones complejas (persianas) por una secuencia minimalista y performante.
        - Secuencia: Overlay Sólido -> Typewriter Text (>> ENTERING LABORATORY...) -> Fade Out -> Reveal.
        - Lógica "Fail-Safe": Timeout de seguridad para garantizar que el contenido nunca quede bloqueado si JS falla.
    - **UX/UI Mobile-First:**
        - Rediseño de layout: Flex Column por defecto para lectura vertical fluida en móviles.
        - Touch Targets: Botones de acción (`[ SRC ]`, `[ DEMO ]`) con áreas de toque expandidas (min-height 44px).
        - Header Sticky robusto con soporte para pantallas ultra-angostas (wrap).
    - **Contenido:** Inclusión de "Joyitas" (Proyectos destacados) con tratamiento visual premium.

[x] FASE 3.9: SISTEMA DE CONTACTO "SECURE TERMINAL" (Completada)
    - Objetivo: Eliminar mailto simple y ofrecer una experiencia inmersiva "DevSec".
    - **Coreografía UX:** Clic -> Copia Clipboard -> Toast Feedback -> Highlight Email (Footer) -> Pausa Dramática -> Apertura de Terminal.
    - **Componente `<contact-form>`:** 
        - Ventana modal estilo Sistema Operativo/Terminal.
        - Botones de control reales (Minimizar, Maximizar, Cerrar).
        - Inputs estilizados como consola de comandos.
        - Integración con **Formspree** para backend serverless.
    - **Traducción Resiliente:** Mensajes de sistema en 4 idiomas con fallback automático.

[x] INFRAESTRUCTURA: RESILIENCIA EN TRADUCCIONES (Completada)
    - Problema: Fallos en carga de JSON o caché agresivo causaban textos rotos (`lbl_name`).
    - **Solución Híbrida (Dirty-Robust):** 
        - Capa 1: `translations.json` con cache-busting (`?v=timestamp`).
        - Capa 2: `fallbackTranslations.js` embebido en código con el 100% de los textos críticos.
        - Lógica Waterfall: Si JSON falla -> Usa JS Local -> Usa Inglés.
    - Resultado: Cero "FOUC" (Flash of Unstyled Content) de textos.

[x] FASE 4: EVOLUCIÓN VISUAL (BitStream Stack Timeline) (Completada)
    - Concepto: Transformar la grilla de proyectos en una "Pila de Ejecución" visual, manteniendo la consistencia del `grid` responsive.
    - **Metáfora Técnica:** La trayectoria profesional como un stack LIFO (Last In, First Out).
    - **Nodos Intuitivos:**
        - Nodo Superior: **"ACTUALIDAD"** (marca el punto más reciente).
        - Nodo Inferior: **"ORÍGENES"** (marca el inicio de la pila).
    - **Implementación:** `ProjectsTimeline` Web Component orquestando la presentación, `ProjectCard` adaptado para fechas, y CSS (`timeline.css`).
    - **Últimos Ajustes:** Eliminación de todas las líneas de conexión visual del timeline en móvil y desktop para una estética más limpia y enfocada en los nodos y las tarjetas.

[x] FASE 4.1: RENOVACIÓN CROMÁTICA (Arcane & Focus)
    - Concepto: Romper con el cliché "Matrix Green" y adoptar una identidad más madura y mística/técnica.
    - **Dark Mode (Arcane OS):**
        - Base: Deep Midnight Blue (#0B0E14) con acento Electric Arcane Violet (#8b5cf6, ahora #a78bfa para mayor legibilidad).
        - **Refinamiento:** Violeta más claro para el `accent` y sombreado con color del `accent` para un efecto de "glow" sutil.
    - **Light Mode (Paper & Liquid Ink):**
        - Base: Papel japonés cálido (#fafaf9) con tinta líquida (#1c1917).
        - **Refinamiento:** Todos los elementos monocromáticos con contrastes grises, negros y blancos cálidos para máxima legibilidad y estética editorial.

[x] FASE 4.2: REFINAMIENTO TIPOGRÁFICO (Humanista & Técnico)
    - Concepto: Mezclar tipografías para crear una jerarquía semántica y reforzar la identidad "Ingeniero".
    - **Acción:** Integración de `JetBrains Mono` (Google Fonts).
    - **Aplicación:** Usada en el logo, botones técnicos (`btn--tech`, `btn--sharp`, `btn--editorial`), etiquetas de habilidades (Skills Pills) y metadatos del footer.
    - **Beneficio:** Claridad entre texto narrativo (Poppins) y datos técnicos (JetBrains Mono), elevando la estética profesional.

[x] FASE 4.3: PULIDO VISUAL GENERAL Y ALINEACIÓN (Skills & Projects & About)
    - **Skills Section:**
        - **Grilla:** Líneas de la "hoja cuadriculada" más prominentes en ambos modos (`rgba(255, 255, 255, 0.25)` y `rgba(0, 0, 0, 0.25)`).
        - **Cards:** Bordes claros y definidos para separación visual en ambos modos.
        - **Hover (Light Mode):** Íconos de Skills recuperan color completo; texto invierte a "pastilla iluminada" (fondo negro/texto blanco) al hacer hover/active.
        - **Crosshair:** Opacidad reducida para un efecto más sutil en ambos modos.
    - **Project Cards:**
        - **Modo Claro:** Bordes y sombras más fuertes (`rgba(0,0,0,0.2)`, `0 8px 20px rgba(0,0,0,0.1)`) para distinguirse del fondo de papel.
    - **About Section:**
        - **Fondo "Sobre Mí":** Opacidad del texto de fondo aumentada (`0.25`) para mayor visibilidad.
        - **Palabras Resaltadas:** Colores de fondo y texto ajustados para coincidir con la nueva paleta y asegurar la visibilidad del efecto "Cipher-Text Blocks".
    - **Idioma Menu:** Añadida sombra (`0 5px 15px`) para mayor profundidad visual.

[ ] FASE 4.5: CRYPTO-PUZZLE & WASM CORE (Ingeniería Avanzada)
    - Concepto: Elevar la barra de seguridad mediante "Criptografía en el Cliente" y "Proof of Work (PoW)".
    - **Arquitectura de Seguridad (Backend-less):**
        - El email no existe en texto plano. Está cifrado con **AES-GCM**.
        - La llave de desencriptación no está en el código. Es el resultado de un hash que el navegador debe "minar".
        - Estrategia: Aumentar el "Costo Económico del Ataque" para bots mediante gasto de CPU local.
    - **Tecnología (El "Hardcore"):**
        - Módulo **WebAssembly (Wasm)** escrito en **C++ o Rust**.
        - Responsabilidad del Wasm: Ejecutar la minería (PoW) y la desencriptación en un entorno binario aislado y de alto rendimiento.
        - Uso de Web Workers para no congelar la UI principal.
    - **UX/UI: "Slide-to-Decrypt":**
        - Reemplazo del checkbox por un **Slider Mecánico**.
        - Metáfora: "Desbloquear una bóveda física".
        - Feedback: Mientras el usuario desliza (intención humana), el Wasm mina el hash en segundo plano.
        - Visual: Efecto de "fuerza bruta" visual en el texto censurado hasta que se revela.

4. FUTURAS EXPANSIONES (BACKLOG)
--------------------------------------------------------------------------------
[x] FASE 5: REINGENIERÍA DE IDENTIDAD (Cipher-Text Blocks) (Completada)
    - Concepto: Transformar el "Sobre Mí" en una impactante Portada Editorial que revela capas de información de forma interactiva y legible.
    - **Estética: Academic Noir / Ciber-Editorial Minimalista.**
    - **Estilo Editorial High-Tech:**
        - **Tipografía Display Gigante:** El título de fondo ("PROFILE" o "SOBRE MÍ") actúa como un elemento gráfico prominente y legible en todos los idiomas y modos (claro/oscuro).
        - **Layout Asimétrico:** Texto descriptivo en una columna estrecha, elegante, con amplio "aire" alrededor.
        - **Legibilidad:** El texto principal siempre es claro y legible.
    - **UX/UI: "Decodificación de Palabras Clave" (Cipher-Text Blocks):**
        - **Mecanismo:** Palabras clave específicas (marcadas con `<strong>`) dentro de la biografía aparecen inicialmente legibles.
        - **Interacción:** Al hacer scroll y la sección entra en el viewport, o al pasar el mouse sobre la palabra/bloque, esta se "desencripta" visualmente (efecto glitch), revelando la palabra legible con una animación.
        - **Metáfora:** La información clasificada se revela bajo escrutinio, reforzando la narrativa "DevSec" sin sacrificar la legibilidad.

[ ] FASE 6: EL CENTRO DE CONTROL (DevSec Admin Panel)
    - Concepto: CMS Headless "Self-Hosted" con Arquitectura Híbrida.
    - Stack: Supabase (Postgres + Auth) + Cliente JS Inteligente (Cache-First).
    - Resiliencia: Estrategia "Fail-Safe". Si el backend cae, el sitio carga desde caché local/backup estático.
    - Gestión de Assets: Modelo Híbrido.
        - Metadatos y textos: En Supabase DB.
        - Assets pesados (Imágenes/Zips/Demos): Referenciados vía URL desde fuentes externas (GitHub/Netlify/CDNs) o Supabase Storage para archivos ligeros.
    - Funcionalidad:
        - Área Home: Edición en caliente de textos, links y bio.
        - Área Artefactos: CRUD con campo dual (Upload o URL Externa) para máxima flexibilidad.
        - Seguridad: Ruta oculta, Login real y RLS (Row Level Security).

[ ] FASE 7: THE VOID LABORATORY (Artefactos / El Grimorio Digital)
    - Concepto: "Void Summoner" (Fantasía Brutalista). Un entorno de alto contraste con el Portfolio.
    - Narrativa: "La Bóveda Prohibida". Donde la seguridad y la magia negra tecnológica se encuentran.
    - **Estética (Void Mode):**
        - Fondo: Void Black (#050505) puro.
        - Acentos: Violeta Arcano (#bf00ff) y Cian Tóxico (#00f0ff) para estados activos.
        - UI: Brutalismo Mágico. Bordes afilados (0px radius), líneas de 2px, sin sombras suaves.
    - **Entidades de Datos:**
        - "Constructs" (Demos), "Incantations" (Herramientas), "Forbidden Knowledge" (Ensayos).
        - Status: "Sealed" (Estable), "Volatile" (Experimental), "Unbound" (WIP).
    - **Implementación Técnica:**
        - View Switching: `<lab-view>` actúa como un overlay completo que inyecta `body.void-mode`.
        - Performance: Uso de CSS puro y `will-change` para animaciones de "hechizo" sin layout thrashing.

[ ] OPTIMIZACIONES TÉCNICAS
    - Lazy Loading avanzado de imágenes.
    - Tests unitarios para los servicios core (Translation/Theme).

================================================================================
NOTAS DE DISEÑO
================================================================================
- Mantener la filosofía "Security-First & Design-Centric".
- No usar librerías externas a menos que sea estrictamente necesario.
- Cada línea de código debe justificar su existencia (Performance).