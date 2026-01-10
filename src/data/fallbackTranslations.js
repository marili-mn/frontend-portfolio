// Fallback translations ensuring critical UI works offline or on fetch error
// Languages: ES, EN, PT, DE
// Full backup of all application text keys.

export const fallbackTranslations = {
    // --- GLOBAL / NAV ---
    "nav_projects": { "es": "Proyectos", "en": "Projects", "pt": "Projetos", "de": "Projekte" },
    "nav_about": { "es": "Sobre mí", "en": "About", "pt": "Sobre mim", "de": "Über mich" },
    "nav_skills": { "es": "Skills", "en": "Skills", "pt": "Habilidades", "de": "Fähigkeiten" },
    "nav_contact": { "es": "Contacto", "en": "Contact", "pt": "Contato", "de": "Kontakt" },
    "cv_button": { "es": "Currículum", "en": "Resume", "pt": "Currículo", "de": "Lebenslauf" },

    // --- ABOUT SECTION ---
    "about_role": { "es": "Desarrollador Web & Ciberseguridad", "en": "Web Developer & Cybersecurity", "pt": "Desenvolvedor Web e Cibersegurança", "de": "Webentwickler & Cybersicherheit" },
    // Note: Long HTML strings are kept minimal in fallback to avoid huge file size,
    // but keys must exist to prevent UI breakage.
    "about_desc_1": {
        "es": "<b>Desarrollador Full-Stack</b> formado en <b>Ingeniería Web</b> (<a href=\"https://www.fcad.uner.edu.ar/tecnicatura-universitaria-en-desarrollo-web/\" target=\"_blank\" rel=\"noopener noreferrer\">UNER</a>) y <b>Ciberdefensa</b> (<a href=\"https://undef.edu.ar/fadena/carreras-de-grado/licciberdefensa/\" target=\"_blank\" rel=\"noopener noreferrer\">FADENA</a>). Fusiono <strong>arquitectura</strong> segura y <strong>creatividad</strong> funcional para construir soluciones que protegen el negocio y garantizan una <strong>experiencia</strong> de usuario que cautiva.",
        "en": "<b>Full-Stack Developer</b> trained in <b>Web Engineering</b> (<a href=\"https://www.fcad.uner.edu.ar/tecnicatura-universitaria-en-desarrollo-web/\" target=\"_blank\" rel=\"noopener noreferrer\">UNER</a>) and <b>Cyberdefense</b> (<a href=\"https://undef.edu.ar/fadena/carreras-de-grado/licciberdefensa/\" target=\"_blank\" rel=\"noopener noreferrer\">FADENA</a>). I merge secure <strong>architecture</strong> and functional <strong>creativity</strong> to build solutions that protect businesses and ensure a user <strong>experience</strong> that captivates.",
        "pt": "<b>Desenvolvedor Full-Stack</b> formado em <b>Engenharia Web</b> (<a href=\"https://www.fcad.uner.edu.ar/tecnicatura-universitaria-en-desenvolvimento-web/\" target=\"_blank\" rel=\"noopener noreferrer\">UNER</a>) e <b>Ciberdefesa</b> (<a href=\"https://undef.edu.ar/fadena/carreras-de-grado/licciberdefensa/\" target=\"_blank\" rel=\"noopener noreferrer\">FADENA</a>). Eu combino <strong>arquitetura</strong> segura e <strong>criatividade</strong> funcional para construir soluções que protegem o negócio e garantem uma <strong>experiência</strong> de usuário que cativa.",
        "de": "<b>Full-Stack-Entwickler</b> mit Ausbildung in <b>Web-Engineering</b> (<a href=\"https://www.fcad.uner.edu.ar/tecnicatura-universitaria-en-desarrollo-web/\" target=\"_blank\" rel=\"noopener noreferrer\">UNER</a>) und <b>Cyber-Defense</b> (<a href=\"https://undef.edu.ar/fadena/carreras-de-grado/licciberdefensa/\" target=\"_blank\" rel=\"noopener noreferrer\">FADENA</a>). Ich verschmelze sichere <strong>Architektur</strong> und funktionale <strong>Kreativität</strong>, um Lösungen zu entwickeln, die das Geschäft schützen und eine <strong>Benutzererfahrung</strong> garantieren, die fesselt."
    },
    "about_desc_2": { "es": "Aplico ingeniería robusta en cada capa.", "en": "I apply robust engineering at every layer.", "pt": "Aplico engenharia robusta em cada camada.", "de": "Ich wende robuste Ingenieurskunst auf jeder Ebene an." },
        "about_desc_3": {
            "es": "Creo que la verdadera <strong>innovación</strong> surge al cruzar disciplinas. Busco proyectos que desafíen el estándar, donde pueda aplicar esta dualidad técnica y creativa para entregar <strong>soluciones</strong> escalables, estéticamente pulidos y técnicamente blindados.",
            "en": "I believe true <strong>innovation</strong> emerges at the intersection of disciplines. I seek projects that challenge the standard, where I can apply this technical and creative duality to deliver scalable, aesthetically polished, and technically armored <strong>solutions</strong>.",
            "pt": "Acredito que a verdadeira <strong>inovação</strong> surge no cruzamento de disciplinas. Busco projetos que desafiem o padrão, onde possa aplicar essa dualidade técnica e criativa para entregar <strong>soluções</strong> escaláveis, esteticamente polidos e tecnicamente blindados.",
            "de": "Ich glaube, dass wahre <strong>Innovation</strong> an der Schnittstelle von Disziplinen entsteht. Ich suche Projekte, die den Standard herausfordern, wo ich diese technische und kreative Dualität anwenden kann, um skalierbare, ästhetisch ansprechende und technisch gehärtete <strong>Lösungen</strong> zu liefern."
        },

    // --- SKILLS SECTION ---
    "skills_title": { "es": "Skills", "en": "Skills", "pt": "Habilidades", "de": "Fähigkeiten" },
    "frontend_title": { "es": "Frontend", "en": "Frontend", "pt": "Frontend", "de": "Frontend" },
    "backend_title": { "es": "Backend", "en": "Backend", "pt": "Backend", "de": "Backend" },
    "other_tech_title": { "es": "Otras Tecnologías", "en": "Other Technologies", "pt": "Outras Tecnologias", "de": "Andere Technologien" },

    // --- PROJECTS SECTION ---
    "projects_title": { "es": "Proyectos", "en": "Projects", "pt": "Projetos", "de": "Projekte" },
    "source_code": { "es": "Código fuente", "en": "Source code", "pt": "Código fonte", "de": "Quellcode" },
    "live_demo": { "es": "Demo", "en": "Demo", "pt": "Demo", "de": "Demo" },
    // Project descriptions fallback
    "project1_desc": { "es": "Plataforma comercial optimizada.", "en": "Optimized commercial platform.", "pt": "Plataforma comercial otimizada.", "de": "Optimierte Handelsplattform." },
    "project9_desc": {
        "es": "Gestor de tarjetas virtuales de grado militar. Arquitectura Hexagonal para máxima seguridad, desarrollado con React y TypeScript.",
        "en": "Military-grade virtual card manager. Hexagonal Architecture for maximum security, developed with React and TypeScript.",
        "pt": "Gestor de cartões virtuais de nível militar. Arquitetura Hexagonal para máxima segurança, desenvolvido com React e TypeScript.",
        "de": "Virtueller Kartenmanager auf Militärniveau. Hexagonale Architektur für maximale Sicherheit, entwickelt mit React und TypeScript."
    },
    "project7_desc": {
        "es": "Plataforma Fintech de onboarding de créditos para PYMES. Desarrollo Full-Stack con metodología SCRUM, integrando FastAPI y Vanilla JS para una solución robusta y ágil.",
        "en": "Fintech credit onboarding platform for SMEs. Full-Stack development with SCRUM methodology, integrating FastAPI and Vanilla JS para una solución robusta y ágil.",
        "pt": "Plataforma Fintech de onboarding de crédito para PMEs. Desenvolvimento Full-Stack com metodologia SCRUM, integrando FastAPI e Vanilla JS para uma solução robusta e ágil.",
        "de": "Fintech-Kredit-Onboarding-Plattform für KMUs. Full-Stack-Entwicklung mit SCRUM-Methodik, Integration von FastAPI und Vanilla JS para uma solução robusta e ágil."
    },
    "project8_desc": {
        "es": "Sistema de gestión académica integral. Arquitectura diseñada para la administración eficiente de datos curriculares y expedientes estudiantiles mediante consumo de APIs REST.",
        "en": "Comprehensive academic management system. Architecture designed for efficient administration of curricular data and student records via REST API consumption.",
        "pt": "Sistema de gestão acadêmica abrangente. Arquitetura projetada para administração eficiente de dados curriculares e registros de estudantes via consumo de API REST.",
        "de": "Umfassendes akademisches Verwaltungssystem. Architektur entworfen für effiziente Verwaltung von Lehrplandaten und Studentenunterlagen durch REST-API-Nutzung."
    },
    // ... (Others can default to English or generic text if JSON fails)

    // --- CONTACT SECTION (Landing) ---
    "contact_title": { "es": "Contacto", "en": "Contact", "pt": "Contato", "de": "Kontakt" },
    "contact_button": { "es": "Escribíme", "en": "Email Me", "pt": "Envie um e-mail", "de": "E-Mail an mich" },
    "email_copied": { "es": "¡Email copiado!", "en": "Email copied!", "pt": "Email copiado!", "de": "E-Mail kopiert!" },

    // --- CONTACT FORM (Terminal Style - NEW) ---
    "contact_form_title": {
        "es": "Terminal de Contacto Seguro",
        "en": "Secure Contact Terminal",
        "pt": "Terminal de Contato Seguro",
        "de": "Sicheres Kontaktterminal"
    },
    "contact_hint": {
        "es": "Inicializando protocolo de comunicación...",
        "en": "Initializing communication protocol...",
        "pt": "Inicializando protocolo de comunicação...",
        "de": "Kommunikationsprotokoll wird initialisiert..."
    },
    "contact_form_intro_note": {
        "es": "Esta terminal asegura tu comunicación. Puedes optar por tu cliente de correo habitual o utilizar este formulario encriptado.",
        "en": "This terminal secures your communication. You may use your preferred email client or this encrypted form.",
        "pt": "Este terminal garante a sua comunicação. Você pode usar seu cliente de e-mail habitual ou este formulário criptografado.",
        "de": "Dieses Terminal sichert Ihre Kommunikation. Sie können Ihren bevorzugten E-Mail-Client verwenden oder dieses verschlüsselte Formular."
    },
    "lbl_name": { "es": "Nombre_Usuario", "en": "User_Name", "pt": "Nome_Usuario", "de": "Benutzer_Name" },
    "lbl_email": { "es": "Dirección_Correo", "en": "Email_Address", "pt": "Endereço_Email", "de": "E-Mail_Adresse" },
    "lbl_subject": { "es": "Asunto_Misión", "en": "Mission_Subject", "pt": "Assunto_Missão", "de": "Betreff_Mission" },
    "lbl_message": { "es": "Datos_Mensaje", "en": "Message_Data", "pt": "Dados_Mensagem", "de": "Nachrichtendaten" },
    
    "btn_send": { "es": "EJECUTAR ENVÍO", "en": "EXECUTE SEND", "pt": "EXECUTAR ENVIO", "de": "SENDEN AUSFÜHREN" },
    "btn_sending": { "es": "TRANSMITIENDO...", "en": "TRANSMITTING...", "pt": "TRANSMITINDO...", "de": "ÜBERTRAGEN..." },
    
    "msg_sent": { "es": "TRANSMISIÓN EXITOSA", "en": "TRANSMISSION SUCCESS", "pt": "TRANSMISSÃO BEM-SUCEDIDA", "de": "ÜBERTRAGUNG ERFOLGREICH" },
    "msg_error": { "es": "ERROR DE RED", "en": "NETWORK ERROR", "pt": "ERRO DE REDE", "de": "NETZWERKFEHLER" },
    
    "toast_sent": { "es": "Mensaje enviado.", "en": "Message sent.", "pt": "Mensagem enviada.", "de": "Nachricht gesendet." },
    "toast_error": { "es": "Error de envío.", "en": "Sending error.", "pt": "Erro de envio.", "de": "Sendefehler." },

    // --- FOOTER ---
    "footer_desc": {
        "es": "Ingeniería de precisión. Soluciones seguras.",
        "en": "Precision Engineering. Secure solutions.",
        "pt": "Engenharia de precisão. Soluções seguras.",
        "de": "Präzisionsingenieurwesen. Sichere Lösungen."
    },
    "footer_connect": { "es": "Conectemos", "en": "Let's Connect", "pt": "Vamos conectar-nos", "de": "Verbinden wir uns" },
    "footer_copyright": {
        "es": "© 2026 mariDev. Todos los derechos reservados.",
        "en": "© 2026 mariDev. All rights reserved.",
        "pt": "© 2026 mariDev. Todos os direitos reservados.",
        "de": "© 2026 mariDev. Alle Rechte vorbehalten."
    },
    "back_to_top_aria": { "es": "Volver arriba", "en": "Back to top", "pt": "Voltar ao topo", "de": "Nach oben" },

    // --- CONSOLE (Terminal) ---
    "console_login": { "es": "Inicio de sesión exitoso", "en": "Successful login", "pt": "Login bem-sucedido", "de": "Erfolgreiche Anmeldung" },
    "console_welcome_title": { "es": "Mi Portfolio", "en": "My Portfolio", "pt": "Meu Portfólio", "de": "Mein Portfolio" },
    "console_welcome_text": { "es": "Bienvenido. Escribe help", "en": "Welcome. Type help", "pt": "Bem-vindo. Digite help", "de": "Willkommen. Tippen Sie help" },
    "console_hint": { "es": "Tip: Ctrl+Z para salir.", "en": "Tip: Ctrl+Z to exit.", "pt": "Dica: Ctrl+Z para sair.", "de": "Tipp: Ctrl+Z zum Beenden." },
    "console_user": { "es": "invitado", "en": "guest", "pt": "convidado", "de": "gast" },
    // Simplified command descriptions for fallback
    "console_cmd_about": { "es": "Sobre mí", "en": "About me", "pt": "Sobre mim", "de": "Über mich" },
    "console_cmd_social": { "es": "Redes sociales", "en": "Social networks", "pt": "Redes sociais", "de": "Soziale Netzwerke" },
    "console_cmd_skills": { "es": "Habilidades", "en": "Skills", "pt": "Habilidades", "de": "Fähigkeiten" },
    "console_cmd_projects": { "es": "Proyectos", "en": "Projects", "pt": "Projetos", "de": "Projekte" },
    "console_cmd_clear": { "es": "Limpiar", "en": "Clear", "pt": "Limpar", "de": "Löschen" },
    "console_cmd_sysinfo": {
        "es": "Información técnica del sistema (Perfil de Ingeniería)",
        "en": "Technical system information (Engineering Profile)",
        "pt": "Informações técnicas do sistema (Perfil de Engenharia)",
        "de": "Technische Systeminformationen (Ingenieurprofil)"
    },
    "console_cmd_sudo": {
        "es": "Intentar obtener privilegios de superusuario",
        "en": "Attempt to gain superuser privileges",
        "pt": "Tentar obter privilégios de superusuário",
        "de": "Versuch, Superuser-Privilegien zu erhalten"
    },

    // --- LAB ZONE (R&D ARCHIVE) ---
    "lab_title": { "es": "ARCHIVO_I+D", "en": "R&D_ARCHIVE", "pt": "ARQUIVO_P&D", "de": "F&E_ARCHIV" },
    "lab_sec_level": { "es": "ACCESO: CONCEDIDO", "en": "ACCESS: GRANTED", "pt": "ACESSO: PERMITIDO", "de": "ZUGRIFF: GEWÄHRT" },
    "lab_btn_exit": { "es": "[ CERRAR_ARCHIVO ]", "en": "[ CLOSE_ARCHIVE ]", "pt": "[ FECHAR_ARQUIVO ]", "de": "[ ARCHIV_SCHLIESSEN ]" },
    
    "lab_manifesto_title": { "es": "VISIÓN DE INGENIERÍA", "en": "ENGINEERING VISION", "pt": "VISÃO DE ENGENHARIA", "de": "INGENIEUR-VISION" },
    "lab_manifesto_desc": {
        "es": "Espacio de búsqueda continua de <b>vanguardia</b> y <b>soluciones precisas</b>. Documento mi aprendizaje constante de manera visual, transformando la investigación en ingeniería robusta y diseño de alto nivel.",
        "en": "Continuous search space for <b>vanguard</b> and <b>precise solutions</b>. I document my constant learning visually, transforming research into robust engineering and high-level design.",
        "pt": "Espaço de busca contínua por <b>vanguarda</b> e <b>soluções precisas</b>. Documento meu aprendizado constante visualmente, transformando pesquisa em engenharia robusta e design de alto nível.",
        "de": "Kontinuierlicher Suchraum für <b>Avantgarde</b> und <b>präzise Lösungen</b>. Ich dokumentiere mein ständiges Lernen visuell und transformiere Forschung in robuste Ingenieurskunst und High-Level-Design."
    },
    "lab_status": { "es": "ESTADO:", "en": "STATUS:", "pt": "ESTADO:", "de": "STATUS:" },
    "lab_status_val": { "es": "OPERATIVO", "en": "OPERATIONAL", "pt": "OPERACIONAL", "de": "BETRIEBSBEREIT" },
    
    "lab_algo_title": { "es": "ALGO", "en": "ALGO", "pt": "ALGO", "de": "ALGO" },
    "lab_metrics_title": { "es": "MÉTRICAS", "en": "METRICS", "pt": "MÉTRICAS", "de": "METRIKEN" },
    "lab_proto_title": { "es": "PROTOTIPO", "en": "PROTOTYPE", "pt": "PROTÓTIPO", "de": "PROTOTYP" },
    "lab_next_gen": { "es": "UI_PRÓXIMA_GEN", "en": "NEXT_GEN_UI", "pt": "IU_PRÓXIMA_GER", "de": "NÄCHSTE_GEN_UI" },
    "lab_next_gen_desc": { 
        "es": "Explorando integración WebGL para futuros dashboards.", 
        "en": "Exploring WebGL integration for future dashboards.",
        "pt": "Explorando a integração WebGL para futuros painéis.",
        "de": "Untersuchung der WebGL-Integration für zukünftige Dashboards."
    },
    "lab_awaiting": { "es": "ESPERANDO_INPUT...", "en": "AWAITING_INPUT...", "pt": "AGUARDANDO_ENTRADA...", "de": "WARTE_AUF_EINGABE..." },
    "lab_classified": { "es": "ARCHIVO ABIERTO", "en": "OPEN ARCHIVE", "pt": "ARQUIVO ABERTO", "de": "OFFENES ARCHIV" },

    "lab_visual_engine": { "es": "MOTOR_VISUAL", "en": "VISUAL_ENGINE", "pt": "MOTOR_VISUAL", "de": "VISUELLE_ENGINE" },
    "lab_system_core": { "es": "NÚCLEO_SISTEMAS", "en": "SYSTEM_CORE", "pt": "NÚCLEO_SISTEMAS", "de": "SYSTEM_KERN" },
    "lab_comp_theory": { "es": "TEORÍA_COMPUTACIONAL", "en": "COMP_THEORY", "pt": "TEORIA_COMPUTACIONAL", "de": "COMP_THEORIE" },

    "lab_css_print_engine_title": { "es": "MOTOR_IMPRESIÓN_CSS", "en": "CSS_PRINT_ENGINE", "pt": "MOTOR_IMPRESSÃO_CSS", "de": "CSS_DRUCK_ENGINE" },
    "lab_css_print_engine_desc": { "es": "Generación precisa de medios imprimibles usando CSS/HTML puro sin herramientas de maquetación externas.", "en": "High-precision printable media generation using raw CSS/HTML without external layout tools.", "pt": "Geração de mídia imprimível de alta precisão usando CSS/HTML puro sem ferramentas de layout externas.", "de": "Hochpräzise druckbare Medienerzeugung mit reinem CSS/HTML ohne externe Layout-Tools." },
    "lab_css_print_engine_type": { "es": "TIPO: RENDER_SYS", "en": "TYPE: RENDER_SYS", "pt": "TIPO: RENDER_SYS", "de": "TYP: RENDER_SYS" },

    "lab_grid_layout_sys_hk_title": { "es": "SISTEMA_GRILLA_HK", "en": "GRID_LAYOUT_SYS_HK", "pt": "SISTEMA_GRADE_HK", "de": "GRID_LAYOUT_SYS_HK" },
    "lab_grid_layout_sys_hk_desc": { "es": "Experimentación con un sistema de grilla estricta inspirado en la estética japonesa.", "en": "Japanese aesthetic-inspired strict grid system experimentation.", "pt": "Experimentação de sistema de grade rigoroso inspirado na estética japonesa.", "de": "Von der japanischen Ästhetik inspirierte strenge Rastersystem-Experimente." },
    "lab_grid_layout_sys_hk_type": { "es": "TIPO: LAYOUT_ALGO", "en": "TYPE: LAYOUT_ALGO", "pt": "TIPO: LAYOUT_ALGO", "de": "TYP: LAYOUT_ALGO" },

    "lab_ui_proto_archviz_title": { "es": "PROTO_UI_ARCHVIZ", "en": "UI_PROTO_ARCHVIZ", "pt": "PROTO_IU_ARCHVIZ", "de": "UI_PROTO_ARCHVIZ" },
    "lab_ui_proto_archviz_desc": { "es": "Prototipo de interfaz responsive para visualización arquitectónica.", "en": "Responsive architecture visualization interface prototype.", "pt": "Protótipo de interface responsiva para visualização arquitetônica.", "de": "Responsiver Architekturvisualisierungs-Interface-Prototyp." },
    "lab_ui_proto_archviz_type": { "es": "TIPO: UI_PROTO", "en": "TYPE: UI_PROTO", "pt": "TIPO: UI_PROTO", "de": "TYP: UI_PROTO" },

    "lab_ubuntu_svr_deploy_title": { "es": "DESPLIEGUE_SVR_UBUNTU", "en": "UBUNTU_SVR_DEPLOY", "pt": "IMPLANTAÇÃO_SVR_UBUNTU", "de": "UBUNTU_SVR_DEPLOY" },
    "lab_ubuntu_svr_deploy_desc": { "es": "Logs de aprovisionamiento de servidores y artefactos de configuración automatizados.", "en": "Automated server provisioning logs and configuration artifacts.", "pt": "Logs de provisionamento de servidor automatizado e artefatos de configuração.", "de": "Automatisierte Server-Bereitstellungsprotokolle und Konfigurationsartefakte." },
    "lab_ubuntu_svr_deploy_type": { "es": "TIPO: SYS_LOGS", "en": "TYPE: SYS_LOGS", "pt": "TIPO: SYS_LOGS", "de": "TYP: SYS_LOGS" },

    "lab_proc_scheduling_title": { "es": "PLANIFICACIÓN_PROCESOS", "en": "PROC_SCHEDULING", "pt": "AGENDAMENTO_PROCESSOS", "de": "PROZESS_PLANUNG" },
    "lab_proc_scheduling_desc": { "es": "Análisis y documentación de algoritmos de planificación de procesos.", "en": "Process planning algorithms analysis and documentation.", "pt": "Análise e documentação de algoritmos de agendamento de processos.", "de": "Analyse und Dokumentation von Prozessplanungsalgorithmen." },
    "lab_proc_scheduling_type": { "es": "TIPO: KERNEL_DOCS", "en": "TYPE: KERNEL_DOCS", "pt": "TIPO: KERNEL_DOCS", "de": "TYP: KERNEL_DOCS" },

    "lab_win32_sys_manual_title": { "es": "MANUAL_SISTEMA_WIN32", "en": "WIN32_SYS_MANUAL", "pt": "MANUAL_SISTEMA_WIN32", "de": "WIN32_SYS_MANUAL" },
    "lab_win32_sys_manual_desc": { "es": "Mapeo de variables de entorno de Windows y configuración del sistema.", "en": "Windows environment variable and system configuration mapping.", "pt": "Mapeamento de variáveis de ambiente do Windows e configuração do sistema.", "de": "Windows-Umgebungsvariablen- und Systemkonfigurationszuordnung." },
    "lab_win32_sys_manual_type": { "es": "TIPO: OS_MANUAL", "en": "TYPE: OS_MANUAL", "pt": "TIPO: OS_MANUAL", "de": "TYP: OS_MANUAL" },

    "lab_bootloader_rec_title": { "es": "RECUPERACIÓN_BOOTLOADER", "en": "BOOTLOADER_REC", "pt": "RECUPERAÇÃO_BOOTLOADER", "de": "BOOTLOADER_RECOVERY" },
    "lab_bootloader_rec_desc": { "es": "Procedimientos de restauración de GRUB y estrategias de mapeo de particiones.", "en": "GRUB restoration procedures and partition mapping strategies.", "pt": "Procedimentos de restauração do GRUB e estratégias de mapeamento de partição.", "de": "GRUB-Wiederherstellungsverfahren und Partitions-Mapping-Strategien." },
    "lab_bootloader_rec_type": { "es": "TIPO: RECOVERY", "en": "TYPE: RECOVERY", "pt": "TIPO: RECOVERY", "de": "TYP: RECOVERY" },

    "lab_js_math_engine_title": { "es": "MOTOR_MATEMÁTICO_JS", "en": "JS_MATH_ENGINE", "pt": "MOTOR_MATEMÁTICO_JS", "de": "JS_MATH_ENGINE" },
    "lab_js_math_engine_desc": { "es": "Lógica de álgebra computacional implementada en JavaScript puro.", "en": "Computational algebra logic implemented in raw JavaScript.", "pt": "Lógica de álgebra computacional implementada em JavaScript puro.", "de": "Computational-Algebra-Logik in reinem JavaScript implementiert." },
    "lab_js_math_engine_type": { "es": "TIPO: ALGO_LIB", "en": "TYPE: ALGO_LIB", "pt": "TIPO: ALGO_LIB", "de": "TYP: ALGO_LIB" },

    "lab_data_struct_ref_title": { "es": "REF_ESTRUCTURAS_DATOS", "en": "DATA_STRUCT_REF", "pt": "REF_ESTRUTURAS_DADOS", "de": "DATENSTRUKTUR_REF" },
    "lab_data_struct_ref_desc": { "es": "Implementación de referencia para estructuras de datos centrales.", "en": "Reference implementation for core data structures.", "pt": "Implementação de referência para estruturas de dados centrais.", "de": "Referenzimplementierung für zentrale Datenstrukturen." },
    "lab_data_struct_ref_type": { "es": "TIPO: CS_THEORY", "en": "TYPE: CS_THEORY", "pt": "TIPO: CS_THEORY", "de": "TYP: CS_THEORY" },

    "lab_lang_theory_docs_title": { "es": "DOCS_TEORÍA_LENGUAJES", "en": "LANG_THEORY_DOCS", "pt": "DOCS_TEORIA_LINGUAGENS", "de": "SPRACH_THEORIE_DOKS" },
    "lab_lang_theory_docs_desc": { "es": "Análisis comparativo de paradigmas de lenguajes de programación.", "en": "Comparative analysis of programming language paradigms.", "pt": "Análise comparativa de paradigmas de linguagens de programação.", "de": "Vergleichende Analyse von Programmiersprachen-Paradigma." },
    "lab_lang_theory_docs_type": { "es": "TIPO: CS_THEORY", "en": "TYPE: CS_THEORY", "pt": "TIPO: CS_THEORY", "de": "TYP: CS_THEORY" },

    "lab_root_repo_title": { "es": "REPOSITORIO_CENTRAL", "en": "CENTRAL_REPOSITORY", "pt": "REPOSITÓRIO_CENTRAL", "de": "ZENTRALES_REPOSITORY" },
    "lab_root_repo_desc": { "es": "Acceso directo al índice raíz para exploración profunda de todos los experimentos.", "en": "Direct access to the root index for deep exploration of all experiments.", "pt": "Acesso direto ao índice raiz para exploração profunda de todos os experimentos.", "de": "Direkter Zugriff auf den Root-Index zur tiefen Erkundung aller Experimente." },
    "lab_root_repo_type": { "es": "TIPO: ROOT_DIR", "en": "TYPE: ROOT_DIR", "pt": "TIPO: ROOT_DIR", "de": "TYP: ROOT_DIR" },
    
    "lab_btn_src": { "es": "[ CÓDIGO ]", "en": "[ SOURCE ]", "pt": "[ CÓDIGO ]", "de": "[ CODE ]" },
    "lab_btn_demo": { "es": "[ DEMO ]", "en": "[ DEMO ]", "pt": "[ DEMO ]", "de": "[ DEMO ]" },

    // --- ARTEFACTOS NUEVOS (LAS JOYITAS) ---
    
    // 1. MasSoluciones
    "lab_massoluciones_title": { "es": "ARQUITECTURA_NATIVA_CORP", "en": "NATIVE_ARCH_CORP", "pt": "ARQUITETURA_NATIVA_CORP", "de": "NATIVE_ARCH_CORP" },
    "lab_massoluciones_desc": { 
        "es": "Implementación comercial de arquitectura basada en Web Components. Incluye automatización de marketing con Puppeteer (Node.js).",
        "en": "Commercial implementation of Web Components architecture. Includes marketing automation via Puppeteer (Node.js).", 
        "pt": "Implementação comercial baseada em Web Components. Inclui automação de marketing com Puppeteer.",
        "de": "Kommerzielle Implementierung der Web Components Architektur. Beinhaltet Marketing-Automatisierung mit Puppeteer."
    },
    "lab_massoluciones_type": { "es": "TIPO: PROD_ARCH & TOOLING", "en": "TYPE: PROD_ARCH & TOOLING", "pt": "TIPO: PROD_ARCH & TOOLING", "de": "TYP: PROD_ARCH & TOOLING" },

    // 2. ApuntesDelFondo
    "lab_apuntes_title": { "es": "MOTOR_ESTUDIO_INMERSIVO", "en": "IMMERSIVE_STUDY_ENGINE", "pt": "MOTOR_ESTUDO_IMERSIVO", "de": "IMMERSIVE_STUDY_ENGINE" },
    "lab_apuntes_desc": { 
        "es": "Plataforma de recursos académicos con búsqueda avanzada (TreeWalker API), inyección dinámica de DOM y ambientación audiovisual.",
        "en": "Academic resource platform featuring advanced search (TreeWalker API), dynamic DOM injection, and audiovisual ambience.",
        "pt": "Plataforma de recursos acadêmicos com busca avançada (TreeWalker API), injeção dinâmica de DOM e ambiente audiovisual.",
        "de": "Akademische Ressourcenplattform mit erweiterter Suche (TreeWalker API), dynamischer DOM-Injektion und audiovisuellem Ambiente."
    },
    "lab_apuntes_type": { "es": "TIPO: DOM_MANIPULATION", "en": "TYPE: DOM_MANIPULATION", "pt": "TIPO: DOM_MANIPULATION", "de": "TYP: DOM_MANIPULATION" },

    // 3. finalIDW (Karting)
    "lab_karting_title": { "es": "SISTEMA_TELEMETRÍA_LIGERO", "en": "LIGHTWEIGHT_TELEMETRY_SYS", "pt": "SISTEMA_TELEMETRIA_LEVE", "de": "LEICHTES_TELEMETRIE_SYS" },
    "lab_karting_desc": { 
        "es": "Sistema SPA 'Vanilla' para gestión de tiempos de carrera. Lógica de clasificación, persistencia local y gestión de estado sin dependencias.",
        "en": "'Vanilla' SPA system for race timing management. Classification logic, local persistence, and dependency-free state management.",
        "pt": "Sistema SPA 'Vanilla' para gestão de tempos de corrida. Lógica de classificação, persistência local e gestão de estado sem dependências.",
        "de": "'Vanilla' SPA-System für Rennzeitmanagement. Klassifizierungslogik, lokale Persistenz und abhängigkeitsfreies Zustandsmanagement."
    },
    "lab_karting_type": { "es": "TIPO: CORE_LOGIC", "en": "TYPE: CORE_LOGIC", "pt": "TIPO: CORE_LOGIC", "de": "TYP: CORE_LOGIC" }
};
