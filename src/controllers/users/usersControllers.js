import connect from "../../config/connection.js";

export const usersList = async (req, res) => {
    try {
        const result = await connect.query('select * from usuarios');
        return res.json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}