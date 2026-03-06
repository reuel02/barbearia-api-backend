import { Router } from 'express';
import { usersList } from '../controllers/users/usersControllers.js';

const usersRouter = Router();

usersRouter.get('/listar', usersList);

export default usersRouter;