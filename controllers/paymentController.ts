import { Request, Response } from "express";
import * as paymentService from '../services/paymentService.js';
import * as cardService from '../services/cardService.js';
import * as businessService from '../services/businessService.js';


export async function payment(req:Request, res:Response) {
        const id = +req.params.id;
        const {amount, password, businessId}:{amount:number, password:string, businessId:number} = req.body;

        const business = await businessService.getBusinessById(businessId)
        const card = await cardService.checkCardValidation(id)

        if(card.type !== business.type)throw{type:401, message:"You can't use this card in this business"}

        await cardService.checkPassword(password, card.password)

        const balance = await cardService.getBalance(id)
        if(balance<amount)throw{type:401, message:"Insufficient funds"}
        await paymentService.payment(id, businessId, amount)

        res.sendStatus(200);
};