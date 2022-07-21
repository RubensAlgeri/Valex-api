import joi from "joi";

export const rechargeSchema = joi.object({
    amount: joi.string().regex(/^[0-9]*$/).regex(/^[0]*$/, { invert: true }).required()
});