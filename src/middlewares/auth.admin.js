export const authAdmin = async (req, res, next) => {
    try {
        const tipo = req.usuarioTipo;

        if (tipo != 'Barbeiro') {
            return res.status(401).json({message: 'Sem permissão para acessar essa rota.'})
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}