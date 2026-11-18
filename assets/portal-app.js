(() => {
    const STORAGE_KEY = 'odonto_portal_state_v1';

    const DEFAULT_CHATS = {
        'Mariana Silva': {
            nome: 'Mariana Silva Santos',
            iniciais: 'MS',
            telefone: '(11) 98765-4321',
            tratamento: 'Ortodontia',
            etapa: 'Confirmado',
            mensagens: [
                { from: 'patient', text: 'Olá! Gostaria de agendar uma consulta para avaliação ortodôntica com a Dra. Juliana.', time: '10:40' },
                { from: 'clinic', text: 'Olá, Mariana! Que ótimo ter você por aqui. Temos horários disponíveis amanhã às 10:00 ou às 14:30 com a Dra. Juliana. Qual prefere?', time: '10:41' },
                { from: 'patient', text: 'Às 10h fica perfeito pra mim!', time: '10:42' },
                { from: 'clinic', text: 'Perfeito! Sua avaliação ortodôntica está confirmada para amanhã às 10:00 no Consultório 02. Já registrei tudo no prontuário!', time: '10:42' }
            ]
        },
        'Beatriz Lima': {
            nome: 'Beatriz Lima Castro',
            iniciais: 'BL',
            telefone: '(11) 96543-2109',
            tratamento: 'Implantes',
            etapa: 'Orçamento',
            mensagens: [
                { from: 'patient', text: 'Olá! Qual o valor aproximado do implante unitário?', time: '09:12' },
                { from: 'clinic', text: 'Olá, Beatriz! O investimento depende da avaliação tomográfica, mas trabalhamos com parcelamento em até 12x. Posso agendar sua avaliação com o Dr. Carlos?', time: '09:14' },
                { from: 'patient', text: 'Tenho interesse sim! Quais horários têm esta semana?', time: '09:15' }
            ]
        },
        'Clara Mendes': {
            nome: 'Clara Mendes Antunes',
            iniciais: 'CM',
            telefone: '(11) 94321-0987',
            tratamento: 'Protocolo All-on-4',
            etapa: 'Negociação',
            mensagens: [
                { from: 'clinic', text: 'Olá, Clara! Enviamos a simulação do seu tratamento Protocolo All-on-4 com condições especiais.', time: 'Ontem' },
                { from: 'patient', text: 'Recebi o orçamento por SMS, consigo parcelar em 10x sem juros?', time: 'Ontem' }
            ]
        },
        'José Fernando': {
            nome: 'José Fernando Oliveira',
            iniciais: 'JF',
            telefone: '(11) 97654-3210',
            tratamento: 'Manutenção de Aparelho',
            etapa: 'Em Atendimento',
            mensagens: [
                { from: 'patient', text: 'Bom dia! Já cheguei na recepção da clínica.', time: '09:05' },
                { from: 'clinic', text: 'Bom dia, José Fernando! A Dra. Juliana já vai chamar você no Consultório 02.', time: '09:06' }
            ]
        }
    };

    const PROCEDURES = [
        { id: 'implante', nome: 'Implante Unitário + Coroa', valor: 3800 },
        { id: 'lente', nome: 'Lente de Contato Dental (por dente)', valor: 2200 },
        { id: 'alinhador', nome: 'Alinhador Invisível Completo', valor: 8900 },
        { id: 'clareamento', nome: 'Clareamento a Laser', valor: 1200 },
        { id: 'profilaxia', nome: 'Limpeza & Profilaxia Completa', valor: 280 },
        { id: 'canal', nome: 'Tratamento Endodôntico (Canal)', valor: 1150 }
    ];

    const TOOTH_STATES = [
        { key: 'saudavel', label: 'Saudável', bg: 'bg-white border-slate-300 text-slate-700' },
        { key: 'tratamento', label: 'Em Tratamento', bg: 'bg-amber-100 border-amber-400 text-amber-900 font-bold' },
        { key: 'restauracao', label: 'Restauração', bg: 'bg-sky-100 border-sky-400 text-sky-900 font-bold' },
        { key: 'implante', label: 'Implante', bg: 'bg-violet-100 border-violet-500 text-violet-900 font-bold' },
        { key: 'extracao', label: 'Extração', bg: 'bg-rose-100 border-rose-400 text-rose-900 font-bold' }
    ];

    let state = {
        unidade: 'Odonto Solution · Matriz SP',
        periodo: 'Últimos 30 dias',
        activeChat: 'Mariana Silva',
        chatFilter: 'todos',
        chatSearch: '',
        agendaProfFilter: 'todos',
        pacienteSearch: '',
        modoHumano: false,
        profissionais: [],
        pacientes: [],
        agendamentos: [],
        painelChamadas: [],
        prescricoes: [],
        financeiro: [],
        chats: JSON.parse(JSON.stringify(DEFAULT_CHATS)),
        odontogramas: {},
        orcamentos: {},
        contratos: [
            { id: 'DOC-901', paciente: 'Mariana Silva Santos', titulo: 'TCLE & Plano Ortodôntico', otp: '482910', data: '28/10/2026', status: 'Assinado via OTP' }
        ],
        kanbanMoves: {},
        extraLeads: []
    };

    function loadLocalState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw);
            if (saved.unidade) state.unidade = saved.unidade;
            if (saved.chats) state.chats = { ...state.chats, ...saved.chats };
            if (saved.odontogramas) state.odontogramas = saved.odontogramas;
            if (saved.orcamentos) state.orcamentos = saved.orcamentos;
            if (saved.contratos) state.contratos = saved.contratos;
            if (saved.kanbanMoves) state.kanbanMoves = saved.kanbanMoves;
            if (saved.extraLeads) state.extraLeads = saved.extraLeads;
            if (saved.agendamentosLocal) state.agendamentos = saved.agendamentosLocal;
            if (saved.prescricoesLocal) state.prescricoes = saved.prescricoesLocal;
            if (saved.financeiroLocal) state.financeiro = saved.financeiroLocal;
            if (saved.chamadasLocal) state.painelChamadas = saved.chamadasLocal;
        } catch (_) {}
    }

    function saveLocalState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                unidade: state.unidade,
                chats: state.chats,
                odontogramas: state.odontogramas,
                orcamentos: state.orcamentos,
                contratos: state.contratos,
                kanbanMoves: state.kanbanMoves,
                extraLeads: state.extraLeads,
                agendamentosLocal: state.agendamentos,
                prescricoesLocal: state.prescricoes,
                financeiroLocal: state.financeiro,
                chamadasLocal: state.painelChamadas
            }));
        } catch (_) {}
    }

    // ------------------------------------------------------------------
    // TOASTS (SUBSTITUI TODOS OS alert() NATIVOS)
    // ------------------------------------------------------------------
    window.showToast = function (title, message = '', type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const colors = {
            success: 'border-emerald-200 bg-white text-slate-900',
            warning: 'border-amber-200 bg-white text-slate-900',
            error: 'border-rose-200 bg-white text-slate-900',
            info: 'border-brand-200 bg-white text-slate-900'
        };
        const badges = {
            success: 'bg-emerald-100 text-emerald-700',
            warning: 'bg-amber-100 text-amber-700',
            error: 'bg-rose-100 text-rose-700',
            info: 'bg-brand-100 text-brand-700'
        };
        const icons = { success: 'check-circle-2', warning: 'alert-triangle', error: 'x-circle', info: 'sparkles' };
        const el = document.createElement('div');
        el.className = `pointer-events-auto rounded-2xl border p-3.5 shadow-xl flex items-start gap-3 transition-all duration-300 ${colors[type] || colors.info}`;
        el.innerHTML = `
            <div class="w-8 h-8 rounded-xl ${badges[type] || badges.info} flex items-center justify-center shrink-0">
                <i data-lucide="${icons[type] || 'info'}" class="w-4 h-4"></i>
            </div>
            <div class="flex-1 min-w-0 text-xs">
                <div class="font-bold text-slate-900">${escapeHtml(title)}</div>
                ${message ? `<div class="text-slate-500 mt-0.5 leading-relaxed">${escapeHtml(message)}</div>` : ''}
            </div>
            <button type="button" class="text-slate-400 hover:text-slate-600 text-sm leading-none" onclick="this.parentElement.remove()">&times;</button>
        `;
        container.appendChild(el);
        if (window.lucide) lucide.createIcons({ nodes: [el] });
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(8px)';
            setTimeout(() => el.remove(), 250);
        }, 4200);
    };

    function escapeHtml(str) {
        return String(str ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    }

    function formatBRL(v) {
        return Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // ------------------------------------------------------------------
    // RESPONSIVIDADE MOBILE & UNIDADE
    // ------------------------------------------------------------------
    window.toggleSidebar = function (open) {
        const sb = document.getElementById('portalSidebar');
        const bd = document.getElementById('sidebarBackdrop');
        if (!sb || !bd) return;
        if (open) {
            sb.classList.remove('-translate-x-full');
            bd.classList.remove('hidden');
        } else {
            sb.classList.add('-translate-x-full');
            bd.classList.add('hidden');
        }
    };

    window.toggleUnidadeMenu = function () {
        document.getElementById('unidadeDropdown')?.classList.toggle('hidden');
    };

    window.selecionarUnidade = function (nome) {
        state.unidade = nome;
        const el = document.getElementById('topbarClinicaNome');
        if (el) el.textContent = nome;
        document.getElementById('unidadeDropdown')?.classList.add('hidden');
        saveLocalState();
        showToast('Unidade alterada', `Exibindo dados de ${nome}.`, 'info');
    };

    // ------------------------------------------------------------------
    // MODAIS GENÉRICOS
    // ------------------------------------------------------------------
    function openModal(html) {
        const root = document.getElementById('portalModalRoot');
        if (!root) return;
        root.innerHTML = html;
        root.classList.remove('hidden');
        if (window.lucide) lucide.createIcons({ nodes: [root] });
    }

    window.closePortalModal = function () {
        const root = document.getElementById('portalModalRoot');
        if (!root) return;
        root.classList.add('hidden');
        root.innerHTML = '';
    };

    // ------------------------------------------------------------------
    // SINCRONIZAÇÃO COM A API (/api/data)
    // ------------------------------------------------------------------
    async function syncBackendData() {
        try {
            const res = await fetch('/api/data');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            state.profissionais = data.profissionais || [];
            state.pacientes = data.pacientes || [];
            if (!state.agendamentos.length) state.agendamentos = data.agendamentos || [];
            if (!state.painelChamadas.length) state.painelChamadas = data.painelChamadas || [];
            if (!state.prescricoes.length) state.prescricoes = data.prescricoes || [];
            if (!state.financeiro.length) state.financeiro = data.financeiro || [];
            saveLocalState();
        } catch (err) {
            console.warn('Usando dados em cache local:', err.message);
        }
        renderAll();
    }

    function renderAll() {
        renderConversas();
        renderAgenda();
        renderPacientes();
        renderFinanceiro();
        renderPainelTV();
        renderDocSign();
        enhanceKanban();
        if (window.lucide) lucide.createIcons();
    }

    // ------------------------------------------------------------------
    // 1. NAVEGAÇÃO ENTRE ABAS (ESTENDE trocarAba)
    // ------------------------------------------------------------------
    const TAB_TITLES = {
        'dashboard': 'Painel de Controle & Visão Geral',
        'leads': 'Funil de Vendas de Tratamentos (Kanban)',
        'conversas': 'Inbox WhatsApp Multiatendente',
        'agenda': 'Agenda & Grade de Consultas',
        'pacientes': 'Pacientes, Prontuário & Odontograma',
        'agentes-ia': 'Secretária Digital & Fluxos',
        'automacoes': 'Automações & Regras de Follow-up',
        'relatorios': 'Relatórios de Metas & Conversão',
        'financeiro': 'Financeiro, Repasses & Emissão NFS-e',
        'painel-tv': 'Painel TV & Sala de Espera (Voz)',
        'docsign': 'DocSign · Assinatura Digital com OTP'
    };

    window.trocarAba = function (abaId) {
        document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
        const target = document.getElementById('view-' + abaId);
        if (target) target.classList.remove('hidden');

        document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
        const nav = document.getElementById('nav-' + abaId);
        if (nav) nav.classList.add('active');

        const titleEl = document.getElementById('topbarTitulo');
        if (titleEl) titleEl.innerText = TAB_TITLES[abaId] || 'Painel Odonto Solution';

        if (window.innerWidth < 1024) window.toggleSidebar(false);
        if (abaId === 'docsign') initSignatureCanvas();
        if (window.lucide) lucide.createIcons();
    };

    // ------------------------------------------------------------------
    // 2. DASHBOARD: PERÍODO REAL + TOASTS
    // ------------------------------------------------------------------
    function setupDashboardControls() {
        const select = document.querySelector('#view-dashboard select');
        if (select) {
            select.addEventListener('change', (e) => {
                const factor = e.target.value.includes('7') ? 0.28 : e.target.value.includes('Mês') ? 0.65 : 1;
                const kpis = document.querySelectorAll('#view-dashboard .grid > div .text-2xl');
                const base = [482, 148200, 68, 3850];
                if (kpis.length >= 4) {
                    kpis[0].textContent = Math.round(base[0] * factor);
                    kpis[1].textContent = formatBRL(Math.round(base[1] * factor)).replace(',00', '');
                    kpis[2].textContent = Math.min(82, Math.round(base[2] + (factor < 1 ? 4 : 0))) + '%';
                    kpis[3].textContent = formatBRL(Math.round(base[3] * (factor < 0.5 ? 0.94 : 1))).replace(',00', '');
                }
                showToast('Período atualizado', `Indicadores recalculados para: ${e.target.value}.`, 'info');
            });
        }

        // Substituir alert() do botão Salvar Configurações da Secretária Digital
        const btnSaveConfig = document.querySelector('#view-agentes-ia button[onclick*="alert"]');
        if (btnSaveConfig) {
            btnSaveConfig.setAttribute('onclick', "showToast('Configurações salvas', 'As regras da Secretária Digital foram atualizadas.', 'success')");
        }
    }

    // ------------------------------------------------------------------
    // 3. INBOX WHATSAPP REALMENTE FUNCIONAL
    // ------------------------------------------------------------------
    function renderConversas() {
        const container = document.getElementById('view-conversas');
        if (!container) return;

        const keys = Object.keys(state.chats).filter(k => {
            const c = state.chats[k];
            const matchSearch = !state.chatSearch || c.nome.toLowerCase().includes(state.chatSearch) || c.tratamento.toLowerCase().includes(state.chatSearch);
            const matchFilter = state.chatFilter === 'todos' || c.etapa.toLowerCase().includes(state.chatFilter);
            return matchSearch && matchFilter;
        });

        const current = state.chats[state.activeChat] || state.chats[keys[0]] || Object.values(state.chats)[0];

        container.innerHTML = `
            <div class="w-full md:w-80 border-r border-[#E4E8F3] flex flex-col bg-[#F9FAFD] shrink-0 ${state._mobileChatOpen ? 'hidden md:flex' : 'flex'}">
                <div class="p-4 border-b border-[#E4E8F3] space-y-2.5">
                    <div class="relative">
                        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
                        <input id="chatSearchInput" type="text" value="${escapeHtml(state.chatSearch)}" placeholder="Buscar paciente ou tratamento..." class="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500">
                    </div>
                    <div class="flex gap-1.5 text-[11px]">
                        ${[['todos', 'Todas'], ['confirmado', 'Confirmadas'], ['orçamento', 'Orçamentos']].map(([f, lbl]) => `
                            <button type="button" data-chat-filter="${f}" class="px-2.5 py-1 rounded-lg font-semibold transition ${state.chatFilter === f ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}">${lbl}</button>
                        `).join('')}
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto divide-y divide-slate-100">
                    ${keys.length ? keys.map(k => {
                        const c = state.chats[k];
                        const last = c.mensagens[c.mensagens.length - 1] || { text: '', time: '' };
                        const active = current && c.nome === current.nome;
                        return `
                            <div data-chat-key="${escapeHtml(k)}" class="p-3.5 cursor-pointer transition flex items-center gap-3 ${active ? 'bg-brand-50/70 border-l-4 border-l-brand-600' : 'hover:bg-white'}">
                                <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center text-xs shrink-0">${escapeHtml(c.iniciais)}</div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-2">
                                        <span class="font-bold text-xs text-slate-900 truncate">${escapeHtml(c.nome)}</span>
                                        <span class="text-[10px] text-brand-600 font-semibold shrink-0">${escapeHtml(last.time)}</span>
                                    </div>
                                    <div class="text-[10px] text-slate-400 font-medium">${escapeHtml(c.tratamento)} · ${escapeHtml(c.etapa)}</div>
                                    <p class="text-[11px] text-slate-500 truncate mt-0.5">${escapeHtml(last.text)}</p>
                                </div>
                            </div>
                        `;
                    }).join('') : `<div class="p-6 text-center text-xs text-slate-400">Nenhuma conversa encontrada.</div>`}
                </div>
            </div>

            <div class="flex-1 flex flex-col bg-[#F4F6FC] ${state._mobileChatOpen ? 'flex' : 'hidden md:flex'}">
                ${current ? `
                    <div class="h-14 bg-white border-b border-[#E4E8F3] px-4 lg:px-5 flex items-center justify-between shrink-0 gap-2">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <button type="button" id="btnBackChatList" class="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600"><i data-lucide="arrow-left" class="w-4 h-4"></i></button>
                            <div class="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs shrink-0">${escapeHtml(current.iniciais)}</div>
                            <div class="min-w-0">
                                <div class="font-bold text-xs text-slate-900 truncate">${escapeHtml(current.nome)}</div>
                                <div class="text-[10px] text-emerald-600 flex items-center gap-1 font-medium truncate">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                    <span>${escapeHtml(current.telefone)} · ${state.modoHumano ? 'Atendimento Humano' : 'Fluxo Automatizado Ativo'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button type="button" onclick="abrirOrcamentador('${escapeHtml(current.nome)}')" class="hidden sm:flex px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition items-center gap-1">
                                <i data-lucide="file-text" class="w-3.5 h-3.5"></i><span>Orçamento</span>
                            </button>
                            <button type="button" onclick="alternarModoHumano()" id="btnModoAtendimento" class="px-3 py-1.5 ${state.modoHumano ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-brand-50 text-brand-700 border-brand-200'} border text-xs font-bold rounded-lg transition flex items-center gap-1.5">
                                <i data-lucide="${state.modoHumano ? 'bot' : 'user-check'}" class="w-3.5 h-3.5"></i>
                                <span class="hidden sm:inline">${state.modoHumano ? 'Reativar Fluxo' : 'Assumir Humano'}</span>
                            </button>
                        </div>
                    </div>

                    <div id="chatMessages" class="flex-1 p-4 lg:p-5 overflow-y-auto space-y-3">
                        ${current.mensagens.map(m => m.from === 'patient' ? `
                            <div class="flex justify-start">
                                <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-sm text-xs text-slate-800">
                                    ${escapeHtml(m.text)}
                                    <div class="text-[10px] text-slate-400 mt-1 text-right">${escapeHtml(m.time)}</div>
                                </div>
                            </div>
                        ` : `
                            <div class="flex justify-end">
                                <div class="bg-emerald-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-sm text-xs">
                                    <div class="font-bold text-[10px] text-emerald-200 mb-1 flex items-center gap-1">
                                        <i data-lucide="check-check" class="w-3 h-3"></i> ${m.from === 'human' ? 'Atendente (Recepção)' : 'Secretária Digital (Odonto Solution)'}
                                    </div>
                                    ${escapeHtml(m.text)}
                                    <div class="text-[10px] text-emerald-200 mt-1 text-right">${escapeHtml(m.time)}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="px-3 pt-2 bg-white border-t border-[#E4E8F3] flex gap-1.5 overflow-x-auto">
                        ${[
                            ['Confirmar horário', 'Olá! Passando para confirmar seu horário conosco amanhã. Podemos manter agendado?'],
                            ['Enviar endereço', 'Nosso endereço: Av. Paulista, 1450 - Conj. 82 (Estacionamento no local).'],
                            ['Link DocSign OTP', 'Segue o link seguro para assinatura digital do seu termo e plano de tratamento via código OTP.'],
                            ['Parcelamento 12x', 'Preparamos uma condição especial em até 12x sem juros no cartão para você iniciar seu tratamento!']
                        ].map(([lbl, msg]) => `
                            <button type="button" data-quick-reply="${escapeHtml(msg)}" class="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-[11px] font-semibold text-slate-600 transition">${lbl}</button>
                        `).join('')}
                    </div>

                    <form onsubmit="enviarMensagemChat(event)" class="p-3 bg-white flex items-center gap-2 shrink-0">
                        <input type="text" id="chatInput" placeholder="Digite sua mensagem no WhatsApp..." class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500">
                        <button type="submit" class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5">
                            <span>Enviar</span>
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                        </button>
                    </form>
                ` : ''}
            </div>
        `;

        container.querySelector('#chatSearchInput')?.addEventListener('input', (e) => {
            state.chatSearch = e.target.value.toLowerCase();
            renderConversas();
            document.getElementById('chatSearchInput')?.focus();
        });
        container.querySelectorAll('[data-chat-filter]').forEach(btn => {
            btn.onclick = () => { state.chatFilter = btn.dataset.chatFilter; renderConversas(); };
        });
        container.querySelectorAll('[data-chat-key]').forEach(row => {
            row.onclick = () => {
                state.activeChat = row.dataset.chatKey;
                state._mobileChatOpen = true;
                renderConversas();
            };
        });
        container.querySelector('#btnBackChatList')?.addEventListener('click', () => {
            state._mobileChatOpen = false;
            renderConversas();
        });
        container.querySelectorAll('[data-quick-reply]').forEach(btn => {
            btn.onclick = () => {
                const input = document.getElementById('chatInput');
                if (input) { input.value = btn.dataset.quickReply; input.focus(); }
            };
        });

        const box = document.getElementById('chatMessages');
        if (box) box.scrollTop = box.scrollHeight;
        if (window.lucide) lucide.createIcons({ nodes: [container] });
    }

    window.selecionarConversa = function (nome, tel, trat) {
        const key = Object.keys(state.chats).find(k => state.chats[k].nome.toLowerCase().includes(nome.toLowerCase()) || k.toLowerCase() === nome.toLowerCase());
        if (key) {
            state.activeChat = key;
        } else {
            state.chats[nome] = {
                nome,
                iniciais: nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                telefone: tel || '(11) 99999-9999',
                tratamento: trat || 'Avaliação Clínica',
                etapa: 'Novo Contato',
                mensagens: [{ from: 'clinic', text: `Olá ${nome}! Como podemos ajudar com seu agendamento hoje?`, time: 'Agora' }]
            };
            state.activeChat = nome;
            saveLocalState();
        }
        state._mobileChatOpen = true;
        renderConversas();
    };

    window.alternarModoHumano = function () {
        state.modoHumano = !state.modoHumano;
        renderConversas();
        showToast(
            state.modoHumano ? 'Modo Humano ativado' : 'Fluxo Automatizado reativado',
            state.modoHumano ? 'As respostas automáticas foram pausadas para esta conversa.' : 'A Secretária Digital voltou a acompanhar este atendimento.',
            state.modoHumano ? 'info' : 'success'
        );
    };

    window.enviarMensagemChat = function (e) {
        e.preventDefault();
        const input = document.getElementById('chatInput');
        if (!input || !input.value.trim()) return;
        const text = input.value.trim();
        const chat = state.chats[state.activeChat];
        if (!chat) return;
        const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        chat.mensagens.push({ from: 'human', text, time: now });
        saveLocalState();
        renderConversas();

        setTimeout(() => {
            const replyTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            chat.mensagens.push({ from: 'patient', text: 'Perfeito, muito obrigado pelo retorno rápido!', time: replyTime });
            saveLocalState();
            renderConversas();
        }, 1200);
    };

    // ------------------------------------------------------------------
    // 4. AGENDA INTEGRADA (GRADE POR PROFISSIONAL + API REAL)
    // ------------------------------------------------------------------
    const STATUS_COLORS = {
        'Agendado': 'bg-slate-100 text-slate-700',
        'Confirmado': 'bg-emerald-50 text-emerald-700',
        'Aguardando': 'bg-amber-50 text-amber-700',
        'Em Atendimento': 'bg-blue-50 text-blue-700',
        'Finalizado': 'bg-purple-50 text-purple-700'
    };

    function renderAgenda() {
        const container = document.getElementById('view-agenda');
        if (!container) return;

        const profMap = Object.fromEntries((state.profissionais || []).map(p => [p.id, p]));
        const pacMap = Object.fromEntries((state.pacientes || []).map(p => [p.id, p]));

        const list = (state.agendamentos || []).filter(a => {
            if (state.agendaProfFilter === 'todos') return true;
            return String(a.profissionalId) === String(state.agendaProfFilter);
        });

        container.innerHTML = `
            <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <h3 class="font-bold text-sm text-slate-900">Agenda Integrada de Consultas</h3>
                        <p class="text-xs text-slate-500">Gerencie horários por profissional, confirme via WhatsApp e chame pacientes na TV</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <select id="agendaProfSelect" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700">
                            <option value="todos">Todos os Profissionais</option>
                            ${(state.profissionais || []).map(p => `<option value="${p.id}" ${String(state.agendaProfFilter) === String(p.id) ? 'selected' : ''}>${escapeHtml(p.nome)} (${escapeHtml(p.consultorio)})</option>`).join('')}
                        </select>
                        <button type="button" onclick="abrirModalNovoAgendamento()" class="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5">
                            <i data-lucide="calendar-plus" class="w-4 h-4"></i><span>Novo Agendamento</span>
                        </button>
                    </div>
                </div>

                <div class="divide-y divide-slate-100 text-xs">
                    ${list.length ? list.map(a => {
                        const pac = a.pacienteNome || (pacMap[a.pacienteId]?.nome) || `Paciente #${a.pacienteId}`;
                        const prof = profMap[a.profissionalId] || { nome: 'Profissional da Clínica', consultorio: 'Consultório 01' };
                        return `
                            <div class="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div class="flex items-center gap-3.5">
                                    <div class="px-2.5 py-1.5 rounded-xl bg-brand-50 text-brand-700 font-mono font-bold text-sm shrink-0">${escapeHtml(a.hora)}</div>
                                    <div>
                                        <div class="font-bold text-slate-900">${escapeHtml(pac)}</div>
                                        <div class="text-slate-500">${escapeHtml(a.tipo)} · ${escapeHtml(prof.nome)} (${escapeHtml(prof.consultorio)}) · <strong class="text-slate-700">${formatBRL(a.valor)}</strong></div>
                                    </div>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <select onchange="atualizarStatusAgendamento(${a.id}, this.value)" class="rounded-full px-3 py-1 font-bold text-[11px] border border-slate-200 focus:outline-none ${STATUS_COLORS[a.status] || 'bg-slate-100 text-slate-700'}">
                                        ${['Agendado', 'Confirmado', 'Aguardando', 'Em Atendimento', 'Finalizado'].map(s => `<option value="${s}" ${a.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                                    </select>
                                    <button type="button" onclick="chamarPacienteTV('${escapeHtml(pac)}', '${escapeHtml(prof.consultorio)}', '${escapeHtml(prof.nome)}')" class="px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-[11px] flex items-center gap-1 transition">
                                        <i data-lucide="volume-2" class="w-3.5 h-3.5"></i><span>Chamar na TV</span>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('') : `<div class="py-8 text-center text-slate-400">Nenhum agendamento encontrado para este filtro.</div>`}
                </div>
            </div>
        `;

        container.querySelector('#agendaProfSelect')?.addEventListener('change', (e) => {
            state.agendaProfFilter = e.target.value;
            renderAgenda();
        });
        if (window.lucide) lucide.createIcons({ nodes: [container] });
    }

    window.atualizarStatusAgendamento = async function (id, status) {
        const item = state.agendamentos.find(a => a.id === id);
        if (item) item.status = status;
        saveLocalState();
        renderAgenda();
        try {
            await fetch('/api/agendamentos/status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
        } catch (_) {}
        showToast('Status atualizado', `Agendamento marcado como "${status}".`, 'success');
    };

    window.abrirModalNovoAgendamento = function () {
        openModal(`
            <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 class="font-bold text-slate-900 text-sm">Novo Agendamento Clínico</h3>
                    <button type="button" onclick="closePortalModal()" class="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
                </div>
                <form onsubmit="salvarNovoAgendamento(event)" class="space-y-3 text-xs">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Paciente</label>
                        <select id="agPaciente" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                            ${(state.pacientes || []).map(p => `<option value="${p.id}">${escapeHtml(p.nome)}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Profissional</label>
                        <select id="agProfissional" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                            ${(state.profissionais || []).map(p => `<option value="${p.id}">${escapeHtml(p.nome)} (${escapeHtml(p.consultorio)})</option>`).join('')}
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Horário</label>
                            <input type="time" id="agHora" value="14:00" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                        </div>
                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Valor (R$)</label>
                            <input type="number" id="agValor" value="250" min="0" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                        </div>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Procedimento / Tipo</label>
                        <input type="text" id="agTipo" required placeholder="Ex: Avaliação de Implante" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    </div>
                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" onclick="closePortalModal()" class="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl">Cancelar</button>
                        <button type="submit" class="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md">Salvar na Agenda</button>
                    </div>
                </form>
            </div>
        `);
    };

    window.salvarNovoAgendamento = async function (e) {
        e.preventDefault();
        const pacienteId = Number(document.getElementById('agPaciente').value);
        const profissionalId = Number(document.getElementById('agProfissional').value);
        const hora = document.getElementById('agHora').value;
        const valor = Number(document.getElementById('agValor').value || 0);
        const tipo = document.getElementById('agTipo').value.trim();

        const novo = { id: Date.now(), pacienteId, profissionalId, data: new Date().toISOString().slice(0, 10), hora, tipo, status: 'Agendado', valor };
        state.agendamentos.push(novo);
        saveLocalState();
        closePortalModal();
        renderAgenda();
        try {
            await fetch('/api/agendamentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novo)
            });
        } catch (_) {}
        showToast('Agendamento criado', `${tipo} marcado para às ${hora}.`, 'success');
    };

    // ------------------------------------------------------------------
    // 5. KANBAN PERSISTENTE + ORÇAMENTADOR CLÍNICO
    // ------------------------------------------------------------------
    function enhanceKanban() {
        const view = document.getElementById('view-leads');
        if (!view) return;

        // Restaurar cards extras criados pelo usuário
        const colNovos = document.getElementById('col-novos');
        if (colNovos && state.extraLeads.length) {
            state.extraLeads.forEach(lead => {
                if (!document.getElementById(lead.id)) {
                    const div = document.createElement('div');
                    div.id = lead.id;
                    div.draggable = true;
                    div.setAttribute('ondragstart', `iniciarDrag(event, '${lead.id}')`);
                    div.className = 'bg-[#F6F7FB] hover:bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing transition';
                    div.innerHTML = `
                        <div class="flex items-center justify-between text-[11px] mb-1.5">
                            <span class="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">${escapeHtml(lead.tratamento)}</span>
                            <span class="text-slate-400">Salvo</span>
                        </div>
                        <div class="font-bold text-xs text-slate-900">${escapeHtml(lead.nome)}</div>
                        <div class="text-[11px] text-slate-500 mt-1">Tel: ${escapeHtml(lead.telefone)}</div>
                        <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/70">
                            <span class="text-xs font-extrabold text-brand-700">${formatBRL(lead.valor)}</span>
                            <div class="flex gap-1.5">
                                <button type="button" onclick="abrirOrcamentador('${escapeHtml(lead.nome)}')" class="text-[11px] bg-brand-50 text-brand-700 font-bold px-2 py-1 rounded-lg">Orçamento</button>
                                <button type="button" onclick="chamarWhatsAppLead('${escapeHtml(lead.nome)}')" class="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded-lg">Chat</button>
                            </div>
                        </div>
                    `;
                    colNovos.appendChild(div);
                }
            });
        }

        // Restaurar movimentações de colunas salvas
        Object.entries(state.kanbanMoves || {}).forEach(([cardId, colId]) => {
            const card = document.getElementById(cardId);
            const col = document.getElementById(colId);
            if (card && col && card.parentElement.id !== colId) {
                col.appendChild(card);
            }
        });

        // Adicionar botão de Orçamentador em todos os cards que ainda não têm
        view.querySelectorAll('[draggable="true"]').forEach(card => {
            if (card.dataset.budgetWired) return;
            card.dataset.budgetWired = '1';
            const nomeEl = card.querySelector('.font-bold.text-xs.text-slate-900');
            const nome = nomeEl ? nomeEl.textContent.trim() : 'Paciente';
            const footer = card.querySelector('.border-t');
            if (footer && !footer.querySelector('[data-open-budget]')) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.dataset.openBudget = '1';
                btn.className = 'text-[11px] bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold px-2 py-1 rounded-lg transition';
                btn.textContent = 'Orçamento';
                btn.onclick = (ev) => { ev.stopPropagation(); abrirOrcamentador(nome); };
                footer.appendChild(btn);
            }
        });

        if (typeof window.atualizarContadoresKanban === 'function') window.atualizarContadoresKanban();
    }

    const origSoltarLead = window.soltarLead;
    window.soltarLead = function (ev, destinoId) {
        if (origSoltarLead) origSoltarLead(ev, destinoId);
        const cardId = ev.dataTransfer?.getData('text');
        if (cardId) {
            state.kanbanMoves[cardId] = destinoId;
            saveLocalState();
            showToast('Funil atualizado', 'Oportunidade movida e salva automaticamente.', 'success');
        }
    };

    window.adicionarLeadSubmit = function (e) {
        e.preventDefault();
        const nome = document.getElementById('leadNomeInput').value.trim();
        const tel = document.getElementById('leadTelefoneInput').value.trim();
        const trat = document.getElementById('leadTratamentoInput').value;
        const valor = Number(document.getElementById('leadValorInput').value || 0);
        const id = 'card-' + Date.now();
        state.extraLeads.push({ id, nome, telefone: tel, tratamento: trat, valor });
        saveLocalState();
        if (typeof window.fecharModalNovoLead === 'function') window.fecharModalNovoLead();
        enhanceKanban();
        window.trocarAba('leads');
        e.target.reset();
        showToast('Nova oportunidade criada', `${nome} adicionado ao funil de tratamentos.`, 'success');
    };

    window.abrirOrcamentador = function (pacienteNome) {
        const saved = state.orcamentos[pacienteNome] || { itens: ['implante'], desconto: 10, parcelas: 10 };
        openModal(`
            <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                        <h3 class="font-bold text-slate-900 text-sm">Orçamentador Clínico · ${escapeHtml(pacienteNome)}</h3>
                        <p class="text-[11px] text-slate-500">Monte o plano de tratamento, aplique desconto e envie para assinatura OTP</p>
                    </div>
                    <button type="button" onclick="closePortalModal()" class="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
                </div>
                <div class="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs" id="orcProcsList">
                    ${PROCEDURES.map(p => `
                        <label class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <span class="flex items-center gap-2 font-medium text-slate-800">
                                <input type="checkbox" value="${p.id}" data-price="${p.valor}" ${saved.itens.includes(p.id) ? 'checked' : ''} onchange="recalcOrcamento()" class="rounded text-brand-600">
                                ${escapeHtml(p.nome)}
                            </span>
                            <span class="font-bold text-slate-900">${formatBRL(p.valor)}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="grid grid-cols-2 gap-3 text-xs">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Desconto (%)</label>
                        <input type="number" id="orcDesconto" value="${saved.desconto}" min="0" max="50" oninput="recalcOrcamento()" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2">
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Parcelas (sem juros)</label>
                        <select id="orcParcelas" onchange="recalcOrcamento()" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2">
                            ${[1, 3, 6, 10, 12].map(n => `<option value="${n}" ${saved.parcelas === n ? 'selected' : ''}>${n}x</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                    <div>
                        <div class="text-[11px] font-bold text-brand-700 uppercase">Total do Plano</div>
                        <div id="orcTotalTexto" class="text-xl font-black text-slate-900">R$ 0,00</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[11px] text-slate-500">Parcelamento</div>
                        <div id="orcParcelaTexto" class="text-xs font-bold text-brand-700">10x de R$ 0,00</div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-end gap-2 pt-1">
                    <button type="button" onclick="salvarOrcamento('${escapeHtml(pacienteNome)}', false)" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl">Salvar Orçamento</button>
                    <button type="button" onclick="salvarOrcamento('${escapeHtml(pacienteNome)}', true)" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md">Enviar p/ DocSign (OTP)</button>
                </div>
            </div>
        `);
        window.recalcOrcamento();
    };

    window.recalcOrcamento = function () {
        const checks = document.querySelectorAll('#orcProcsList input[type="checkbox"]:checked');
        let bruto = 0;
        checks.forEach(c => bruto += Number(c.dataset.price || 0));
        const desc = Number(document.getElementById('orcDesconto')?.value || 0);
        const parc = Number(document.getElementById('orcParcelas')?.value || 1);
        const total = Math.max(0, bruto * (1 - desc / 100));
        const totalEl = document.getElementById('orcTotalTexto');
        const parcEl = document.getElementById('orcParcelaTexto');
        if (totalEl) totalEl.textContent = formatBRL(total);
        if (parcEl) parcEl.textContent = `${parc}x de ${formatBRL(total / parc)}`;
    };

    window.salvarOrcamento = function (pacienteNome, irDocSign) {
        const itens = Array.from(document.querySelectorAll('#orcProcsList input[type="checkbox"]:checked')).map(c => c.value);
        const desconto = Number(document.getElementById('orcDesconto')?.value || 0);
        const parcelas = Number(document.getElementById('orcParcelas')?.value || 1);
        state.orcamentos[pacienteNome] = { itens, desconto, parcelas };
        saveLocalState();
        closePortalModal();
        showToast('Plano de tratamento salvo', `Orçamento de ${pacienteNome} atualizado (${itens.length} procedimento(s)).`, 'success');
        if (irDocSign) window.trocarAba('docsign');
    };

    // ------------------------------------------------------------------
    // 6. PACIENTES, PRONTUÁRIO, ODONTOGRAMA & PRESCRIÇÃO DIGITAL
    // ------------------------------------------------------------------
    function renderPacientes() {
        const container = document.getElementById('view-pacientes');
        if (!container) return;

        const list = (state.pacientes || []).filter(p => {
            if (!state.pacienteSearch) return true;
            const q = state.pacienteSearch.toLowerCase();
            return p.nome.toLowerCase().includes(q) || (p.cpf || '').includes(q) || (p.convenio || '').toLowerCase().includes(q);
        });

        container.innerHTML = `
            <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 class="font-bold text-sm text-slate-900">Pacientes, Prontuário & Odontograma</h3>
                        <p class="text-xs text-slate-500">Acesse o odontograma interativo e emita prescrições digitais com QR Code</p>
                    </div>
                    <div class="relative w-full sm:w-64">
                        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
                        <input id="pacSearchInput" type="text" value="${escapeHtml(state.pacienteSearch)}" placeholder="Buscar nome, CPF ou convênio..." class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500">
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead>
                            <tr class="text-slate-400 border-b border-slate-100">
                                <th class="py-2.5">Paciente</th>
                                <th>Telefone / WhatsApp</th>
                                <th>Convênio</th>
                                <th>Nascimento</th>
                                <th class="text-right">Ações Clínicas</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700">
                            ${list.map(p => `
                                <tr>
                                    <td class="py-3 font-bold text-slate-900">${escapeHtml(p.nome)}<div class="text-[10px] font-normal text-slate-400">CPF: ${escapeHtml(p.cpf || '—')}</div></td>
                                    <td>${escapeHtml(p.telefone)}</td>
                                    <td><span class="px-2 py-0.5 rounded-md bg-slate-100 font-semibold">${escapeHtml(p.convenio)}</span></td>
                                    <td>${escapeHtml(p.nascimento || '—')}</td>
                                    <td class="text-right space-x-2">
                                        <button type="button" onclick="abrirProntuario(${p.id})" class="px-2.5 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold">Prontuário & Odontograma</button>
                                        <button type="button" onclick="chamarWhatsAppLead('${escapeHtml(p.nome)}')" class="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold">Chat</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.querySelector('#pacSearchInput')?.addEventListener('input', (e) => {
            state.pacienteSearch = e.target.value;
            renderPacientes();
            document.getElementById('pacSearchInput')?.focus();
        });
        if (window.lucide) lucide.createIcons({ nodes: [container] });
    }

    function buildPseudoQrSvg(hash) {
        const size = 7;
        let rects = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const code = hash.charCodeAt((r * size + c) % hash.length);
                const corner = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
                if (corner || code % 2 === 0) {
                    rects += `<rect x="${c * 10 + 5}" y="${r * 10 + 5}" width="8" height="8" rx="1.5" fill="#0f172a"/>`;
                }
            }
        }
        return `<svg viewBox="0 0 80 80" class="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200">${rects}</svg>`;
    }

    window.abrirProntuario = function (pacienteId) {
        const pac = (state.pacientes || []).find(p => p.id === pacienteId) || { id: pacienteId, nome: 'Paciente' };
        const map = state.odontogramas[pac.id] || {};
        const sup = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
        const inf = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
        const rxList = (state.prescricoes || []).filter(rx => rx.paciente === pac.nome);

        const renderTooth = (n) => {
            const st = TOOTH_STATES.find(s => s.key === (map[n] || 'saudavel')) || TOOTH_STATES[0];
            return `<button type="button" onclick="ciclarDente(${pac.id}, ${n})" title="Dente ${n}: ${st.label}" class="w-7 h-8 rounded-lg border text-[10px] transition ${st.bg}">${n}</button>`;
        };

        openModal(`
            <div class="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                        <h3 class="font-bold text-slate-900 text-sm">Prontuário Digital · ${escapeHtml(pac.nome)}</h3>
                        <p class="text-[11px] text-slate-500">Clique nos dentes para alterar o status clínico ou emita uma receita digital com QR Code</p>
                    </div>
                    <button type="button" onclick="closePortalModal()" class="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
                </div>

                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="text-xs font-bold text-slate-800">Odontograma Interativo (FDI)</span>
                        <div class="flex flex-wrap gap-1.5 text-[10px]">
                            ${TOOTH_STATES.map(s => `<span class="px-2 py-0.5 rounded border ${s.bg}">${s.label}</span>`).join('')}
                        </div>
                    </div>
                    <div class="flex flex-wrap justify-center gap-1">${sup.map(renderTooth).join('')}</div>
                    <div class="flex flex-wrap justify-center gap-1">${inf.map(renderTooth).join('')}</div>
                </div>

                <form onsubmit="emitirPrescricao(event, '${escapeHtml(pac.nome)}')" class="p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <div class="font-bold text-slate-900">Nova Prescrição Digital (Padrão CFM / ICP-Brasil)</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input type="text" id="rxMed" required placeholder="Medicamento (Ex: Amoxicilina 500mg)" class="bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                        <input type="text" id="rxPos" required placeholder="Posologia (Ex: 1 comp. de 8/8h por 7 dias)" class="bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    </div>
                    <button type="submit" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl">Emitir Receita com QR Code</button>
                </form>

                ${rxList.length ? `
                    <div class="space-y-2">
                        <div class="text-xs font-bold text-slate-700">Prescrições Emitidas</div>
                        ${rxList.map(rx => `
                            <div class="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                                <div>
                                    <div class="font-bold text-slate-900">${escapeHtml(rx.id)} · ${escapeHtml(rx.data)}</div>
                                    <div class="text-slate-600">${(rx.medicamentos || []).map(m => `${escapeHtml(m.nome)} — ${escapeHtml(m.posologia)}`).join(' | ')}</div>
                                    <div class="text-[10px] text-emerald-700 font-semibold mt-0.5">Hash: ${escapeHtml(rx.hashValidacao)}</div>
                                </div>
                                ${buildPseudoQrSvg(rx.hashValidacao || rx.id)}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `);
    };

    window.ciclarDente = function (pacId, num) {
        if (!state.odontogramas[pacId]) state.odontogramas[pacId] = {};
        const cur = state.odontogramas[pacId][num] || 'saudavel';
        const idx = TOOTH_STATES.findIndex(s => s.key === cur);
        const next = TOOTH_STATES[(idx + 1) % TOOTH_STATES.length];
        state.odontogramas[pacId][num] = next.key;
        saveLocalState();
        abrirProntuario(pacId);
    };

    window.emitirPrescricao = async function (e, pacienteNome) {
        e.preventDefault();
        const nome = document.getElementById('rxMed').value.trim();
        const posologia = document.getElementById('rxPos').value.trim();
        const payload = {
            paciente: pacienteNome,
            medico: 'Dra. Juliana Mendes',
            crm: 'CRO/SP 88.421',
            medicamentos: [{ nome, posologia }]
        };
        let created = {
            id: 'RX-' + Math.floor(1000 + Math.random() * 9000),
            ...payload,
            data: new Date().toLocaleDateString('pt-BR'),
            hashValidacao: Math.random().toString(36).substring(2, 14)
        };
        try {
            const res = await fetch('/api/prescricoes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (res.ok) created = await res.json();
        } catch (_) {}
        state.prescricoes.unshift(created);
        saveLocalState();
        const pac = (state.pacientes || []).find(p => p.nome === pacienteNome);
        if (pac) abrirProntuario(pac.id);
        showToast('Prescrição emitida', `Receita ${created.id} assinada com QR Code de validação.`, 'success');
    };

    // ------------------------------------------------------------------
    // 7. FINANCEIRO & EMISSÃO DE NFS-E (/api/nfse)
    // ------------------------------------------------------------------
    function renderFinanceiro() {
        const container = document.getElementById('view-financeiro');
        if (!container) return;

        const items = state.financeiro || [];
        const receitas = items.filter(i => i.tipo === 'receita').reduce((s, i) => s + Number(i.valor || 0), 0);
        const despesas = items.filter(i => i.tipo === 'despesa').reduce((s, i) => s + Number(i.valor || 0), 0);
        const saldo = receitas - despesas;
        const repasse = receitas * 0.35;

        container.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm">
                    <div class="text-xs font-semibold text-slate-400">Receitas Totais</div>
                    <div class="text-2xl font-extrabold text-emerald-600 mt-1">${formatBRL(receitas)}</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm">
                    <div class="text-xs font-semibold text-slate-400">Despesas Operacionais</div>
                    <div class="text-2xl font-extrabold text-rose-600 mt-1">${formatBRL(despesas)}</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm">
                    <div class="text-xs font-semibold text-slate-400">Saldo Líquido</div>
                    <div class="text-2xl font-extrabold text-slate-900 mt-1">${formatBRL(saldo)}</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm">
                    <div class="text-xs font-semibold text-slate-400">Repasse Profissionais (35%)</div>
                    <div class="text-2xl font-extrabold text-brand-700 mt-1">${formatBRL(repasse)}</div>
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 class="font-bold text-sm text-slate-900">Fluxo de Caixa & Notas Fiscais (NFS-e)</h3>
                        <p class="text-xs text-slate-500">Movimentações clínicas e emissão fiscal integrada</p>
                    </div>
                    <button type="button" onclick="abrirModalNFSe()" class="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5">
                        <i data-lucide="receipt" class="w-4 h-4"></i><span>Emitir NFS-e</span>
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead>
                            <tr class="text-slate-400 border-b border-slate-100">
                                <th class="py-2">Descrição</th>
                                <th>Categoria</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th class="text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${items.map(i => `
                                <tr>
                                    <td class="py-3 font-bold text-slate-900">${escapeHtml(i.descricao)}</td>
                                    <td class="text-slate-500">${escapeHtml(i.categoria)}</td>
                                    <td class="text-slate-500">${escapeHtml(i.data)}</td>
                                    <td><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${i.tipo === 'receita' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">${escapeHtml(i.status)}</span></td>
                                    <td class="text-right font-bold ${i.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'}">${i.tipo === 'receita' ? '+' : '-'} ${formatBRL(i.valor)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons({ nodes: [container] });
    }

    window.abrirModalNFSe = function () {
        openModal(`
            <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 class="font-bold text-slate-900 text-sm">Emitir Nota Fiscal de Serviço (NFS-e)</h3>
                    <button type="button" onclick="closePortalModal()" class="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
                </div>
                <form onsubmit="emitirNFSeSubmit(event)" class="space-y-3 text-xs">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Tomador (Paciente)</label>
                        <select id="nfPaciente" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                            ${(state.pacientes || []).map(p => `<option value="${escapeHtml(p.nome)}">${escapeHtml(p.nome)}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Serviço Prestado</label>
                        <input type="text" id="nfDesc" required value="Atendimento Odontológico Especializado" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Valor da Nota (R$)</label>
                        <input type="number" id="nfValor" required value="450" min="1" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    </div>
                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" onclick="closePortalModal()" class="px-4 py-2 text-slate-500 font-bold rounded-xl hover:bg-slate-100">Cancelar</button>
                        <button type="submit" class="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl">Transmitir NFS-e</button>
                    </div>
                </form>
            </div>
        `);
    };

    window.emitirNFSeSubmit = async function (e) {
        e.preventDefault();
        const paciente = document.getElementById('nfPaciente').value;
        const servico = document.getElementById('nfDesc').value.trim();
        const valor = Number(document.getElementById('nfValor').value || 0);
        let nota = { numeroNota: 'NF-' + Math.floor(10000 + Math.random() * 90000), codigoVerificacao: 'A9F2-88C1' };
        try {
            const res = await fetch('/api/nfse', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paciente, servico, valor }) });
            if (res.ok) nota = await res.json();
        } catch (_) {}
        state.financeiro.unshift({
            id: Date.now(),
            tipo: 'receita',
            descricao: `${nota.numeroNota || 'NFS-e'} · ${servico} (${paciente})`,
            valor,
            data: new Date().toLocaleDateString('pt-BR'),
            categoria: 'NFS-e Emitida',
            status: 'Recebido'
        });
        saveLocalState();
        closePortalModal();
        renderFinanceiro();
        showToast('NFS-e emitida com sucesso', `Nota ${nota.numeroNota} · Cód. Verificação: ${nota.codigoVerificacao}`, 'success');
    };

    // ------------------------------------------------------------------
    // 8. PAINEL TV & SALA DE ESPERA COM VOZ
    // ------------------------------------------------------------------
    function renderPainelTV() {
        const container = document.getElementById('view-painel-tv');
        if (!container) return;
        const atual = (state.painelChamadas || [])[0] || { paciente: 'José Fernando Oliveira', consultorio: 'Consultório 02', profissional: 'Dra. Juliana Mendes', hora: '09:15' };

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div class="lg:col-span-2 bg-[#0A0F1F] text-white rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-xl flex flex-col justify-between min-h-[300px]">
                    <div class="flex items-center justify-between text-xs text-slate-400">
                        <span class="flex items-center gap-2 font-bold text-emerald-400"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> PAINEL DE CHAMADA AO VIVO</span>
                        <span>${escapeHtml(state.unidade)}</span>
                    </div>
                    <div class="py-8">
                        <div class="text-xs uppercase tracking-widest text-brand-400 font-bold">Paciente Chamado</div>
                        <div class="text-3xl sm:text-4xl font-black mt-2 tracking-tight">${escapeHtml(atual.paciente)}</div>
                        <div class="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-brand-600/20 border border-brand-500/40 text-brand-200 font-bold text-sm">
                            <i data-lucide="door-open" class="w-4 h-4"></i>
                            <span>${escapeHtml(atual.consultorio)} · ${escapeHtml(atual.profissional)}</span>
                        </div>
                    </div>
                    <div class="pt-4 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
                        <span>Última chamada às ${escapeHtml(atual.hora)}</span>
                        <span>Sintetizador de voz Web Speech ativo</span>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm space-y-4">
                    <h3 class="font-bold text-sm text-slate-900">Acionar Chamada na Recepção</h3>
                    <form onsubmit="acionarChamadaForm(event)" class="space-y-3 text-xs">
                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Paciente</label>
                            <select id="tvPaciente" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                                ${(state.pacientes || []).map(p => `<option value="${escapeHtml(p.nome)}">${escapeHtml(p.nome)}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Consultório</label>
                            <select id="tvConsultorio" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                                <option>Consultório 01</option>
                                <option selected>Consultório 02</option>
                                <option>Consultório 03</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Profissional</label>
                            <select id="tvProfissional" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                                ${(state.profissionais || []).map(p => `<option value="${escapeHtml(p.nome)}">${escapeHtml(p.nome)}</option>`).join('')}
                            </select>
                        </div>
                        <button type="submit" class="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                            <i data-lucide="volume-2" class="w-4 h-4"></i><span>Chamar Paciente com Voz</span>
                        </button>
                    </form>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons({ nodes: [container] });
    }

    window.acionarChamadaForm = function (e) {
        e.preventDefault();
        chamarPacienteTV(
            document.getElementById('tvPaciente').value,
            document.getElementById('tvConsultorio').value,
            document.getElementById('tvProfissional').value
        );
    };

    window.chamarPacienteTV = async function (paciente, consultorio, profissional) {
        const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        state.painelChamadas.unshift({ id: Date.now(), paciente, consultorio, profissional, hora });
        state.painelChamadas = state.painelChamadas.slice(0, 6);
        saveLocalState();
        renderPainelTV();

        if ('speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(`${paciente}, por favor, dirija-se ao ${consultorio}.`);
                utter.lang = 'pt-BR';
                window.speechSynthesis.speak(utter);
            } catch (_) {}
        }

        try {
            await fetch('/api/chamar-paciente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paciente, consultorio, profissional })
            });
        } catch (_) {}
        showToast('Paciente chamado na TV', `${paciente} → ${consultorio}`, 'success');
    };

    // ------------------------------------------------------------------
    // 9. DOCSIGN & CONTRATOS COM VALIDAÇÃO OTP
    // ------------------------------------------------------------------
    let activeOtp = '';
    function renderDocSign() {
        const container = document.getElementById('view-docsign');
        if (!container) return;
        activeOtp = activeOtp || String(Math.floor(100000 + Math.random() * 900000));

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm space-y-4">
                    <div>
                        <h3 class="font-bold text-sm text-slate-900">Assinatura Digital na Tela (DocSign + OTP)</h3>
                        <p class="text-xs text-slate-500">Coleta de assinatura do paciente para TCLE e planos de tratamento</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <select id="dsPaciente" class="bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                            ${(state.pacientes || []).map(p => `<option value="${escapeHtml(p.nome)}">${escapeHtml(p.nome)}</option>`).join('')}
                        </select>
                        <input id="dsTitulo" type="text" value="Termo de Consentimento & Orçamento" class="bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                    </div>
                    <div>
                        <div class="flex items-center justify-between text-xs mb-1">
                            <span class="font-bold text-slate-700">Assine no quadro abaixo:</span>
                            <button type="button" onclick="limparCanvasDocSign()" class="text-rose-600 font-semibold hover:underline">Limpar</button>
                        </div>
                        <canvas id="docSignCanvas" width="460" height="150" class="w-full h-36 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl cursor-crosshair touch-none"></canvas>
                    </div>
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs">
                        <div class="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold">OTP: ${activeOtp}</div>
                        <input id="dsOtpInput" type="text" maxlength="6" placeholder="Digite o código OTP" class="flex-1 bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono">
                        <button type="button" onclick="assinarDocSign()" class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl">Validar & Assinar</button>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-[#E4E8F3] shadow-sm space-y-3">
                    <h3 class="font-bold text-sm text-slate-900">Documentos Assinados</h3>
                    <div class="divide-y divide-slate-100 text-xs">
                        ${(state.contratos || []).map(c => `
                            <div class="py-3 flex items-center justify-between gap-2">
                                <div>
                                    <div class="font-bold text-slate-900">${escapeHtml(c.titulo)}</div>
                                    <div class="text-slate-500">${escapeHtml(c.paciente)} · ${escapeHtml(c.data)} · OTP ${escapeHtml(c.otp)}</div>
                                </div>
                                <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">${escapeHtml(c.status)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        initSignatureCanvas();
    }

    function initSignatureCanvas() {
        const canvas = document.getElementById('docSignCanvas');
        if (!canvas || canvas.dataset.wired) return;
        canvas.dataset.wired = '1';
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#1e1b4b';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        let drawing = false;

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const pt = e.touches ? e.touches[0] : e;
            return { x: (pt.clientX - rect.left) * (canvas.width / rect.width), y: (pt.clientY - rect.top) * (canvas.height / rect.height) };
        };
        const start = (e) => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
        const move = (e) => { if (!drawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        const end = () => { drawing = false; };

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', move);
        window.addEventListener('mouseup', end);
        canvas.addEventListener('touchstart', start, { passive: false });
        canvas.addEventListener('touchmove', move, { passive: false });
        canvas.addEventListener('touchend', end);
    }

    window.limparCanvasDocSign = function () {
        const c = document.getElementById('docSignCanvas');
        if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
    };

    window.assinarDocSign = function () {
        const otp = document.getElementById('dsOtpInput')?.value.trim();
        if (otp !== activeOtp) {
            showToast('Código OTP inválido', `Informe o código ${activeOtp} para validar a assinatura.`, 'error');
            return;
        }
        const paciente = document.getElementById('dsPaciente')?.value || 'Paciente';
        const titulo = document.getElementById('dsTitulo')?.value.trim() || 'TCLE Clínico';
        state.contratos.unshift({
            id: 'DOC-' + Math.floor(100 + Math.random() * 900),
            paciente,
            titulo,
            otp,
            data: new Date().toLocaleDateString('pt-BR'),
            status: 'Assinado via OTP'
        });
        activeOtp = String(Math.floor(100000 + Math.random() * 900000));
        saveLocalState();
        renderDocSign();
        showToast('Documento assinado', `${titulo} validado com sucesso para ${paciente}.`, 'success');
    };

    // ------------------------------------------------------------------
    // BOOTSTRAP
    // ------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        loadLocalState();
        const unitEl = document.getElementById('topbarClinicaNome');
        if (unitEl) unitEl.textContent = state.unidade;
        setupDashboardControls();
        syncBackendData();
    });
})();
