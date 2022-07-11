import { Router } from "express";

import * as controller from "../controllers/companyController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
// import companySchema from "../schemas/companySchema.js";

const companyRouter = Router();

// companyRouter.post('/company',schemaValidator(companySchema) ,controller.postBattle);

export default companyRouter;