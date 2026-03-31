import connect from "../../config/connection.js";

export const insertSchedulling = async (req, res) => {
    const { cliente_id, barbeiro_id, servico_id, data_agendamento, horario } = req.body;

    try {
        // 1. Valida se todos os campos foram preenchidos
        if (!cliente_id || !barbeiro_id || !servico_id || !data_agendamento || !horario) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // 2. Valida se o cliente existe e é do tipo "Cliente"
        const clienteCheck = await connect.query(
            "select * from usuarios where id = $1 and tipo = $2",
            [cliente_id, "Cliente"]
        );

        if (clienteCheck.rows.length === 0) {
            return res.status(404).json({ error: "Cliente não encontrado ou ID inválido." });
        }

        // 3. Valida se o barbeiro existe e é do tipo "Barbeiro"
        const barbeiroCheck = await connect.query(
            "select * from usuarios where id = $1 and tipo = $2",
            [barbeiro_id, "Barbeiro"]
        );

        if (barbeiroCheck.rows.length === 0) {
            return res.status(404).json({ error: "Barbeiro não encontrado ou ID inválido." });
        }

        // 4. Valida se o serviço existe
        const servicoCheck = await connect.query(
            "select * from servicos where id = $1",
            [servico_id]
        );

        if (servicoCheck.rows.length === 0) {
            return res.status(404).json({ error: "Serviço não encontrado ou ID inválido." });
        }

        // 5. Verifica se o horário já está ocupado para o barbeiro naquele dia
        const resultAgendados = await connect.query(
            "select * from agendamentos where barbeiro_id = $1 and data_agendamento = $2 and horario = $3",
            [barbeiro_id, data_agendamento, horario]
        );

        if (resultAgendados.rows.length > 0) {
            return res.status(400).json({ error: "O horário já está ocupado para o barbeiro selecionado." });
        }

        // 6. Insere o agendamento
        const result = await connect.query(
            "insert into agendamentos (cliente_id, barbeiro_id, servico_id, status, horario, data_agendamento) values ($1, $2, $3, $4, $5, $6)",
            [cliente_id, barbeiro_id, servico_id, "pendente", horario, data_agendamento]
        );

        return res.status(201).json({ message: "Agendamento realizado com sucesso.", data: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}