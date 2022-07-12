import * as employeeRepository from "../repositories/employeeRepository.js";

export async function checkEmployeeAndGetCardHolderName(id: number, companyId:number){

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