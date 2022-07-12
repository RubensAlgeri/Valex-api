import * as companyRepository from "../repositories/companyRepository.js";

export async function checkApiKey(apiKey:string){

    const company = await companyRepository.findByApiKey(apiKey)
    
    if(!company) throw{type: 404}
    
    return company.id;
    }