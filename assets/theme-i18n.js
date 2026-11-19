(() => {
    const THEME_KEY = 'odonto_theme';
    const LANG_KEY = 'odonto_lang';

    const DICT = {
        en: {
            // Portal Sidebar & Topbar
            'Painel de Controle': 'Dashboard',
            'Painel de Controle & Visão Geral': 'Dashboard & Overview',
            'Funil de Tratamentos (Kanban)': 'Treatment Pipeline (Kanban)',
            'Funil de Vendas de Tratamentos (Kanban)': 'Treatment Sales Pipeline (Kanban)',
            'Conversas WhatsApp': 'WhatsApp Inbox',
            'Inbox WhatsApp Multiatendente': 'Multi-Agent WhatsApp Inbox',
            'Agenda & Calendário': 'Schedule & Calendar',
            'Agenda & Grade de Consultas': 'Schedule & Appointments',
            'Pacientes & Prontuários': 'Patients & Records',
            'Pacientes, Prontuário & Odontograma': 'Patients, Records & Odontogram',
            'Secretária Digital': 'Digital Receptionist',
            'Secretária Digital & Fluxos': 'Digital Receptionist & Flows',
            'Automações & Follow-up': 'Automations & Follow-up',
            'Automações & Regras de Follow-up': 'Automations & Follow-up Rules',
            'Relatórios & Metas': 'Reports & Goals',
            'Relatórios de Metas & Conversão': 'Goals & Conversion Reports',
            'Financeiro & NFS-e': 'Finance & Invoices',
            'Financeiro, Repasses & Emissão NFS-e': 'Finance, Payouts & Invoices',
            'Painel TV & Recepção': 'TV Panel & Waiting Room',
            'Painel TV & Sala de Espera (Voz)': 'TV Panel & Waiting Room (Voice)',
            'DocSign & Contratos OTP': 'DocSign & OTP Contracts',
            'DocSign · Assinatura Digital com OTP': 'DocSign · Digital Signature (OTP)',
            'Atendimento & Vendas': 'Care & Sales',
            'Automação & Escala': 'Automation & Scale',
            'Clínica & Gestão': 'Clinic & Management',
            'Central de Atendimento': 'Service Desk',
            'Novo Lead / Orçamento': 'New Lead / Quote',
            'Ver Landing Page': 'View Landing Page',
            'WhatsApp Conectado (3 atendentes online)': 'WhatsApp Connected (3 agents online)',
            'Administradora': 'Administrator',
            // Portal Login & Dashboard
            'Entrar no CRM Odonto Solution': 'Sign in to Odonto Solution CRM',
            'Lembrar meu acesso': 'Remember me',
            'Esqueceu a senha?': 'Forgot password?',
            'Período de Análise:': 'Analysis Period:',
            'Últimos 30 dias': 'Last 30 days',
            'Últimos 7 dias': 'Last 7 days',
            'Este Mês': 'This Month',
            '✦ Resumir indicadores do painel': '✦ Summarize dashboard metrics',
            'Pacientes Atendidos': 'Patients Served',
            'Orçamentos Aprovados': 'Approved Quotes',
            'Taxa de Conversão': 'Conversion Rate',
            'Ticket Médio': 'Average Ticket',
            // Dynamic Portal Headers
            'Agenda Integrada de Consultas': 'Integrated Appointment Schedule',
            'Novo Agendamento': 'New Appointment',
            'Todos os Profissionais': 'All Professionals',
            'Chamar na TV': 'Call on TV',
            'Financeiro & Notas Fiscais': 'Finance & Invoices',
            'Fluxo de Caixa & Notas Fiscais (NFS-e)': 'Cash Flow & Service Invoices',
            'Emitir NFS-e': 'Issue Invoice',
            'Receitas Totais': 'Total Revenue',
            'Despesas Operacionais': 'Operating Expenses',
            'Saldo Líquido': 'Net Balance',
            'Repasse Profissionais (35%)': 'Doctor Payouts (35%)',
            'Acionar Chamada na Recepção': 'Trigger Waiting Room Call',
            'Chamar Paciente com Voz': 'Call Patient with Voice',
            'Assinatura Digital na Tela (DocSign + OTP)': 'On-Screen Digital Signature (DocSign + OTP)',
            'Documentos Assinados': 'Signed Documents',
            'Validar & Assinar': 'Validate & Sign',
            'Base Geral de Pacientes': 'Patient Directory',
            'Prontuário & Odontograma': 'Records & Odontogram',
            // Landing Page
            'Funil & CRM': 'Pipeline & CRM',
            'O Fim da Bagunça': 'No More Chaos',
            'Automações': 'Automations',
            'Atendimento Digital': 'Digital Desk',
            '15 em 1': '15 in 1',
            'Planos': 'Plans',
            'FAQ': 'FAQ',
            'Entrar no Portal': 'Open Portal',
            'Demonstração Grátis': 'Free Demo',
            'O 1º CRM com Automação Completa para Clínicas e Consultórios': 'The #1 Automated CRM Built for Dental & Medical Clinics',
            'Explorar Telas Abaixo': 'Explore Screens Below',
            'Acessar Sistema Agora (Login: 1234)': 'Access System Now (Login: 1234)',
            'Perguntas Frequentes': 'Frequently Asked Questions',
            'Agendar Demonstração Gratuita': 'Schedule Free Demo',
            'Claro': 'Light',
            'Escuro': 'Dark'
        },
        es: {
            // Portal Sidebar & Topbar
            'Painel de Controle': 'Panel de Control',
            'Painel de Controle & Visão Geral': 'Panel de Control y Resumen',
            'Funil de Tratamentos (Kanban)': 'Embudo de Tratamientos (Kanban)',
            'Funil de Vendas de Tratamentos (Kanban)': 'Embudo de Ventas de Tratamientos (Kanban)',
            'Conversas WhatsApp': 'Conversaciones WhatsApp',
            'Inbox WhatsApp Multiatendente': 'Bandeja WhatsApp Multiagente',
            'Agenda & Calendário': 'Agenda y Calendario',
            'Agenda & Grade de Consultas': 'Agenda y Horarios de Citas',
            'Pacientes & Prontuários': 'Pacientes e Historiales',
            'Pacientes, Prontuário & Odontograma': 'Pacientes, Historial y Odontograma',
            'Secretária Digital': 'Secretaria Digital',
            'Secretária Digital & Fluxos': 'Secretaria Digital y Flujos',
            'Automações & Follow-up': 'Automatizaciones y Seguimiento',
            'Automações & Regras de Follow-up': 'Automatizaciones y Reglas',
            'Relatórios & Metas': 'Informes y Metas',
            'Relatórios de Metas & Conversão': 'Informes de Metas y Conversión',
            'Financeiro & NFS-e': 'Finanzas y Facturación',
            'Financeiro, Repasses & Emissão NFS-e': 'Finanzas, Pagos y Facturas',
            'Painel TV & Recepção': 'Pantalla TV y Recepción',
            'Painel TV & Sala de Espera (Voz)': 'Pantalla TV y Sala de Espera (Voz)',
            'DocSign & Contratos OTP': 'DocSign y Contratos OTP',
            'DocSign · Assinatura Digital com OTP': 'DocSign · Firma Digital con OTP',
            'Atendimento & Vendas': 'Atención y Ventas',
            'Automação & Escala': 'Automatización y Escala',
            'Clínica & Gestão': 'Clínica y Gestión',
            'Central de Atendimento': 'Centro de Atención',
            'Novo Lead / Orçamento': 'Nuevo Lead / Presupuesto',
            'Ver Landing Page': 'Ver Página Principal',
            'WhatsApp Conectado (3 atendentes online)': 'WhatsApp Conectado (3 agentes en línea)',
            'Administradora': 'Administradora',
            // Portal Login & Dashboard
            'Entrar no CRM Odonto Solution': 'Entrar al CRM Odonto Solution',
            'Lembrar meu acesso': 'Recordar mi acceso',
            'Esqueceu a senha?': '¿Olvidaste tu contraseña?',
            'Período de Análise:': 'Período de Análisis:',
            'Últimos 30 dias': 'Últimos 30 días',
            'Últimos 7 dias': 'Últimos 7 días',
            'Este Mês': 'Este Mes',
            '✦ Resumir indicadores do painel': '✦ Resumir indicadores del panel',
            'Pacientes Atendidos': 'Pacientes Atendidos',
            'Orçamentos Aprovados': 'Presupuestos Aprobados',
            'Taxa de Conversão': 'Tasa de Conversión',
            'Ticket Médio': 'Ticket Promedio',
            // Dynamic Portal Headers
            'Agenda Integrada de Consultas': 'Agenda Integrada de Citas',
            'Novo Agendamento': 'Nueva Cita',
            'Todos os Profissionais': 'Todos los Profesionales',
            'Chamar na TV': 'Llamar en TV',
            'Fluxo de Caixa & Notas Fiscais (NFS-e)': 'Flujo de Caja y Facturas',
            'Emitir NFS-e': 'Emitir Factura',
            'Receitas Totais': 'Ingresos Totales',
            'Despesas Operacionais': 'Gastos Operativos',
            'Saldo Líquido': 'Saldo Neto',
            'Repasse Profissionais (35%)': 'Pago Profesionales (35%)',
            'Acionar Chamada na Recepção': 'Activar Llamada en Recepción',
            'Chamar Paciente com Voz': 'Llamar Paciente con Voz',
            'Assinatura Digital na Tela (DocSign + OTP)': 'Firma Digital en Pantalla (DocSign + OTP)',
            'Documentos Assinados': 'Documentos Firmados',
            'Validar & Assinar': 'Validar y Firmar',
            'Base Geral de Pacientes': 'Directorio de Pacientes',
            'Prontuário & Odontograma': 'Historial y Odontograma',
            // Landing Page
            'Funil & CRM': 'Embudo y CRM',
            'O Fim da Bagunça': 'Fin del Desorden',
            'Automações': 'Automatizaciones',
            'Atendimento Digital': 'Atención Digital',
            '15 em 1': '15 en 1',
            'Planos': 'Planes',
            'FAQ': 'FAQ',
            'Entrar no Portal': 'Entrar al Portal',
            'Demonstração Grátis': 'Demo Gratis',
            'O 1º CRM com Automação Completa para Clínicas e Consultórios': 'El 1º CRM con Automatización Completa para Clínicas y Consultorios',
            'Explorar Telas Abaixo': 'Explorar Pantallas Abajo',
            'Acessar Sistema Agora (Login: 1234)': 'Acceder al Sistema Ahora (Login: 1234)',
            'Perguntas Frequentes': 'Preguntas Frecuentes',
            'Agendar Demonstração Gratuita': 'Agendar Demo Gratuita',
            'Claro': 'Claro',
            'Escuro': 'Oscuro'
        }
    };

    function injectDarkThemeStyles() {
        if (document.getElementById('odonto-theme-styles')) return;
        const style = document.createElement('style');
        style.id = 'odonto-theme-styles';
        style.textContent = `
            html.theme-dark body {
                background-color: #0b1120 !important;
                color: #e2e8f0 !important;
            }
            html.theme-dark header,
            html.theme-dark aside,
            html.theme-dark .bg-white,
            html.theme-dark .bg-\\[\\#F9FAFD\\],
            html.theme-dark .bg-\\[\\#F6F7FB\\],
            html.theme-dark .bg-\\[\\#F4F6FC\\],
            html.theme-dark .bg-slate-50,
            html.theme-dark .bg-slate-100 {
                background-color: #111827 !important;
                color: #e2e8f0 !important;
            }
            html.theme-dark .bg-slate-50\\/90,
            html.theme-dark .bg-white\\/90,
            html.theme-dark .bg-white\\/95 {
                background-color: rgba(17, 24, 39, 0.92) !important;
            }
            html.theme-dark .border-slate-100,
            html.theme-dark .border-slate-200,
            html.theme-dark .border-slate-200\\/80,
            html.theme-dark .border-slate-300,
            html.theme-dark .border-\\[\\#E4E8F3\\] {
                border-color: #1f2937 !important;
            }
            html.theme-dark .divide-slate-100 > :not([hidden]) ~ :not([hidden]) {
                border-color: #1f2937 !important;
            }
            html.theme-dark .text-slate-900,
            html.theme-dark .text-slate-800 {
                color: #f8fafc !important;
            }
            html.theme-dark .text-slate-700,
            html.theme-dark .text-slate-600 {
                color: #cbd5e1 !important;
            }
            html.theme-dark .text-slate-500,
            html.theme-dark .text-slate-400 {
                color: #94a3b8 !important;
            }
            html.theme-dark input,
            html.theme-dark select,
            html.theme-dark textarea {
                background-color: #0f172a !important;
                border-color: #334155 !important;
                color: #f1f5f9 !important;
            }
            html.theme-dark .sidebar-item:hover {
                background-color: #1e293b !important;
                color: #f8fafc !important;
            }
            html.theme-dark .sidebar-item.active {
                background-color: #2e1065 !important;
                color: #ddd6fe !important;
            }
            html.theme-dark .hover\\:bg-white:hover,
            html.theme-dark .hover\\:bg-slate-50:hover,
            html.theme-dark .hover\\:bg-slate-100:hover {
                background-color: #1e293b !important;
            }
            html.theme-dark .bg-brand-50,
            html.theme-dark .bg-brand-50\\/70,
            html.theme-dark .bg-brand-50\\/30 {
                background-color: rgba(116, 51, 237, 0.14) !important;
            }
            html.theme-dark canvas#docSignCanvas {
                background-color: #f8fafc !important;
            }
        `;
        document.head.appendChild(style);
    }

    function getTheme() {
        return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    }

    function getLang() {
        const l = localStorage.getItem(LANG_KEY);
        return (l === 'en' || l === 'es') ? l : 'pt';
    }

    function t(ptText) {
        const lang = getLang();
        if (lang === 'pt') return ptText;
        return (DICT[lang] && DICT[lang][ptText]) || ptText;
    }

    function applyTheme(theme) {
        injectDarkThemeStyles();
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('theme-dark', isDark);
        localStorage.setItem(THEME_KEY, theme);

        document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
            const icon = btn.querySelector('[data-theme-icon]');
            const label = btn.querySelector('[data-theme-label]');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
            if (label) label.textContent = isDark ? t('Claro') : t('Escuro');
            btn.setAttribute('aria-pressed', String(isDark));
        });
    }

    function translateTextNodes(root) {
        if (!root) return;
        const lang = getLang();
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) {
            if (n.parentElement && ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(n.parentElement.tagName)) continue;
            nodes.push(n);
        }

        nodes.forEach(node => {
            const raw = node.nodeValue;
            const trimmed = raw.trim();
            if (!trimmed) return;
            if (!node._odontoPt) {
                // Capture original PT text on first run
                const isKnownPt = DICT.en[trimmed] || DICT.es[trimmed];
                if (isKnownPt) node._odontoPt = trimmed;
            }
            const basePt = node._odontoPt;
            if (!basePt) return;
            const nextText = lang === 'pt' ? basePt : (DICT[lang][basePt] || basePt);
            if (trimmed !== nextText) {
                node.nodeValue = raw.replace(trimmed, nextText);
            }
        });
    }

    function applyLanguage(lang) {
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'pt-BR';

        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            const active = btn.dataset.langBtn === lang;
            btn.className = active
                ? 'px-2 py-1 rounded-lg bg-brand-600 text-white font-bold text-[11px] transition'
                : 'px-2 py-1 rounded-lg text-slate-500 hover:text-slate-900 font-semibold text-[11px] transition';
        });

        translateTextNodes(document.body);

        // Update theme button label in the new language
        applyTheme(getTheme());

        // Re-render dynamic portal sections if available
        window.dispatchEvent(new CustomEvent('odonto:langchange', { detail: { lang } }));
    }

    window.toggleOdontoTheme = function () {
        const next = getTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        if (window.showToast) {
            window.showToast(
                next === 'dark' ? 'Tema Escuro ativado' : 'Tema Claro ativado',
                next === 'dark' ? 'Interface ajustada para conforto visual.' : 'Interface clara restaurada.',
                'info'
            );
        }
    };

    window.setOdontoLanguage = function (lang) {
        if (!['pt', 'en', 'es'].includes(lang)) return;
        applyLanguage(lang);
        if (window.showToast) {
            const names = { pt: 'Português (BR)', en: 'English', es: 'Español' };
            window.showToast('Idioma alterado', `Interface exibida em ${names[lang]}.`, 'success');
        }
    };

    window.odontoI18n = { t, getLang, translateTextNodes };

    // Apply immediately on load
    applyTheme(getTheme());
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getTheme());
        applyLanguage(getLang());
    });
})();
