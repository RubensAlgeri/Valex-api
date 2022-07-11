import { Router } from "express";
import "express-async-errors"
import errorHandlingMiddleware from "../middlewares/errorHandler.js";

import cardRouter from './cardRouter.js';
import rechargeRouter from './rechargeRouter.js';
import paymentRouter from './paymentRouter.js'
import companyRouter from './companyRouter.js'
import employeeRouter from './employeeRouter.js'
import businessRouter from './businessRouter.js'


const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(paymentRouter);
router.use(companyRouter);
router.use(employeeRouter);
router.use(businessRouter);
router.use(errorHandlingMiddleware)

export default router;