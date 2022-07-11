import * as employeeRepository from "../repositories/employeeRepository.js";

export async function checkEmployee(id: number){

    const {rows: employee} = await employeeRepository.findById(id)

    if(employee.rows.length === 0) throw {type: 404}

    return employee;
}