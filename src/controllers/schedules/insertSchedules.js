
export const insertSchedules = async (req, res) => {
    const { id } = req.params
    const { weekDay, openHour, closeHour } = req.body;

    if (!weekDay )
}