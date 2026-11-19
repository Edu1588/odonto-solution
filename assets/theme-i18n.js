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
            'Funil de Vendas de Tratamentos': 'Treatment Sales Pipeline',
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

            // Portal Login & Dashboard KPIs / Charts
            'Plataforma CRM de Vendas & Gestão Clínica Integrada': 'Integrated Sales CRM & Clinical Management Platform',
            'Usuário ou E-mail': 'Username or Email',
            'Senha de Acesso': 'Password',
            'Entrar no CRM Odonto Solution': 'Sign in to Odonto Solution CRM',
            'Lembrar meu acesso': 'Remember me',
            'Esqueceu a senha?': 'Forgot password?',
            'Período de Análise:': 'Analysis Period:',
            'Últimos 30 dias': 'Last 30 days',
            'Últimos 7 dias': 'Last 7 days',
            'Este Mês': 'This Month',
            '✦ Resumir indicadores do painel': '✦ Summarize dashboard metrics',
            'Resumo Estratégico do Painel (Últimos 30 dias)': 'Strategic Dashboard Summary (Last 30 days)',
            'Leads / Pacientes Novos': 'New Leads / Patients',
            'Todas as campanhas (Instagram/WhatsApp)': 'All campaigns (Instagram/WhatsApp)',
            'Tratamentos Fechados': 'Closed Treatments',
            'Entradas confirmadas no mês': 'Confirmed monthly revenue',
            'Conversão de Orçamentos': 'Quote Conversion',
            'vs. 49% do mês anterior': 'vs. 49% last month',
            'Ticket Médio Clínico': 'Average Clinical Ticket',
            'Foco em Implantes & Ortodontia': 'Focus on Implants & Orthodontics',
            'Ranking de Fechamentos': 'Closing Leaderboard',
            '30 dias': '30 days',
            '48 vendas': '48 sales',
            '39 vendas': '39 sales',
            '31 vendas': '31 sales',
            'Oportunidades Ganhas no Pipeline': 'Won Pipeline Opportunities',
            'Evolução de orçamentos e tratamentos fechados por semana': 'Weekly evolution of quotes and closed treatments',
            'Meta: 80%': 'Goal: 80%',

            // Kanban
            '14 Oportunidades em Aberto': '14 Open Opportunities',
            'Adicionar Lead': 'Add Lead',
            'Novos Leads': 'New Leads',
            'Em Qualificação': 'Qualifying',
            'Avaliação Agendada': 'Evaluation Scheduled',
            'Orçamento Apresentado': 'Quote Presented',
            'Tratamento Fechado!': 'Treatment Closed!',
            'Fluxo Ativo': 'Active Flow',
            'Agora': 'Now',
            'Confirmado': 'Confirmed',
            'Agendando...': 'Scheduling...',
            'Aguardando Visita': 'Awaiting Visit',
            'Chamar': 'Message',
            'Orçamento': 'Quote',
            'Reenviar': 'Resend',
            'Ganho / Contrato': 'Won / Contract',
            'Pago via PIX': 'Paid via PIX',
            'DocSign Assinado': 'DocSign Signed',
            'Interesse: Implante Dentário': 'Interest: Dental Implant',
            'Interesse: Aparelho Invisível': 'Interest: Clear Aligners',
            'Sintoma: Dor no siso + Limpeza': 'Symptom: Wisdom tooth pain + Cleaning',
            'Protocolo All-on-4 Superior': 'Upper All-on-4 Protocol',
            'Lentes de Contato Dental (6x)': 'Dental Veneers (6x)',

            // Secretária Digital, Automações & Relatórios
            'Configuração da Secretária Digital Odonto Solution': 'Odonto Solution Digital Receptionist Setup',
            'Automatize o atendimento, qualificação e agendamentos no WhatsApp da clínica': 'Automate patient intake, qualification and scheduling on clinic WhatsApp',
            'Nome da Assistente Virtual': 'Virtual Assistant Name',
            'Tom de Voz': 'Tone of Voice',
            'Gatilhos de Automação Ativos:': 'Active Automation Triggers:',
            'Responder novos leads em menos de 5 segundos': 'Reply to new leads in under 5 seconds',
            'Agendamento automático direto na grade dos dentistas': 'Automatic booking directly on dentists\' schedules',
            'Disparo automático de lembrete 24h e 2h antes da consulta': 'Automatic reminder 24h and 2h before appointment',
            'Salvar Configurações de Atendimento': 'Save Service Settings',
            'Fluxos de Automação Odonto Solution': 'Odonto Solution Automation Flows',
            'Follow-up de Orçamento Não Respondido (24h e 72h)': 'Unanswered Quote Follow-up (24h & 72h)',
            'Envia simulação de pagamento facilitado e convite para tirar dúvidas': 'Sends flexible payment simulation and Q&A invite',
            'Resgate de Pacientes Inativos (+6 Meses)': 'Inactive Patient Reactivation (+6 Months)',
            'Convite para check-up de rotina e profilaxia preventiva': 'Invite for routine check-up and preventive prophylaxis',
            'Ativo': 'Active',
            'Relatórios de Conversão e Desempenho': 'Conversion & Performance Reports',
            'Taxa de conversão de leads por canal de origem nos últimos 30 dias:': 'Lead conversion rate by source channel in the last 30 days:',
            'WhatsApp Direto & Indicação': 'Direct WhatsApp & Referral',

            // Dynamic Portal Modules
            'Todas': 'All',
            'Confirmadas': 'Confirmed',
            'Orçamentos': 'Quotes',
            'Enviar': 'Send',
            'Assumir Humano': 'Take Over (Human)',
            'Reativar Fluxo': 'Resume Flow',
            'Agenda Integrada de Consultas': 'Integrated Appointment Schedule',
            'Gerencie horários por profissional, confirme via WhatsApp e chame pacientes na TV': 'Manage schedules by doctor, confirm on WhatsApp and call patients on TV',
            'Novo Agendamento': 'New Appointment',
            'Todos os Profissionais': 'All Professionals',
            'Chamar na TV': 'Call on TV',
            'Fluxo de Caixa & Notas Fiscais (NFS-e)': 'Cash Flow & Service Invoices',
            'Movimentações clínicas e emissão fiscal integrada': 'Clinical transactions and integrated invoicing',
            'Emitir NFS-e': 'Issue Invoice',
            'Receitas Totais': 'Total Revenue',
            'Despesas Operacionais': 'Operating Expenses',
            'Saldo Líquido': 'Net Balance',
            'Repasse Profissionais (35%)': 'Doctor Payouts (35%)',
            'Descrição': 'Description',
            'Categoria': 'Category',
            'Data': 'Date',
            'Valor': 'Amount',
            'PAINEL DE CHAMADA AO VIVO': 'LIVE WAITING ROOM DISPLAY',
            'Paciente Chamado': 'Patient Called',
            'Acionar Chamada na Recepção': 'Trigger Waiting Room Call',
            'Paciente': 'Patient',
            'Consultório': 'Room',
            'Profissional': 'Doctor',
            'Chamar Paciente com Voz': 'Call Patient with Voice',
            'Assinatura Digital na Tela (DocSign + OTP)': 'On-Screen Digital Signature (DocSign + OTP)',
            'Coleta de assinatura do paciente para TCLE e planos de tratamento': 'Capture patient signature for consent forms and treatment plans',
            'Assine no quadro abaixo:': 'Sign in the box below:',
            'Limpar': 'Clear',
            'Documentos Assinados': 'Signed Documents',
            'Validar & Assinar': 'Validate & Sign',
            'Base Geral de Pacientes': 'Patient Directory',
            'Acesse o odontograma interativo e emita prescrições digitais com QR Code': 'Access interactive odontogram and issue QR Code digital prescriptions',
            'Telefone / WhatsApp': 'Phone / WhatsApp',
            'Convênio': 'Insurance',
            'Nascimento': 'Birth Date',
            'Ações Clínicas': 'Clinical Actions',
            'Prontuário & Odontograma': 'Records & Odontogram',
            'Cadastrar Nova Oportunidade / Lead': 'Register New Opportunity / Lead',
            'Nome do Paciente': 'Patient Name',
            'Tratamento de Interesse': 'Treatment of Interest',
            'Cancelar': 'Cancel',

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
            'Menos Trabalho, Mais Pacientes e': 'Less Work, More Patients and',
            'Tratamentos Fechados': 'Closed Treatments',
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
            'Funil de Vendas de Tratamentos': 'Embudo de Ventas de Tratamientos',
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

            // Portal Login & Dashboard KPIs / Charts
            'Plataforma CRM de Vendas & Gestão Clínica Integrada': 'Plataforma CRM de Ventas y Gestión Clínica Integrada',
            'Usuário ou E-mail': 'Usuario o Correo',
            'Senha de Acesso': 'Contraseña',
            'Entrar no CRM Odonto Solution': 'Entrar al CRM Odonto Solution',
            'Lembrar meu acesso': 'Recordar mi acceso',
            'Esqueceu a senha?': '¿Olvidaste tu contraseña?',
            'Período de Análise:': 'Período de Análisis:',
            'Últimos 30 dias': 'Últimos 30 días',
            'Últimos 7 dias': 'Últimos 7 días',
            'Este Mês': 'Este Mes',
            '✦ Resumir indicadores do painel': '✦ Resumir indicadores del panel',
            'Resumo Estratégico do Painel (Últimos 30 dias)': 'Resumen Estratégico del Panel (Últimos 30 días)',
            'Leads / Pacientes Novos': 'Leads / Pacientes Nuevos',
            'Todas as campanhas (Instagram/WhatsApp)': 'Todas las campañas (Instagram/WhatsApp)',
            'Tratamentos Fechados': 'Tratamientos Cerrados',
            'Entradas confirmadas no mês': 'Ingresos confirmados del mes',
            'Conversão de Orçamentos': 'Conversión de Presupuestos',
            'vs. 49% do mês anterior': 'vs. 49% del mes anterior',
            'Ticket Médio Clínico': 'Ticket Promedio Clínico',
            'Foco em Implantes & Ortodontia': 'Enfoque en Implantes y Ortodoncia',
            'Ranking de Fechamentos': 'Ranking de Cierres',
            '30 dias': '30 días',
            '48 vendas': '48 ventas',
            '39 vendas': '39 ventas',
            '31 vendas': '31 ventas',
            'Oportunidades Ganhas no Pipeline': 'Oportunidades Ganadas en el Pipeline',
            'Evolução de orçamentos e tratamentos fechados por semana': 'Evolución semanal de presupuestos y tratamientos cerrados',
            'Meta: 80%': 'Meta: 80%',

            // Kanban
            '14 Oportunidades em Aberto': '14 Oportunidades Abiertas',
            'Adicionar Lead': 'Agregar Lead',
            'Novos Leads': 'Nuevos Leads',
            'Em Qualificação': 'En Calificación',
            'Avaliação Agendada': 'Evaluación Agendada',
            'Orçamento Apresentado': 'Presupuesto Presentado',
            'Tratamento Fechado!': '¡Tratamiento Cerrado!',
            'Fluxo Ativo': 'Flujo Activo',
            'Agora': 'Ahora',
            'Confirmado': 'Confirmado',
            'Agendando...': 'Agendando...',
            'Aguardando Visita': 'Esperando Visita',
            'Chamar': 'Escribir',
            'Orçamento': 'Presupuesto',
            'Reenviar': 'Reenviar',
            'Ganho / Contrato': 'Ganado / Contrato',
            'Pago via PIX': 'Pagado vía PIX',
            'DocSign Assinado': 'DocSign Firmado',
            'Interesse: Implante Dentário': 'Interés: Implante Dental',
            'Interesse: Aparelho Invisível': 'Interés: Alineador Invisible',
            'Sintoma: Dor no siso + Limpeza': 'Síntoma: Dolor de muela + Limpieza',
            'Protocolo All-on-4 Superior': 'Protocolo All-on-4 Superior',
            'Lentes de Contato Dental (6x)': 'Carillas Dentales (6x)',

            // Secretária Digital, Automações & Relatórios
            'Configuração da Secretária Digital Odonto Solution': 'Configuración de Secretaria Digital Odonto Solution',
            'Automatize o atendimento, qualificação e agendamentos no WhatsApp da clínica': 'Automatiza atención, calificación y citas en el WhatsApp de la clínica',
            'Nome da Assistente Virtual': 'Nombre de la Asistente Virtual',
            'Tom de Voz': 'Tono de Voz',
            'Gatilhos de Automação Ativos:': 'Disparadores de Automatización Activos:',
            'Responder novos leads em menos de 5 segundos': 'Responder nuevos leads en menos de 5 segundos',
            'Agendamento automático direto na grade dos dentistas': 'Agenda automática directa en el calendario de los dentistas',
            'Disparo automático de lembrete 24h e 2h antes da consulta': 'Recordatorio automático 24h y 2h antes de la cita',
            'Salvar Configurações de Atendimento': 'Guardar Configuración de Atención',
            'Fluxos de Automação Odonto Solution': 'Flujos de Automatización Odonto Solution',
            'Follow-up de Orçamento Não Respondido (24h e 72h)': 'Seguimiento de Presupuesto Sin Respuesta (24h y 72h)',
            'Envia simulação de pagamento facilitado e convite para tirar dúvidas': 'Envía simulación de pago financiado e invitación para dudas',
            'Resgate de Pacientes Inativos (+6 Meses)': 'Reactivación de Pacientes Inactivos (+6 Meses)',
            'Convite para check-up de rotina e profilaxia preventiva': 'Invitación a revisión de rutina y profilaxis preventiva',
            'Ativo': 'Activo',
            'Relatórios de Conversão e Desempenho': 'Informes de Conversión y Desempeño',
            'Taxa de conversão de leads por canal de origem nos últimos 30 dias:': 'Tasa de conversión de leads por canal en los últimos 30 días:',
            'WhatsApp Direto & Indicação': 'WhatsApp Directo y Recomendación',

            // Dynamic Portal Modules
            'Todas': 'Todas',
            'Confirmadas': 'Confirmadas',
            'Orçamentos': 'Presupuestos',
            'Enviar': 'Enviar',
            'Assumir Humano': 'Asumir Humano',
            'Reativar Fluxo': 'Reactivar Flujo',
            'Agenda Integrada de Consultas': 'Agenda Integrada de Citas',
            'Gerencie horários por profissional, confirme via WhatsApp e chame pacientes na TV': 'Gestiona horarios por profesional, confirma por WhatsApp y llama en TV',
            'Novo Agendamento': 'Nueva Cita',
            'Todos os Profissionais': 'Todos los Profesionales',
            'Chamar na TV': 'Llamar en TV',
            'Fluxo de Caixa & Notas Fiscais (NFS-e)': 'Flujo de Caja y Facturas',
            'Movimentações clínicas e emissão fiscal integrada': 'Movimientos clínicos y facturación integrada',
            'Emitir NFS-e': 'Emitir Factura',
            'Receitas Totais': 'Ingresos Totales',
            'Despesas Operacionais': 'Gastos Operativos',
            'Saldo Líquido': 'Saldo Neto',
            'Repasse Profissionais (35%)': 'Pago Profesionales (35%)',
            'Descrição': 'Descripción',
            'Categoria': 'Categoría',
            'Data': 'Fecha',
            'Valor': 'Valor',
            'PAINEL DE CHAMADA AO VIVO': 'PANTALLA DE LLAMADA EN VIVO',
            'Paciente Chamado': 'Paciente Llamado',
            'Acionar Chamada na Recepção': 'Activar Llamada en Recepción',
            'Paciente': 'Paciente',
            'Consultório': 'Consultorio',
            'Profissional': 'Profesional',
            'Chamar Paciente com Voz': 'Llamar Paciente con Voz',
            'Assinatura Digital na Tela (DocSign + OTP)': 'Firma Digital en Pantalla (DocSign + OTP)',
            'Coleta de assinatura do paciente para TCLE e planos de tratamento': 'Captura firma del paciente para consentimientos y presupuestos',
            'Assine no quadro abaixo:': 'Firma en el recuadro:',
            'Limpar': 'Limpiar',
            'Documentos Assinados': 'Documentos Firmados',
            'Validar & Assinar': 'Validar y Firmar',
            'Base Geral de Pacientes': 'Directorio de Pacientes',
            'Acesse o odontograma interativo e emita prescrições digitais com QR Code': 'Accede al odontograma interactivo y emite recetas digitales con QR',
            'Telefone / WhatsApp': 'Teléfono / WhatsApp',
            'Convênio': 'Seguro / Convenio',
            'Nascimento': 'Nacimiento',
            'Ações Clínicas': 'Acciones Clínicas',
            'Prontuário & Odontograma': 'Historial y Odontograma',
            'Cadastrar Nova Oportunidade / Lead': 'Registrar Nueva Oportunidad / Lead',
            'Nome do Paciente': 'Nombre del Paciente',
            'Tratamento de Interesse': 'Tratamiento de Interés',
            'Cancelar': 'Cancelar',

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
            'Menos Trabalho, Mais Pacientes e': 'Menos Trabajo, Más Pacientes y',
            'Explorar Telas Abaixo': 'Explorar Pantallas Abajo',
            'Acessar Sistema Agora (Login: 1234)': 'Acceder al Sistema Ahora (Login: 1234)',
            'Perguntas Frequentes': 'Preguntas Frecuentes',
            'Agendar Demonstração Gratuita': 'Agendar Demo Gratuita',
            'Claro': 'Claro',
            'Escuro': 'Oscuro'
        }
    };

    const PLACEHOLDERS = {
        en: {
            'Buscar paciente ou tratamento...': 'Search patient or treatment...',
            'Digite sua mensagem no WhatsApp...': 'Type your WhatsApp message...',
            'Buscar nome, CPF ou convênio...': 'Search name, ID or insurance...',
            'Digite o código OTP': 'Enter OTP code',
            'Nome completo': 'Full name'
        },
        es: {
            'Buscar paciente ou tratamento...': 'Buscar paciente o tratamiento...',
            'Digite sua mensagem no WhatsApp...': 'Escribe tu mensaje de WhatsApp...',
            'Buscar nome, CPF ou convênio...': 'Buscar nombre, documento o seguro...',
            'Digite o código OTP': 'Ingresa el código OTP',
            'Nome completo': 'Nombre completo'
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
                if (DICT.en[trimmed] || DICT.es[trimmed]) node._odontoPt = trimmed;
            }
            const basePt = node._odontoPt;
            if (!basePt) return;
            const nextText = lang === 'pt' ? basePt : (DICT[lang][basePt] || basePt);
            if (trimmed !== nextText) {
                node.nodeValue = raw.replace(trimmed, nextText);
            }
        });

        // Translate input placeholders
        root.querySelectorAll('input[placeholder]').forEach(inp => {
            if (!inp.dataset.odontoPtPh) {
                const ph = inp.getAttribute('placeholder');
                if (PLACEHOLDERS.en[ph] || PLACEHOLDERS.es[ph]) inp.dataset.odontoPtPh = ph;
            }
            const basePh = inp.dataset.odontoPtPh;
            if (basePh) {
                inp.setAttribute('placeholder', lang === 'pt' ? basePh : (PLACEHOLDERS[lang][basePh] || basePh));
            }
        });

        // Update Chart.js labels if chart exists
        if (window.Chart && Chart.instances) {
            Object.values(Chart.instances).forEach(ch => {
                if (!ch || !ch.data) return;
                if (ch.data.labels && ch.data.labels.length === 4) {
                    ch.data.labels = lang === 'en'
                        ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                        : lang === 'es'
                            ? ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']
                            : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
                }
                if (ch.data.datasets && ch.data.datasets.length >= 2) {
                    ch.data.datasets[0].label = lang === 'en' ? 'Quotes Presented' : lang === 'es' ? 'Presupuestos Presentados' : 'Orçamentos Apresentados';
                    ch.data.datasets[1].label = lang === 'en' ? 'Closed Treatments' : lang === 'es' ? 'Tratamientos Cerrados' : 'Tratamentos Fechados';
                }
                ch.update('none');
            });
        }
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
        applyTheme(getTheme());
        window.dispatchEvent(new CustomEvent('odonto:langchange', { detail: { lang } }));
    }

    window.toggleOdontoTheme = function () {
        const next = getTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        if (window.showToast) {
            const lang = getLang();
            const title = next === 'dark'
                ? (lang === 'en' ? 'Dark theme enabled' : lang === 'es' ? 'Tema oscuro activado' : 'Tema Escuro ativado')
                : (lang === 'en' ? 'Light theme enabled' : lang === 'es' ? 'Tema claro activado' : 'Tema Claro ativado');
            window.showToast(title, '', 'info');
        }
    };

    window.setOdontoLanguage = function (lang) {
        if (!['pt', 'en', 'es'].includes(lang)) return;
        applyLanguage(lang);
        if (window.showToast) {
            const names = { pt: 'Português (BR)', en: 'English', es: 'Español' };
            const title = lang === 'en' ? 'Language updated' : lang === 'es' ? 'Idioma actualizado' : 'Idioma alterado';
            window.showToast(title, names[lang], 'success');
        }
    };

    window.odontoI18n = { t, getLang, translateTextNodes };

    applyTheme(getTheme());
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getTheme());
        applyLanguage(getLang());
    });
})();
