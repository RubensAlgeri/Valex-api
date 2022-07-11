import { Router } from "express";

import * as controller from "../controllers/paymentController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import paymentSchema from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post('/payment',schemaValidator(paymentSchema) ,postpayment);

export default paymentRouter;