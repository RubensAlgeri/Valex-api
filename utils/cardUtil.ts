import * as cardRepository from "../repositories/cardRepository.js";
import dayjs from 'dayjs'
import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function checkCard(id:number) {
    const card = await cardRepository.findById(id)
    if(!card) throw{type:404,message:"Card not found"}
    return card;
}
export async function checkPassword(password:string, encryptedPassword:string){
    const decryptedPassword = cryptr.decrypt(encryptedPassword);
    if(password !== decryptedPassword) throw{type:401,message:"Wrong password"}
}

export async function checkExpirationDate(expirationDate:String){
    const data = expirationDate.split('/');
    
    if(!((data[1]===dayjs().format('YY')&&data[0]>=dayjs().format('MM'))||data[1]>=dayjs().format('YY')))throw{type:401,message:"Card expirated"}
}