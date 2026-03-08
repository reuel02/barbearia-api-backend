import connect from "../../config/connection.js";

export const removeService = async (req, res) => {
    const { id } = req.params;

    try {
        const remove = await connect.query("delete from servicos where id = $1", [id]);
        return res.json({ message: "Serviço removido com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}