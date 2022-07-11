import { Router } from "express";

import * as controller from "../controllers/cardController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import * as schema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post('/card', schemaValidator(schema.insertCardSchema) ,controller.createCard);
cardRouter.post('/card/:id', schemaValidator(schema.validateCardSchema), controller.validateCard)

export default cardRouter;