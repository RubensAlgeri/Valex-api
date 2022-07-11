import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";

import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr'
import dayjs from 'dayjs'
const cryptr = new Cryptr(process.env.SECRET_KEY);


export async function checkApiKey(apiKey:string){

const company = await companyRepository.findByApiKey(apiKey)

if(!company) throw{type: 404}

return company.id;
}

export async function checkEmployee(id: number, companyId:number){

    const employee = await employeeRepository.findById(id)

    if(!employee) throw {type: 404, message:"Employee not found"}
    if(employee.companyId !== companyId) throw{type:401, message:"This employee is not from this company"}

    const arrayEmployeeName = employee.fullName.split(' ').filter(item=>{return item.length>=3})
    let cardHolderName = '';

    for(let i=0; i<arrayEmployeeName.length;i++){
        if(i===0){
            cardHolderName += arrayEmployeeName[i]
            continue
        }
        if(i === arrayEmployeeName.length-1){
            cardHolderName += " " + arrayEmployeeName[i]
            continue
        }
        cardHolderName += " " + arrayEmployeeName[i].charAt(0).toUpperCase();
    }
    return {employee:cardHolderName.toUpperCase(), id:employee.id};
}

export async function createCard(name:string, id:number, type) {
    const number = faker.random.numeric(12).toString();
    const CVC = faker.random.numeric(3).toString();
    console.log("🚀 ~ file: cardService.ts ~ line 47 ~ createCard ~ CVC", CVC)
    const expirationDate = dayjs().add(5,"year").format("MM/YY")

    const encryptedCVC = cryptr.encrypt(CVC);

    const cardData = {
        employeeId:id,
        number,
        cardholderName:name,
        securityCode:encryptedCVC,
        expirationDate,
        isVirtual:false,
        isBlocked:true,
        type
    }

    await cardRepository.insert(cardData)

// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);
}

export async function validateCard(CVC:string, id:number, type) {
    const card = await cardRepository.findByTypeAndEmployeeId(type, id)
    if(!card)throw{type:404, message:"Card not found"}
    const decryptedCVC = cryptr.decrypt(card.securityCode);
    console.log("🚀 ~ file: cardService.ts ~ line 75 ~ validateCard ~ decryptedCVC", decryptedCVC)
    if(CVC !== decryptedCVC) throw{type:401, message:"This is the incorect card"}

    return card.id;
}
export async function updateCard(password:string, id:number) {
    const encryptedPassword = cryptr.encrypt(password)

    const cardData = {
        password: encryptedPassword,
        isBlocked: false
    }

    await cardRepository.update(id, cardData)
    
}