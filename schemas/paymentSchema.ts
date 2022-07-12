import joi from "joi";

export const paymentSchema = joi.object({
    amount: joi.string().regex(/^[0-9]*$/).required(),
    password: joi.string().regex(/^[0-9]{4}$/).required(),
    businessId: joi.number().required()
});