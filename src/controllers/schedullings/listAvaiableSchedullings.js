import connect from "../../config/connection.js";

export const listAvaiableSchedullings = async (req, res) => {
  try {
    const { barbeiro_id, data, dia_semana } = req.query;

    const resultJornada = await connect.query(
      "SELECT hora_abertura, hora_fechamento FROM horarios_trabalho WHERE barbeiro_id = $1 AND dia_semana = $2",
      [barbeiro_id, dia_semana],
    );

    if (resultJornada.rows.length === 0) {
      return res
        .status(404)
        .json({ disponiveis: [], message: "Barbeiro não trabalha neste dia." });
    }

    const { hora_abertura, hora_fechamento } = resultJornada.rows[0];

    // 2. Busca os horários que JÁ ESTÃO OCUPADOS naquele dia
    const resultAgendados = await connect.query(
      "SELECT horario FROM agendamentos WHERE barbeiro_id = $1 AND data_agendamento = $2",
      [barbeiro_id, data],
    );

    // Cria um array só com as strings dos horários ocupados. Ex: ["10:00:00", "14:00:00"]
    const horariosOcupados = resultAgendados.rows.map((row) => row.horario);

    // 3. Gera a lista de horários livres (de meia em meia hora)
    const horariosDisponiveis = [];

    // Extrai horas e minutos da hora de abertura e fechamento
    const [horaAbertura, minAbertura] = hora_abertura.split(":").map(Number);
    const [horaFechamento, minFechamento] = hora_fechamento
      .split(":")
      .map(Number);

    // Converte para minutos totais desde o início do dia
    let minutosAtual = horaAbertura * 60 + minAbertura;
    const minutosFim = horaFechamento * 60 + minFechamento;

    // Loop que passa de meia em meia hora (30 minutos)
    while (minutosAtual < minutosFim) {
      // Converte minutos de volta para HH:MM:SS
      const horas = Math.floor(minutosAtual / 60);
      const minutos = minutosAtual % 60;
      const horarioFormatado = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:00`;

      // Se o horário NÃO estiver no array de ocupados, ele está livre!
      if (!horariosOcupados.includes(horarioFormatado)) {
        horariosDisponiveis.push(horarioFormatado);
      }

      minutosAtual += 30; // Vai para os próximos 30 minutos
    }

    return res.status(200).json({ disponiveis: horariosDisponiveis });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
