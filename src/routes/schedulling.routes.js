import { Router } from "express";
import { listAvaiableSchedullings } from "../controllers/schedullings/listAvaiableSchedullings.js";
import { insertSchedulling } from "../controllers/schedullings/insertSchedulling.js";
import { listSchedullingsByClient } from "../controllers/schedullings/listSchedullingsByClient.js";
import { listSchedullingsByBarberWorkDay } from "../controllers/schedullings/listSchedullingsByBarber.js";
import { updateSchedullingStatus } from "../controllers/schedullings/updateSchedullingStatus.js";

const schedullingRouter = Router();

schedullingRouter.get("/disponiveis", listAvaiableSchedullings);
schedullingRouter.post("/agendar", insertSchedulling);
schedullingRouter.get("/listar/cliente/:cliente_id", listSchedullingsByClient);
schedullingRouter.get("/listar/barbeiro/:barbeiro_id", listSchedullingsByBarberWorkDay);
schedullingRouter.patch("/atualizar/status/:id", updateSchedullingStatus);

export default schedullingRouter;