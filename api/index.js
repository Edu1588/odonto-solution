// Estado em memória para a API no Vercel
let db = {
    clinica: {
        nome: "Odonto Solution - Clínica Matriz",
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
        { id: 5, tipo: "despesa", descricao: "Licença Software Odonto Solution & Z.AI", valor: 490, data: "25/10/2026", categoria: "Tecnologia", status: "Pago" }
    ],
    notasFiscais: [
        { id: "NF-1049", paciente: "Mariana Silva Santos", valor: 250, data: "28/10/2026", codigoVerificacao: "4A89-B7C1", chaveAcesso: "35261012345678000190550010000010491008432190", status: "Transmitida com Sucesso" }
    ]
};

async function parseBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
        try { return JSON.parse(req.body); } catch (e) { return {}; }
    }
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                resolve({});
            }
        });
        req.on('error', () => resolve({}));
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = parsedUrl.pathname;

    // Remove prefixos se vier reescrito
    if (pathname.startsWith('/api/index.js')) {
        pathname = pathname.replace('/api/index.js', '') || '/';
    }
    if (!pathname.startsWith('/api')) {
        pathname = '/api' + (pathname.startsWith('/') ? pathname : '/' + pathname);
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // GET /api/data
    if (pathname === '/api/data' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(db));
        return;
    }

    // POST /api/agendamentos
    if (pathname === '/api/agendamentos' && req.method === 'POST') {
        const novo = await parseBody(req);
        novo.id = Date.now();
        novo.status = novo.status || "Agendado";
        db.agendamentos.push(novo);
        res.writeHead(201);
        res.end(JSON.stringify({ success: true, item: novo }));
        return;
    }

    // PUT /api/agendamentos/status
    if (pathname === '/api/agendamentos/status' && req.method === 'PUT') {
        const { id, status } = await parseBody(req);
        const agendamento = db.agendamentos.find(a => a.id === id);
        if (agendamento) {
            agendamento.status = status;
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
        return;
    }

    // POST /api/chamar-paciente
    if (pathname === '/api/chamar-paciente' && req.method === 'POST') {
        const { paciente, consultorio, profissional } = await parseBody(req);
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
        return;
    }

    // POST /api/prescricoes
    if (pathname === '/api/prescricoes' && req.method === 'POST') {
        const data = await parseBody(req);
        const nova = {
            id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
            paciente: data.paciente,
            medico: data.medico,
            crm: data.crm || "CRO/SP 88.421",
            data: new Date().toLocaleDateString('pt-BR'),
            medicamentos: data.medicamentos || [],
            assinaturaDigital: "Assinado Digitalmente ICP-Brasil (DocSign / Odonto Solution)",
            hashValidacao: Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12)
        };
        db.prescricoes.unshift(nova);
        res.writeHead(201);
        res.end(JSON.stringify({ success: true, item: nova }));
        return;
    }

    // POST /api/nfse
    if (pathname === '/api/nfse' && req.method === 'POST') {
        const { paciente, valor } = await parseBody(req);
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
        return;
    }

    // POST /api/zai-chat
    if (pathname === '/api/zai-chat' && req.method === 'POST') {
        const { mensagem, pacienteNome } = await parseBody(req);
        const textoLower = (mensagem || "").toLowerCase();
        let resposta = "";

        if (textoLower.includes("agendar") || textoLower.includes("marcar") || textoLower.includes("consulta")) {
            resposta = `Olá, ${pacienteNome || 'tudo bem'}! Eu sou a Z.AI, assistente virtual da Odonto Solution. Temos horários disponíveis amanhã com a Dra. Juliana (Ortodontia) às 10:00 e com o Dr. Carlos às 14:30. Qual prefere?`;
        } else if (textoLower.includes("odonto") || textoLower.includes("juliana") || textoLower.includes("dente")) {
            resposta = `Perfeito! Confirmo sua avaliação odontológica com a Dra. Juliana. Por favor compareça 10 minutos antes.`;
        } else if (textoLower.includes("cardio") || textoLower.includes("carlos")) {
            resposta = `Excelente! Horário reservado com o Dr. Carlos. O link do termo de consentimento foi enviado via SMS.`;
        } else if (textoLower.includes("confirmar") || textoLower.includes("sim")) {
            resposta = `Sua presença foi confirmada no sistema Odonto Solution! A recepção já foi avisada.`;
        } else {
            resposta = `Olá! Sou a assistente virtual Z.AI da Odonto Solution. Posso ajudar com agendamento de consultas, confirmações, preparo de exames e informações de convênios. Como posso te ajudar hoje?`;
        }

        res.writeHead(200);
        res.end(JSON.stringify({ resposta, timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }));
        return;
    }

    // Default 404
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Endpoint não encontrado" }));
}
