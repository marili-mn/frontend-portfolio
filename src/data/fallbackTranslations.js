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
        "es": "Desarrollador Full-Stack formado en Ingeniería Web y Ciberdefensa. Fusiono arquitectura segura y creatividad.",
        "en": "Full-Stack Developer trained in Web Engineering and Cyberdefense. I merge secure architecture and creativity.",
        "pt": "Desenvolvedor Full-Stack formado em Engenharia Web e Ciberdefesa. Fundo arquitetura segura e criatividade.",
        "de": "Full-Stack-Entwickler mit Ausbildung in Web-Engineering und Cyber-Defense. Ich verbinde sichere Architektur und Kreativität."
    },
    "about_desc_2": { "es": "Aplico ingeniería robusta en cada capa.", "en": "I apply robust engineering at every layer.", "pt": "Aplico engenharia robusta em cada camada.", "de": "Ich wende robuste Ingenieurskunst auf jeder Ebene an." },
    "about_desc_3": { "es": "Innovación en el cruce de disciplinas.", "en": "Innovation at the intersection of disciplines.", "pt": "Inovação no cruzamento de disciplinas.", "de": "Innovation an der Schnittstelle von Disziplinen." },

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