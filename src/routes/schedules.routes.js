import { Router } from "express";
import { insertSchedules } from "../controllers/schedules/insertSchedules.js";
import { listSchedules } from "../controllers/schedules/listSchedules.js";
import { removeSchedules } from "../controllers/schedules/removeSchedules.js";
import { updateSchedules } from "../controllers/schedules/updateSchedules.js";

const schedulesRouter = Router();

schedulesRouter.post("/inserir/:id", insertSchedules);
schedulesRouter.delete("/remover/:id", removeSchedules);
schedulesRouter.get("/listar", listSchedules);
schedulesRouter.patch("/atualizar/:id", updateSchedules);

export default schedulesRouter;
