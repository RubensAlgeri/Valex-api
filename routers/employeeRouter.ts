import { Router } from "express";

import * as controller from "../controllers/employeeController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import employeeSchema from "../schemas/employeeSchema.js";

const employeeRouter = Router();

employeeRouter.post('/employee',schemaValidator(employeeSchema) ,controller.postBattle);

export default employeeRouter;