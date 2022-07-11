import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";

import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr'
import dayjs from 'dayjs'


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
    const expirationDate = dayjs().add(5,"year").format("MM/YY")
    const cryptr = new Cryptr('myTotallySecretKey');

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

//     const cryptr = new Cryptr('myTotallySecretKey');

// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);

}