import * as businessRepository from "../repositories/businessRepository.js";

export async function getBusinessById(businessId:number){
    const business = await businessRepository.findById(businessId)
    if(!business) throw{type:404, message:"Business doesn't exist"}
    return business;
}