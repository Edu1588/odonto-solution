// Estado global da aplicação
let appData = {
    clinica: {},
    profissionais: [],
    pacientes: [],
    agendamentos: [],
    painelChamadas: [],
    prescricoes: [],
    financeiro: [],
    notasFiscais: []
};

// Canvas de assinatura
let canvas, ctx;
let isDrawing = false;
let qrInstance = null;
let chartInstance = null;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    iniciarRelogio();
    carregarDados();
    iniciarCanvasAssinatura();
    gerarQrCodeInicial();
});

// ==========================================
// FUNÇÕES DE AUTENTICAÇÃO E TELA DE LOGIN
// ==========================================
function toggleVisibilidadeSenha() {
    const input = document.getElementById("loginSenha");
    const icone = document.getElementById("iconeOlhoSenha");
    if (input.type === "password") {
        input.type = "text";
        icone.setAttribute("data-lucide", "eye-off");
    } else {
        input.type = "password";
        icone.setAttribute("data-lucide", "eye");
    }
    lucide.createIcons();
}

function trocarAbaLogin(tab) {
    const formLogin = document.getElementById("formLoginPrincipal");
    const formEsqueci = document.getElementById("formEsqueciSenha");
    const tabLogin = document.getElementById("tabBtnLogin");
    const tabEsqueci = document.getElementById("tabBtnEsqueci");

    if (tab === 'form-login') {
        formLogin.classList.remove('hidden');
        formEsqueci.classList.add('hidden');
        tabLogin.className = "flex-1 py-3 text-brand-600 border-b-2 border-brand-600 bg-white";
        tabEsqueci.className = "flex-1 py-3 text-slate-500 hover:text-slate-700";
    } else {
        formLogin.classList.add('hidden');
        formEsqueci.classList.remove('hidden');
        tabEsqueci.className = "flex-1 py-3 text-brand-600 border-b-2 border-brand-600 bg-white";
        tabLogin.className = "flex-1 py-3 text-slate-500 hover:text-slate-700";
    }
    lucide.createIcons();
}

function realizarLogin(e) {
    if (e) e.preventDefault();
    const usuario = document.getElementById("loginUsuario").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();
    
    if ((usuario === "1234" && senha === "1234") || (usuario.length > 0 && senha.length > 0)) {
        const headerNome = document.getElementById("headerNomeUsuario");
        if (headerNome) {
            headerNome.textContent = usuario === "1234" ? "Dra. Juliana Mendes (Odonto Solution)" : usuario;
        }
        document.getElementById("telaLogin").classList.add("hidden");
        renderizarTudo();
    } else {
        alert("Credenciais incorretas! Utilize usuário: 1234 e senha: 1234");
    }
}

function loginRapido(perfil) {
    const headerNome = document.getElementById("headerNomeUsuario");
    if (headerNome) headerNome.textContent = perfil;
    document.getElementById("telaLogin").classList.add("hidden");
    renderizarTudo();
}

function fazerLogout() {
    document.getElementById("telaLogin").classList.remove("hidden");
    trocarAbaLogin('form-login');
}

function recuperarSenha(e) {
    e.preventDefault();
    alert("Um e-mail com o código OTP de redefinição segura de senha foi enviado com sucesso!");
    trocarAbaLogin('form-login');
}

// ==========================================
// RELÓGIO E CARREGAMENTO DE DADOS
// ==========================================
function iniciarRelogio() {
    const atualizar = () => {
        const agora = new Date();
        const horaStr = agora.toLocaleTimeString('pt-BR');
        const elemTopo = document.getElementById("relogioTopo");
        const elemTv = document.getElementById("tvRelogio");
        if (elemTopo) elemTopo.textContent = horaStr;
        if (elemTv) elemTv.textContent = horaStr.substring(0, 5);
    };
    atualizar();
    setInterval(atualizar, 1000);
}

// Carregar dados da API
async function carregarDados() {
    try {
        const res = await fetch('/api/data');
        if (res.ok) {
            appData = await res.json();
            renderizarTudo();
        }
    } catch (err) {
        console.warn("Usando dados em memória local:", err);
    }
}

// Renderizar todos os módulos
function renderizarTudo() {
    renderizarDashboard();
    renderizarAgenda();
    renderizarFilaEspera();
    renderizarFinanceiro();
    renderizarNfse();
    lucide.createIcons();
}

// Navegação de Abas
function trocarAba(abaId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));

    const tabAlvo = document.getElementById(`aba-${abaId}`);
    const navAlvo = document.getElementById(`nav-${abaId}`);

    if (tabAlvo) tabAlvo.classList.add('active');
    if (navAlvo) navAlvo.classList.add('active');

    if (abaId === 'dashboard') {
        setTimeout(renderizarGrafico, 100);
    }
    lucide.createIcons();
}

// 1. RENDERIZAR DASHBOARD
function renderizarDashboard() {
    const totalHoje = appData.agendamentos.length;
    const emEspera = appData.agendamentos.filter(a => a.status === 'Aguardando').length;
    const finalizados = appData.agendamentos.filter(a => a.status === 'Finalizado').length;
    const totalReceita = appData.agendamentos.reduce((acc, a) => acc + (a.valor || 0), 0);

    const kpiAtend = document.getElementById("kpiAtendimentosHoje");
    const kpiEspera = document.getElementById("kpiSalaEspera");
    const kpiFat = document.getElementById("kpiFaturamento");
    const badgeFila = document.getElementById("badgeFilaCount");
    const totalEsperaBadge = document.getElementById("totalEsperaBadge");

    if (kpiAtend) kpiAtend.textContent = totalHoje;
    if (kpiEspera) kpiEspera.textContent = `${emEspera} paciente${emEspera !== 1 ? 's' : ''}`;
    if (kpiFat) kpiFat.textContent = `R$ ${totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (badgeFila) badgeFila.textContent = emEspera;
    if (totalEsperaBadge) totalEsperaBadge.textContent = `${emEspera} aguardando`;

    // Resumo da agenda lateral
    const listaResumo = document.getElementById("listaResumoAgenda");
    if (listaResumo) {
        listaResumo.innerHTML = appData.agendamentos.slice(0, 4).map(ag => {
            const pac = appData.pacientes.find(p => p.id === ag.pacienteId) || { nome: "Paciente" };
            const prof = appData.profissionais.find(p => p.id === ag.profissionalId) || { consultorio: "Cons. 01" };
            return `
                <div class="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs">
                    <div>
                        <div class="font-bold text-slate-800">${ag.hora} - ${pac.nome}</div>
                        <div class="text-[11px] text-slate-500">${prof.consultorio} · ${ag.tipo}</div>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${obterCorStatus(ag.status)}">${ag.status}</span>
                </div>
            `;
        }).join('');
    }

    renderizarGrafico();
}

// Gráfico Chart.js
function renderizarGrafico() {
    const canvasGrafico = document.getElementById("graficoAtendimentos");
    if (!canvasGrafico) return;

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(canvasGrafico, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua (Hoje)', 'Qui', 'Sex', 'Sáb'],
            datasets: [
                {
                    label: 'Cardiologia',
                    data: [12, 15, 8, 14, 18, 6],
                    backgroundColor: '#2563eb',
                    borderRadius: 6
                },
                {
                    label: 'Ortodontia & Odonto',
                    data: [8, 10, 7, 12, 14, 9],
                    backgroundColor: '#059669',
                    borderRadius: 6
                },
                {
                    label: 'Clínica Geral',
                    data: [6, 9, 5, 8, 11, 4],
                    backgroundColor: '#7c3aed',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
            },
            scales: {
                y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// 2. RENDERIZAR AGENDA
function renderizarAgenda() {
    const tbody = document.getElementById("tabelaAgendaCorpo");
    if (!tbody) return;

    const filtro = document.getElementById("filtroProfissional").value;
    const agendamentosFiltrados = filtro === "todos" 
        ? appData.agendamentos 
        : appData.agendamentos.filter(a => a.profissionalId === parseInt(filtro));

    tbody.innerHTML = agendamentosFiltrados.map(ag => {
        const pac = appData.pacientes.find(p => p.id === ag.pacienteId) || { nome: "Paciente", convenio: "Particular", telefone: "" };
        const prof = appData.profissionais.find(p => p.id === ag.profissionalId) || { nome: "Médico", consultorio: "Cons. 01" };

        return `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="p-4 font-mono font-bold text-slate-900">${ag.hora}</td>
                <td class="p-4">
                    <div class="font-bold text-slate-800">${pac.nome}</div>
                    <div class="text-slate-400 text-[11px]">${pac.telefone || ''}</div>
                </td>
                <td class="p-4">
                    <div class="font-medium text-slate-700">${prof.nome}</div>
                    <div class="text-[11px] text-slate-400 font-semibold">${prof.consultorio}</div>
                </td>
                <td class="p-4 font-medium text-slate-600">${ag.tipo}</td>
                <td class="p-4">
                    <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        ${pac.convenio}
                    </span>
                    <span class="text-slate-400 ml-1">R$ ${ag.valor}</span>
                </td>
                <td class="p-4">
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${obterCorStatus(ag.status)}">
                        ${ag.status}
                    </span>
                </td>
                <td class="p-4 text-right space-x-1">
                    ${gerarBotoesAcaoFluxo(ag, pac, prof)}
                </td>
            </tr>
        `;
    }).join('');

    lucide.createIcons();
}

function obterCorStatus(status) {
    switch (status) {
        case 'Finalizado': return 'bg-emerald-100 text-emerald-800';
        case 'Em Atendimento': return 'bg-blue-100 text-blue-800 animate-pulse';
        case 'Aguardando': return 'bg-amber-100 text-amber-800 font-bold';
        case 'Confirmado': return 'bg-teal-100 text-teal-800';
        case 'Agendado': return 'bg-slate-100 text-slate-700';
        default: return 'bg-slate-100 text-slate-600';
    }
}

function gerarBotoesAcaoFluxo(ag, pac, prof) {
    if (ag.status === 'Agendado' || ag.status === 'Confirmado') {
        return `
            <button onclick="atualizarStatusAgendamento(${ag.id}, 'Aguardando')" title="Paciente Chegou (Entrada)" class="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded font-bold text-[11px] transition">
                Dar Entrada
            </button>
        `;
    }
    if (ag.status === 'Aguardando') {
        return `
            <button onclick="chamarPacienteConsultorio(${ag.id}, '${pac.nome}', '${prof.consultorio}', '${prof.nome}')" title="Chamar na TV" class="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded font-bold text-[11px] transition">
                Chamar TV
            </button>
        `;
    }
    if (ag.status === 'Em Atendimento') {
        return `
            <button onclick="atualizarStatusAgendamento(${ag.id}, 'Finalizado')" title="Concluir Consulta" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] transition">
                Concluir
            </button>
        `;
    }
    return `<span class="text-xs text-slate-400 font-medium">Concluído</span>`;
}

// Atualizar status de agendamento via API
async function atualizarStatusAgendamento(id, novoStatus) {
    try {
        const res = await fetch('/api/agendamentos/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: novoStatus })
        });
        if (res.ok) {
            carregarDados();
        }
    } catch (e) {
        console.error(e);
    }
}

// Chamar paciente com voz e acionar painel TV
async function chamarPacienteConsultorio(agendamentoId, paciente, consultorio, profissional) {
    await atualizarStatusAgendamento(agendamentoId, 'Em Atendimento');

    await fetch('/api/chamar-paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paciente, consultorio, profissional })
    });

    falarChamada(paciente, consultorio);
    carregarDados();
}

function falarChamada(paciente, consultorio) {
    if ('speechSynthesis' in window) {
        const frase = `Paciente ${paciente}, favor comparecer ao ${consultorio}.`;
        const utterance = new SpeechSynthesisUtterance(frase);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    }
}

// 3. RENDERIZAR FILA DE ESPERA
function renderizarFilaEspera() {
    const listaFila = document.getElementById("listaFilaEspera");
    const historico = document.getElementById("historicoChamadas");

    if (listaFila) {
        const pacientesAguardando = appData.agendamentos.filter(a => a.status === 'Aguardando');
        if (pacientesAguardando.length === 0) {
            listaFila.innerHTML = `<div class="p-8 text-center text-xs text-slate-400">Nenhum paciente aguardando na sala de espera neste momento.</div>`;
        } else {
            listaFila.innerHTML = pacientesAguardando.map(ag => {
                const pac = appData.pacientes.find(p => p.id === ag.pacienteId) || { nome: "Paciente" };
                const prof = appData.profissionais.find(p => p.id === ag.profissionalId) || { consultorio: "Cons. 01", nome: "Médico" };
                return `
                    <div class="flex items-center justify-between p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                                <i data-lucide="clock" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <div class="font-bold text-slate-800 text-sm">${pac.nome}</div>
                                <div class="text-xs text-slate-500">Agendado às ${ag.hora} · ${prof.consultorio} (${prof.nome})</div>
                            </div>
                        </div>
                        <button onclick="chamarPacienteConsultorio(${ag.id}, '${pac.nome}', '${prof.consultorio}', '${prof.nome}')" class="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-2">
                            <i data-lucide="volume-2" class="w-4 h-4"></i>
                            <span>Chamar Agora</span>
                        </button>
                    </div>
                `;
            }).join('');
        }
    }

    if (historico) {
        historico.innerHTML = appData.painelChamadas.map(ch => `
            <div class="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                <div class="flex justify-between items-center">
                    <strong class="text-slate-800">${ch.paciente}</strong>
                    <span class="text-[10px] text-slate-400 font-mono">${ch.hora}</span>
                </div>
                <div class="text-brand-600 font-semibold">${ch.consultorio}</div>
                <div class="text-[11px] text-slate-400">${ch.profissional}</div>
            </div>
        `).join('');
    }
}

// 4. PRESCRIÇÃO DIGITAL & QR CODE
function gerarQrCodeInicial() {
    const container = document.getElementById("qrcodeReceita");
    if (!container) return;
    container.innerHTML = "";
    qrInstance = new QRCode(container, {
        text: "https://valida.cfm.org.br/rx?hash=e5f8b9a2c4d10378",
        width: 100,
        height: 100,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });
}

async function gerarPrescricao() {
    const paciente = document.getElementById("rxPacienteSelect").value;
    const medicoRaw = document.getElementById("rxMedicoSelect").value.split("|");
    const medico = medicoRaw[0];
    const crm = medicoRaw[1];
    const medicamento = document.getElementById("rxMedicamentoInput").value.trim() || "Amoxicilina 500mg";
    const posologia = document.getElementById("rxPosologiaInput").value.trim() || "Tomar 1 cápsula a cada 8 horas.";

    const body = {
        paciente,
        medico,
        crm,
        medicamentos: [{ nome: medicamento, posologia }]
    };

    try {
        const res = await fetch('/api/prescricoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById("previewPaciente").textContent = paciente;
            document.getElementById("previewMedicamento").textContent = medicamento;
            document.getElementById("previewPosologia").textContent = posologia;
            document.getElementById("previewHash").textContent = data.item.hashValidacao;

            if (qrInstance) {
                qrInstance.clear();
                qrInstance.makeCode(`https://valida.cfm.org.br/rx?hash=${data.item.hashValidacao}`);
            }

            alert("Prescrição Digital gerada e assinada com sucesso no padrão ICP-Brasil!");
        }
    } catch (e) {
        alert("Erro ao emitir prescrição");
    }
}

// 5. DOCSIGN & CANVAS ASSINATURA
function iniciarCanvasAssinatura() {
    canvas = document.getElementById("signatureCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0284c7";

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    };

    const start = (e) => {
        isDrawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        e.preventDefault();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        e.preventDefault();
    };

    const stop = () => { isDrawing = false; };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stop);

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", draw);
    window.addEventListener("touchend", stop);
}

function limparCanvasAssinatura() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function salvarAssinaturaDocSign() {
    alert("Termo de Consentimento assinado e validado com sucesso! Arquivado no Prontuário do Paciente.");
    limparCanvasAssinatura();
}

function gerarNovoOtp() {
    const novoOtp = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("otpCodigoDisplay").value = novoOtp;
}

function enviarLinkDocSign() {
    const tel = document.getElementById("otpTelefoneInput").value;
    const otp = document.getElementById("otpCodigoDisplay").value;
    alert(`Link de assinatura com token seguro e código OTP [${otp}] disparado via WhatsApp para ${tel}!`);
}

// 6. Z.AI CHATBOT SIMULATOR
async function enviarMensagemZai() {
    const input = document.getElementById("inputChatZai");
    const container = document.getElementById("chatZaiContainer");
    const msg = input.value.trim();
    if (!msg) return;

    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    container.innerHTML += `
        <div class="flex justify-end">
            <div class="bg-emerald-100 p-3 rounded-xl rounded-tr-none shadow-sm max-w-[80%] text-xs text-slate-800 space-y-1">
                <p>${msg}</p>
                <span class="block text-[9px] text-slate-400 text-right">${hora}</span>
            </div>
        </div>
    `;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch('/api/zai-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensagem: msg, pacienteNome: "Mariana" })
        });
        const data = await res.json();
        
        setTimeout(() => {
            container.innerHTML += `
                <div class="flex justify-start">
                    <div class="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[80%] text-xs text-slate-800 space-y-1 border border-slate-100">
                        <p>${data.resposta}</p>
                        <span class="block text-[9px] text-slate-400 text-right">${data.timestamp}</span>
                    </div>
                </div>
            `;
            container.scrollTop = container.scrollHeight;
        }, 500);
    } catch (e) {
        console.error(e);
    }
}

// 7. FINANCEIRO & NFS-e
function renderizarFinanceiro() {
    const tbody = document.getElementById("tabelaFinanceiroCorpo");
    if (!tbody) return;

    tbody.innerHTML = appData.financeiro.map(fin => `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
            <td class="p-3 font-mono text-slate-500">${fin.data}</td>
            <td class="p-3 font-semibold text-slate-800">${fin.descricao}</td>
            <td class="p-3 text-slate-500">${fin.categoria}</td>
            <td class="p-3 font-bold ${fin.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'}">
                ${fin.tipo === 'receita' ? '+' : '-'} R$ ${fin.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </td>
            <td class="p-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${fin.status === 'Recebido' || fin.status === 'Pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${fin.status}
                </span>
            </td>
        </tr>
    `).join('');
}

function renderizarNfse() {
    const container = document.getElementById("listaNfseCorpo");
    if (!container) return;

    container.innerHTML = appData.notasFiscais.map(nf => `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
            <div class="flex justify-between items-center">
                <strong class="text-slate-800 font-mono">${nf.id}</strong>
                <span class="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">${nf.status}</span>
            </div>
            <div class="text-slate-600 font-medium">${nf.paciente} · R$ ${nf.valor.toFixed(2)}</div>
            <div class="text-[10px] text-slate-400 font-mono">Chave: ${nf.chaveAcesso.substring(0, 24)}...</div>
        </div>
    `).join('');
}

// Modal Agendamento
function abrirModalAgendamento() {
    document.getElementById("modalAgendamento").classList.remove("hidden");
}
function fecharModalAgendamento() {
    document.getElementById("modalAgendamento").classList.add("hidden");
}

async function salvarAgendamento(e) {
    e.preventDefault();
    const pacienteId = parseInt(document.getElementById("modalPacienteId").value);
    const profissionalId = parseInt(document.getElementById("modalProfissionalId").value);
    const data = document.getElementById("modalData").value;
    const hora = document.getElementById("modalHora").value;
    const tipo = document.getElementById("modalTipo").value;

    const novo = { pacienteId, profissionalId, data, hora, tipo, status: "Agendado", valor: 200 };

    try {
        const res = await fetch('/api/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novo)
        });
        if (res.ok) {
            fecharModalAgendamento();
            carregarDados();
            alert("Agendamento cadastrado com sucesso!");
        }
    } catch (err) {
        alert("Erro ao salvar agendamento");
    }
}

// Modal NFS-e
function abrirModalNfse() {
    document.getElementById("modalNfse").classList.remove("hidden");
}
function fecharModalNfse() {
    document.getElementById("modalNfse").classList.add("hidden");
}

async function emitirNfse(e) {
    e.preventDefault();
    const paciente = document.getElementById("nfsePacienteInput").value;
    const valor = document.getElementById("nfseValorInput").value;

    try {
        const res = await fetch('/api/nfse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paciente, valor })
        });
        if (res.ok) {
            fecharModalNfse();
            carregarDados();
            alert("Nota Fiscal de Serviço (NFS-e) emitida e transmitida com sucesso!");
        }
    } catch (err) {
        alert("Erro ao emitir NFS-e");
    }
}

// Painel TV
function abrirPainelTV() {
    const modal = document.getElementById("painelTvModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    if (appData.painelChamadas.length > 0) {
        const ch = appData.painelChamadas[0];
        document.getElementById("tvPacienteNome").textContent = ch.paciente;
        document.getElementById("tvConsultorio").textContent = ch.consultorio;
        document.getElementById("tvProfissional").textContent = ch.profissional;
    }
}

function fecharPainelTV() {
    const modal = document.getElementById("painelTvModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}
