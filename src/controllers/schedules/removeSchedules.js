import connect from "../../config/connection";

export const removeSchedules = async (req, res) => {
  const { id } = req.params;

  try {
    const schedulesFound = await connect.query(
      "select * from horarios_trabalho where id = $1",
      [id],
    );

    if (schedulesFound.rowCount <= 0) {
      res
        .status(404)
        .json({
          message:
            "Os horarios desse barbeiro não foram encontrados no sistema",
        });
    }

    const remove = await connect.query(
      "delete from horarios_trabalho where id = $1",
      [id],
    );

    return res.json({ message: "Os horarios foram removidos com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
