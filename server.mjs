import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Estado inicial em memória (simulando o banco do ERP)
let db = {
    clinica: {
        nome: "Odonto Solution - Clínica Matriz",
        cnpj: "12.345.678/0001-90",
        cidade: "São Paulo - SP",
        certificacao: "ISO 9001:2015"
    },
    profissionais: [
        { id: 1, nome: "Dr. Carlos Eduardo Rocha", especialidade: "Cardiologia", crm: "CRM/SP 142.890", consultorio: "Consultório 01", cor: "#2563eb" },
        { id: 2, nome: "Dra. Juliana Mendes", especialidade: "Ortodontia & Odontologia", cro: "CRO/SP 88.421", consultorio: "Consultório 02", cor: "#059669" },
        { id: 3, nome: "Dr. Roberto Albuquerque", especialidade: "Clínica Geral", crm: "CRM/SP 99.112", consultorio: "Consultório 03", cor: "#7c3aed" }
    ],
    pacientes: [
        { id: 1, nome: "Mariana Silva Santos", cpf: "123.456.789-00", telefone: "(11) 98765-4321", convenio: "Unimed", nascimento: "14/05/1990" },
        { id: 2, nome: "José Fernando Oliveira", cpf: "234.567.890-11", telefone: "(11) 97654-3210", convenio: "Bradesco Saúde", nascimento: "22/11/1982" },
        { id: 3, nome: "Beatriz Lima Castro", cpf: "345.678.901-22", telefone: "(11) 96543-2109", convenio: "Particular", nascimento: "08/03/1995" },
        { id: 4, nome: "Lucas Rodrigues Pereira", cpf: "456.789.012-33", telefone: "(11) 95432-1098", convenio: "Amil", nascimento: "30/09/2001" },
        { id: 5, nome: "Clara Mendes Antunes", cpf: "567.890.123-44", telefone: "(11) 94321-0987", convenio: "SulAmérica", nascimento: "19/07/1988" }
    ],
    agendamentos: [
        { id: 101, pacienteId: 1, profissionalId: 1, data: "2026-10-28", hora: "08:30", tipo: "Consulta de Retorno", status: "Finalizado", valor: 250 },
        { id: 102, pacienteId: 2, profissionalId: 2, data: "2026-10-28", hora: "09:15", tipo: "Manutenção de Aparelho", status: "Em Atendimento", valor: 180 },
        { id: 103, pacienteId: 3, profissionalId: 1, data: "2026-10-28", hora: "10:00", tipo: "Eletrocardiograma", status: "Aguardando", valor: 320 },
        { id: 104, pacienteId: 4, profissionalId: 3, data: "2026-10-28", hora: "10:45", tipo: "Check-up Clínico", status: "Confirmado", valor: 200 },
        { id: 105, pacienteId: 5, profissionalId: 2, data: "2026-10-28", hora: "11:30", tipo: "Limpeza & Profilaxia", status: "Agendado", valor: 150 }
    ],
    painelChamadas: [
        { id: 1, paciente: "José Fernando Oliveira", consultorio: "Consultório 02", profissional: "Dra. Juliana Mendes", hora: "09:15" }
    ],
    prescricoes: [
        {
            id: "RX-8842",
            paciente: "Mariana Silva Santos",
            medico: "Dr. Carlos Eduardo Rocha",
            crm: "CRM/SP 142.890",
            data: "28/10/2026",
            medicamentos: [
                { nome: "Losartana Potássica 50mg", posologia: "Tomar 1 comprimido pela manhã em jejum por 30 dias." },
                { nome: "Atenolol 25mg", posologia: "Tomar 1 comprimido às 18h se pressão superior a 14/9." }
            ],
            assinaturaDigital: "Assinado via ICP-Brasil / Padrão CFM (DocSign Integrado)",
            hashValidacao: "e5f8b9a2c4d10378e91f"
        }
    ],
    financeiro: [
        { id: 1, tipo: "receita", descricao: "Consulta de Retorno - Mariana Silva", valor: 250, data: "28/10/2026", categoria: "Consultas", status: "Recebido" },
        { id: 2, tipo: "receita", descricao: "Procedimento Odonto - José Fernando", valor: 180, data: "28/10/2026", categoria: "Odontologia", status: "Recebido" },
        { id: 3, tipo: "despesa", descricao: "Compra de Luvas e Máscaras (Marketplace)", valor: 340, data: "28/10/2026", categoria: "Insumos", status: "Pago" },
        { id: 4, tipo: "receita", descricao: "Faturamento Convênio Unimed Lote #442", valor: 4850, data: "27/10/2026", categoria: "Convênios TISS", status: "Em Aberto" },
        { id: 5, tipo: "despesa", descricao: "Licença Software Aplicativo.net & Z.AI", valor: 490, data: "25/10/2026", categoria: "Tecnologia", status: "Pago" }
    ],
    notasFiscais: [
        { id: "NF-1049", paciente: "Mariana Silva Santos", valor: 250, data: "28/10/2026", codigoVerificacao: "4A89-B7C1", chaveAcesso: "35261012345678000190550010000010491008432190", status: "Transmitida com Sucesso" }
    ]
};

// MIME Types
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // API Routes
    if (pathname.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        // GET /api/data - Retorna todo o estado do ERP
        if (pathname === '/api/data' && req.method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify(db));
            return;
        }

        // POST /api/agendamentos - Novo agendamento
        if (pathname === '/api/agendamentos' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const novoAgendamento = JSON.parse(body);
                    novoAgendamento.id = Date.now();
                    novoAgendamento.status = novoAgendamento.status || "Agendado";
                    db.agendamentos.push(novoAgendamento);
                    res.writeHead(201);
                    res.end(JSON.stringify({ success: true, item: novoAgendamento }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "JSON inválido" }));
                }
            });
            return;
        }

        // PUT /api/agendamentos/status - Atualiza status de agendamento
        if (pathname === '/api/agendamentos/status' && req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const { id, status } = JSON.parse(body);
                    const agendamento = db.agendamentos.find(a => a.id === id);
                    if (agendamento) {
                        agendamento.status = status;
                        
                        // Se chamou o paciente, atualiza o painel de chamadas da sala de espera
                        if (status === 'Em Atendimento' || status === 'Aguardando') {
                            const pac = db.pacientes.find(p => p.id === agendamento.pacienteId);
                            const prof = db.profissionais.find(p => p.id === agendamento.profissionalId);
                            if (pac && prof && status === 'Em Atendimento') {
                                const chamada = {
                                    id: Date.now(),
                                    paciente: pac.nome,
                                    consultorio: prof.consultorio,
                                    profissional: prof.nome,
                                    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                };
                                db.painelChamadas.unshift(chamada);
                                if (db.painelChamadas.length > 5) db.painelChamadas.pop();
                            }
                        }

                        res.writeHead(200);
                        res.end(JSON.stringify({ success: true, agendamento }));
                    } else {
                        res.writeHead(404);
                        res.end(JSON.stringify({ error: "Agendamento não encontrado" }));
                    }
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Erro ao processar requisição" }));
                }
            });
            return;
        }

        // POST /api/chamar-paciente - Aciona chamada no painel de TV da sala de espera
        if (pathname === '/api/chamar-paciente' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const { paciente, consultorio, profissional } = JSON.parse(body);
                    const chamada = {
                        id: Date.now(),
                        paciente,
                        consultorio,
                        profissional,
                        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    };
                    db.painelChamadas.unshift(chamada);
                    if (db.painelChamadas.length > 5) db.painelChamadas.pop();
                    res.writeHead(200);
                    res.end(JSON.stringify({ success: true, chamada }));
                } catch (e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Erro" }));
                }
            });
            return;
        }

        // POST /api/prescricoes - Cria nova prescrição digital
        if (pathname === '/api/prescricoes' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    const nova = {
                        id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
                        paciente: data.paciente,
                        medico: data.medico,
                        crm: data.crm || "CRM/SP 142.890",
                        data: new Date().toLocaleDateString('pt-BR'),
                        medicamentos: data.medicamentos || [],
                        assinaturaDigital: "Assinado Digitalmente ICP-Brasil (DocSign / Mevo Integration)",
                        hashValidacao: Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12)
                    };
                    db.prescricoes.unshift(nova);
                    res.writeHead(201);
                    res.end(JSON.stringify({ success: true, item: nova }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Erro ao criar receita" }));
                }
            });
            return;
        }

        // POST /api/nfse - Emite NFS-e
        if (pathname === '/api/nfse' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const { paciente, valor } = JSON.parse(body);
                    const nf = {
                        id: `NF-${Math.floor(1000 + Math.random() * 9000)}`,
                        paciente,
                        valor: Number(valor),
                        data: new Date().toLocaleDateString('pt-BR'),
                        codigoVerificacao: Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
                        chaveAcesso: "3526" + Math.floor(100000000000000000 + Math.random() * 900000000000000000).toString(),
                        status: "Transmitida com Sucesso"
                    };
                    db.notasFiscais.unshift(nf);
                    res.writeHead(201);
                    res.end(JSON.stringify({ success: true, item: nf }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Erro ao emitir NFS-e" }));
                }
            });
            return;
        }

        // POST /api/zai-chat - Simulador da assistente virtual Z.AI / ZaiONe
        if (pathname === '/api/zai-chat' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const { mensagem, pacienteNome } = JSON.parse(body);
                    const textoLower = (mensagem || "").toLowerCase();
                    let resposta = "";

                    if (textoLower.includes("agendar") || textoLower.includes("marcar") || textoLower.includes("consulta")) {
                        resposta = `Olá, ${pacienteNome || 'tudo bem'}! Eu sou a Z.AI, secretária virtual da clínica. Temos horários disponíveis amanhã com o Dr. Carlos (Cardiologia) às 09:30 e com a Dra. Juliana (Odonto) às 14:00. Qual especialidade prefere?`;
                    } else if (textoLower.includes("cardio") || textoLower.includes("carlos")) {
                        resposta = `Perfeito! Confirmo o agendamento com Dr. Carlos para amanhã às 09:30. Já enviei a confirmação para a recepção da clínica e o link de pré-cadastro!`;
                    } else if (textoLower.includes("odonto") || textoLower.includes("juliana")) {
                        resposta = `Excelente! Horário reservado com a Dra. Juliana para avaliação odontológica. Por favor chegue 10 minutos antes.`;
                    } else if (textoLower.includes("confirmar") || textoLower.includes("sim")) {
                        resposta = `Sua consulta foi confirmada no sistema com sucesso! O painel da clínica já foi atualizado com seu status.`;
                    } else if (textoLower.includes("preço") || textoLower.includes("valor") || textoLower.includes("convenio")) {
                        resposta = `Aceitamos os principais convênios (Unimed, Bradesco, Amil, SulAmérica) e atendimentos particulares com parcelamento em até 6x sem juros!`;
                    } else {
                        resposta = `Recebi sua mensagem! Estou à disposição para agendamentos, confirmações de consulta, emissão de segundas vias de recibos e informações sobre preparo de exames. Como posso te ajudar hoje?`;
                    }

                    res.writeHead(200);
                    res.end(JSON.stringify({ resposta, timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Erro" }));
                }
            });
            return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota da API não encontrada" }));
        return;
    }

    // Rotas de Páginas
    if (pathname === '/' || pathname === '/landing') {
        const landingPath = path.join(__dirname, 'landing.html');
        fs.readFile(landingPath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro ao carregar landing page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
        return;
    }

    if (pathname === '/portal' || pathname === '/app' || pathname === '/login') {
        const appPath = path.join(__dirname, 'index.html');
        fs.readFile(appPath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro ao carregar portal');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
        return;
    }

    if (pathname === '/politica-de-privacidade' || pathname === '/privacidade') {
        const privPath = path.join(__dirname, 'privacidade.html');
        fs.readFile(privPath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro ao carregar política de privacidade');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
        return;
    }

    if (pathname === '/termos-de-uso' || pathname === '/termos') {
        const termosPath = path.join(__dirname, 'termos.html');
        fs.readFile(termosPath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro ao carregar termos de uso');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
        return;
    }

    if (pathname === '/lgpd') {
        const lgpdPath = path.join(__dirname, 'lgpd.html');
        fs.readFile(lgpdPath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro ao carregar página de LGPD');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
        return;
    }

    // Servir arquivos estáticos da pasta clinica-erp-app
    let filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Tenta index.html como fallback para SPA
                fs.readFile(path.join(__dirname, 'index.html'), (err2, indexContent) => {
                    if (err2) {
                        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end('404 Not Found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(indexContent);
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Erro no servidor: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  SISTEMA ODONTO SOLUTION (ERP & LANDING PAGE)`);
    console.log(`  Rodando em: http://localhost:${PORT}`);
    console.log(`======================================================\n`);
});
