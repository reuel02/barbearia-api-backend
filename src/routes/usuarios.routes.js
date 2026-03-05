import { Router } from 'express';

const UsuariosRouter = Router();

UsuariosRouter.get('/', (req, res) => {
    return res.status(200).json('OK')
})

export default UsuariosRouter;