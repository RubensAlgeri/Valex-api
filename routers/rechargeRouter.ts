import { Router } from "express";

import * as controller from "../controllers/rechargeController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
// import rechargeSchema from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

// rechargeRouter.post('/recharge',schemaValidator(rechargeSchema) ,controller.postBattle);

export default rechargeRouter;