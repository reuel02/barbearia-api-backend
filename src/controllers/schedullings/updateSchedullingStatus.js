import connect from "../../config/connection.js";

export const updateSchedullingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const result = await connect.query(
            "update agendamentos set status = $1 where id = $2 returning *",
            [status, id]
        );

        return res.status(200).json({ message: "Status do agendamento atualizado com sucesso.", data: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}