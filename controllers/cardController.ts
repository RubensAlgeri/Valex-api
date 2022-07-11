import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';

export async function createCard(req:Request, res:Response) {

        const {type, employeeId}:{type:string,employeeId:number} = req.body;
        const apiKey = req.header("x-api-key");

        const companyId:number = await cardService.checkApiKey(apiKey)
        const {employee, id}:{employee:string,id:number} = await cardService.checkEmployee(employeeId, companyId)
        await cardService.createCard(employee, id, type)

        res.sendStatus(200);
};

export async function validateCard(req:Request, res:Response) {
        const {id} = req.params;
        const {CVC, password, type} = req.body;

        const cardId = await cardService.validateCard(CVC, parseInt(id), type)
        await cardService.updateCard(password, parseInt(cardId))

        res.sendStatus(200)
}