import connect from "../../config/connection.js";

export const insertService = async (req, res) => {
  try {
    const { description, price, estimated_time } = req.body;

    if (!description || !price || !estimated_time) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    const insert = await connect.query(
      "insert into servicos (descricao, preco, tempo_estimado) values ($1, $2, $3) returning *",
      [description, price, estimated_time],
    );

    return res
      .status(201)
      .json({ message: "Serviço criado com sucesso", insert });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
