import { Request, Response } from "express";
import * as rechargeService from '../services/rechargeService.js';
import * as cardService from '../services/cardService.js';
import * as companyService from '../services/companyService.js';

export async function recharge(req:Request, res:Response) {
        const apiKey = req.header("x-api-key");
        const id = +req.params.id;
        const {amount}:{amount:number} = req.body;

        await companyService.checkApiKey(apiKey)
        await cardService.checkCardValidation(id)

        await rechargeService.rechargeCard(id, amount)

        res.sendStatus(201);
};