import connect from "../../config/connection.js";

export const listSchedullingsByBarberWorkDay = async (req, res) => {
    try {
        const { barbeiro_id } = req.params;
        const data_agendamento = req.query.data_agendamento;

        // 1. Valida se o barbeiro_id foi informado
        if (!barbeiro_id) {
            return res.status(400).json({ error: "ID do barbeiro é obrigatório." });
        }

        // 2. Valida se a data foi informada
        if (!data_agendamento) {
            return res.status(400).json({ error: "Data do agendamento é obrigatória." });
        }

        // 3. Verifica se o barbeiro existe e é do tipo "Barbeiro"
        const barbeiroCheck = await connect.query(
            "select * from usuarios where id = $1 and tipo = $2",
            [barbeiro_id, "Barbeiro"]
        );

        if (barbeiroCheck.rows.length === 0) {
            return res.status(404).json({ error: "Barbeiro não encontrado no sistema." });
        }

        // 4. Busca os agendamentos
        const result = await connect.query(
            "select * from agendamentos where barbeiro_id = $1 and data_agendamento = $2 order by horario asc",
            [barbeiro_id, data_agendamento]
        );

        // 5. Valida se há agendamentos
        if (result.rows.length === 0) {
            return res.status(200).json({ 
                message: "Nenhum agendamento encontrado para este barbeiro nesta data.",
                data: [] 
            });
        }

        return res.status(200).json({ data: result.rows });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}