import { Router } from 'express';
import { insertSchedules } from '../controllers/schedules/insertSchedules.js';

const schedulesRouter = Router();

schedulesRouter.post('/inserir/:id', insertSchedules);

export default schedulesRouter;