import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";


export async function payment(cardId:number, businessId:number, amount:number){

    await paymentRepository.insert({cardId, businessId, amount})
}