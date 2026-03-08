import connect from "../../config/connection.js";

export const updateSchedules = async (req, res) => {
  try {
    const id = req.params.id;
    const { weekDay , openHour, closeHour } = req.body;

    if (!weekDay && !openHour && !closeHour) {
      return res.status(400).json({
        message: "É necessário informar algum dado para atualizar o serviço",
      });
    }

    const update = await connect.query(
      "update horarios_trabalho set dia_semana = COALESCE($1, dia_semana), hora_abertura = COALESCE($2, hora_abertura), hora_fechamento = COALESCE($3, hora_fechamento) where id = $4",
      [weekDay || null, openHour || null, closeHour || null, id],
    );

    return res.status(200).json({ message: "Horários atualizados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
