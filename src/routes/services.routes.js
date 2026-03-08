

import { Router } from "express";
import { listServices } from "../controllers/services/listServices.js";
import { insertService } from "../controllers/services/insertService.js";
import { updateService } from "../controllers/services/updateService.js";
import { removeService } from "../controllers/services/removeService.js";

const servicesRouter = Router();

servicesRouter.get("/listar", listServices);
servicesRouter.post("/cadastrar", insertService);
servicesRouter.patch("/atualizar/:id", updateService);
servicesRouter.delete("/remover/:id", removeService);

export default servicesRouter;
