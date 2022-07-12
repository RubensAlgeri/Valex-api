import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';
import * as companyService from '../services/companyService.js';
import * as employeeService from '../services/employeeService.js';

export async function createCard(req:Request, res:Response) {

        const {type, employeeId}:{type:string,employeeId:number} = req.body;
        const apiKey = req.header("x-api-key");

        const companyId:number = await companyService.checkApiKey(apiKey)
        const {employee, id}:{employee:string,id:number} = await employeeService.checkEmployeeAndGetCardHolderName(employeeId, companyId)
        await cardService.hasSameTypeCard(type, employeeId)
        await cardService.createCard(employee, id, type)

        res.sendStatus(200);
};

export async function validateCard(req:Request, res:Response) {
        const id = +req.params.id;
        const {CVC, password} = req.body;

        await cardService.validateCard(CVC, id)
        await cardService.updateCard(password, id)

        res.sendStatus(200)
}

export async function checkBalanceAndTransactions(req:Request, res:Response) {
        const id = +req.params.id;
        await cardService.checkCard(id)
        const balance = await cardService.getBalance(id)
        const {transactions,recharges} = await cardService.getTransactionsByCard(id)

        const cardInfo = {
                balance,
                transactions,
                recharges
        }

        res.send(cardInfo)
}

export async function changeBlockCard(req:Request, res:Response) {
        const id = +req.params.id;
        const {password}:{password:string} = req.body;

        await cardService.changeBlockStatus(id, password)
        res.sendStatus(200)
}
