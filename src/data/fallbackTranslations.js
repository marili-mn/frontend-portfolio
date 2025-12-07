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
        "es": "© 2025 mariDev. Todos los derechos reservados.",
        "en": "© 2025 mariDev. All rights reserved.",
        "pt": "© 2025 mariDev. Todos os direitos reservados.",
        "de": "© 2025 mariDev. Alle Rechte vorbehalten."
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
    "console_cmd_clear": { "es": "Limpiar", "en": "Clear", "pt": "Limpar", "de": "Löschen" }
};