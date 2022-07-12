import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function rechargeCard(id:number, amount:number){
    await rechargeRepository.insert({cardId:id, amount})
}