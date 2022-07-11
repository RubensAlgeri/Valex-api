import { Router } from "express";

import * as controller from "../controllers/businessController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import businessSchema from "../schemas/businessSchema.js";

const businessRouter = Router();

businessRouter.post('/business',schemaValidator(businessSchema) ,controller.postBattle);

export default businessRouter;