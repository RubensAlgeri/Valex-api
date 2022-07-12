import { Router } from "express";

import * as controller from "../controllers/rechargeController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import * as schema from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post('/recharge/:id', schemaValidator(schema.rechargeSchema) ,controller.recharge);

export default rechargeRouter;