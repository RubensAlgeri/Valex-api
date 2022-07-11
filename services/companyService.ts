import * as companyRepository from "../repositories/companyRepository.js";

export async function checkApiKey(apiKey:string){

    const {rows:company} = await companyRepository.findByApiKey(apiKey)

    if(company.rows.length===0) throw{type: 404}
}