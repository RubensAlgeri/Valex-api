import { Request, Response } from "express";
import * as rechargeService from '../services/rechargeService.js';
import * as cardService from '../services/cardService.js';

export async function recharge(req:Request, res:Response) {
        const apiKey = req.header("x-api-key");
        const id = parseInt(req.params.id);
        const {amount}:{amount:number} = req.body;

        const companyId:number = await cardService.checkApiKey(apiKey)
        await cardService.checkCard(id)

        await rechargeService.rechargeCard(id, amount)

        res.sendStatus(200);
};