import connect from "../../config/connection.js";

export const listSchedullingsByClient = async (req, res) => {
    try {
        const { cliente_id } = req.params;

        // 1. Valida se o cliente_id foi informado
        if (!cliente_id) {
            return res.status(400).json({ error: "ID do cliente é obrigatório." });
        }

        // 2. Verifica se o cliente existe e é do tipo "Cliente"
        const clienteCheck = await connect.query(
            "select * from usuarios where id = $1 and tipo = $2",
            [cliente_id, "Cliente"]
        );

        if (clienteCheck.rows.length === 0) {
            return res.status(404).json({ error: "Cliente não encontrado no sistema." });
        }

        // 3. Busca os agendamentos do cliente
        const result = await connect.query(
            "select * from agendamentos where cliente_id = $1 order by data_agendamento desc, horario asc",
            [cliente_id]
        );

        // 4. Valida se há agendamentos
        if (result.rows.length === 0) {
            return res.status(200).json({ 
                message: "Este cliente não possui nenhum agendamento.",
                data: [] 
            });
        }

        return res.status(200).json({ data: result.rows });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

