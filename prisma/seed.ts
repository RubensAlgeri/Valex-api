import prisma from "../config/databasePrisma.js";

// create admin user
async function main(){
    await prisma.companies.create({
        data:{
                name:"Driven",
                apiKey:"zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
            }
    })
    await prisma.employees.createMany({
        data:[
            {
                fullName:"Fulano Rubens da Silva",
                cpf:'47100935741',
                email:'fulano.silva@gmail.com',
                companyId: 1
            },
            {
                fullName:"Ciclana Maria Madeira",
                cpf:'08434681895',
                email:'ciclaninha@gmail.com',
                companyId: 1
            }
        ]
    })

    await prisma.businesses.createMany({
        data:[
            {
                name:'Responde Aí',
                type:'education'
            },
            {
                name:'Extra',
                type:'groceries'
            },
            {
                name:'Driven Eats',
                type:'restaurant'
            },
            {
                name:'Uber',
                type:'transport'
            },
            {
                name:'Unimed',
                type:'health'
            }
        ]
    })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})