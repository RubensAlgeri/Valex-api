import { Request, Response } from "express";
import * as paymentService from '../services/paymentService.js';
import * as cardService from '../services/cardService.js';
import * as businessService from '../services/businessService.js';


export async function payment(req:Request, res:Response) {
        const id = parseInt(req.params.id);
        const {amount, password, businessId}:{amount:number, password:string, businessId:number} = req.body;

        const business = await businessService.getBusinessById(businessId)
        const card = await cardService.checkCard(id)

        if(card.type !== business.type)throw{type:401}

        await cardService.checkPassword(password, card.password)

        const balance = await cardService.getBalance(id)
        console.log("🚀 ~ file: paymentController.ts ~ line 19 ~ payment ~ balance", balance)
        if(balance<amount)throw{type:401}
        await paymentService.payment(id, businessId, amount)

        res.sendStatus(200);
};