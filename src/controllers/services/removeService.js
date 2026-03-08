import connect from "../../config/connection.js";

export const removeService = async (req, res) => {
  const { id } = req.params;

  try {
    const serviceFound = await connect.query(
      "select * from servicos where id = $1",
      [id],
    );

    if (serviceFound.rowCount <= 0) {
      res
        .status(404)
        .json({ message: "Serviço não foi encontrado no sistema" });
    }

    const remove = await connect.query("delete from servicos where id = $1", [
      id,
    ]);
    return res.json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
