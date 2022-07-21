import supertest from "supertest";
import prisma from "../config/databasePrisma.js";
import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.SECRET_KEY);

import app from "./../app.js";

describe("Testing", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recharges;`;
    await prisma.$executeRaw`TRUNCATE TABLE payments;`;
    await prisma.$executeRaw`DELETE FROM cards;`;
  });

  it("Create a card should return 201", async () => {
    const body = {
      employeeId:1,
      type:'restaurant'
    }
    await supertest(app).post("/card").send(body).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    const card = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    expect(card.type).toBe(body.type);
  });

  it("Validate a card should return password not null", async () => {
    const body = {
      employeeId:1,
      type:'restaurant'
    }
    await supertest(app).post("/card").send(body).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    const card = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    
    let decryptedCVC = cryptr.decrypt(card.securityCode);

    const body2 = {
      CVC:decryptedCVC,
      password:'1234'
      }
    await supertest(app).put(`/card/${card.id}`).send(body2);
    const checkCard = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    expect(checkCard.password).not.toBeNull();
  });

  
  it("Make a recharge should return 201", async () => {
    const body = {
      employeeId:1,
      type:'restaurant'
    }
    await supertest(app).post("/card").send(body).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    const card = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    
    let decryptedCVC = cryptr.decrypt(card.securityCode);

    const body2 = {
      CVC:String(decryptedCVC),
      password:'1234'
    }
    await supertest(app).put(`/card/${card.id}`).send(body2);
    
    const body3 = {
      amount:'1'
    }
    await supertest(app).post(`/recharge/${card.id}`).send(body3).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    const checkRecharge = await prisma.recharges.findFirst({where:{cardId:card.id, amount:+body3.amount}})
    expect(checkRecharge.amount).toBe(+body3.amount);
  });

  it("Make a payment should return 201", async () => {
    const body = {
      employeeId:1,
      type:'restaurant'
    }
    await supertest(app).post("/card").send(body).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    const card = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    
    let decryptedCVC = cryptr.decrypt(card.securityCode);

    const body2 = {
      CVC:decryptedCVC,
      password:'1234'
    }
    await supertest(app).put(`/card/${card.id}`).send(body2);

    const body4 = {
      amount:'1'
    }
    await supertest(app).post(`/recharge/${card.id}`).send(body4).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    
    const body3 = {
      amount:'1',
      password:'1234',
      businessId: 3
    }
    await supertest(app).post(`/payment/${card.id}`).send(body3);
    const checkPayment = await prisma.payments.findFirst({where:{businessId:body3.businessId,cardId:card.id, amount:+body3.amount}})
    expect(checkPayment.amount).toBe(+body3.amount);
  });
    
  it("Block/unblock a card should return 200", async () => {
    const body = {
      employeeId:1,
      type:'restaurant'
    }
    await supertest(app).post("/card").send(body).set({ 'x-api-key': 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0' });
    const card = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    
    let decryptedCVC = cryptr.decrypt(card.securityCode);
    
    const body3 = {
      CVC:String(decryptedCVC),
      password:'1234'
    }
    await supertest(app).put(`/card/${card.id}`).send(body3);
    const cardValidated = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})

    const body2 = {
      password:'1234'
      }
    await supertest(app).put(`/blockstatus/${card.id}`).send(body2);
    const checkCard = await prisma.cards.findFirst({where:{type:'restaurant',employeeId:1}})
    expect(checkCard.isBlocked).not.toBe(cardValidated.isBlocked);
  })
});