import { Router } from "express";

import * as controller from "../controllers/paymentController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import * as schema from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post('/payment/:id',schemaValidator(schema.paymentSchema) ,controller.payment);

export default paymentRouter;