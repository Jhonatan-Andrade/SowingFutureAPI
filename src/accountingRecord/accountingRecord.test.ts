import request from "supertest";
import { app } from "../app";
import { AccountingRecordServices } from "./accountingRecord.services";
import { UserServices } from "../user/user.services";

let api: any;
let token: string = "";
let idAccountingRecord: string;


const name = "Dev1"
const email = "jhonatan.dev1@gmail.com"
const password ="Dev@2dev"

beforeAll(async () => {
  api = await app.listen({ port: 0 }); 
  try{
    const response = await request(api)
      .post("/users/signup")
      .send({ 
        name: name, 
        email:email, 
        password:password
      });
    if (response.body.statusCode === 409) {
        const loginRes = await request(api)
          .post("/users/login")
          .send({
            email:email, 
            password:password
          });
        token = loginRes.body.token
    }else{
      token = response.body.token;
    }
  }catch(err){
    console.log(err);
  }
});

afterAll(async () => {
  const accountingRecordServices = new AccountingRecordServices()
  await accountingRecordServices.deleteAccountingRecord(idAccountingRecord)

  const userServices = new UserServices()
  try{
      userServices.deleteUser(email);
  }catch(err){
    console.log(err);
  }
  await app.close();
});

describe("POST: /accounting-records", () => {
  it(" should create a accounting records", async () => {
    const createAccountingRecords = await request(api)
      .post("/accounting-records")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"Accounting Records",
        value:20000,
        type:"Receita"
      })
    expect(createAccountingRecords.status).toBe(201);
  });
});
describe("GET: /accounting-records ", () => {
  it(" should search a accounting records", async () => {
    const searchAccountingRecords = await request(api)
      .get("/accounting-records")
      .set('Authorization', `Bearer ${token}`)
    idAccountingRecord = searchAccountingRecords.body[0].id
    expect(searchAccountingRecords.status).toBe(200);
  });
});
describe("DELETE: /accounting-records", () => {
    it("should delete a accounting records", async () => {
    const deleteAccountingRecords = await request(api)
      .delete("/accounting-records")
      .set('Authorization', `Bearer ${token}`)
      .send({id:idAccountingRecord})
    expect(deleteAccountingRecords.status).toBe(200);
  });
});