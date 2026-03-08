import connect from "../../config/connection.js";

export const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, price, estimated_time } = req.body;

    if (!description && !price && !estimated_time) {
      return res.status(400).json({
        message: "É necessário informar algum dado para atualizar o serviço",
      });
    }

    const update = await connect.query(
      "update servicos set descricao = COALESCE($1, descricao), preco = COALESCE($2, preco), tempo_estimado = COALESCE($3, tempo_estimado) where id = $4",
      [description || null, price || null, estimated_time || null, id],
    );

    return res.status(200).json({ message: "Dados do serviço atualizados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
