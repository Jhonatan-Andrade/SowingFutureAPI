import request from "supertest";
import { app } from "../app";
import { GoalsServices } from "./goals.services";
import { UserServices } from "../user/user.services";

let api: any;
let token: string = "";
let idGoals: string;


const name = "GoalsTest"
const email = "goals.test@gmail.com"
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
      console.log(response.body);
      
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
  const goalsServicesServices = new GoalsServices()
  await goalsServicesServices.deleteGoals(idGoals)

  const userServices = new UserServices()
  try{
    await userServices.deleteUser(email);
  }catch(err){
    console.log(err);
  }
  await app.close();
});

describe("POST: /goals", () => {
  it(" should create a goals", async () => {
    const createGoals = await request(api)
      .post("/goals")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"Goals",
        targetValue:20000,
        currentValue:20000,
        date:"09/11/2025"
      })
      console.log(createGoals.body);
    expect(createGoals.status).toBe(201);
  });
});
describe("GET: /goals ", () => {
  it(" should search a goals", async () => {
    const searchGoals = await request(api)
      .get("/goals")
      .set('Authorization', `Bearer ${token}`)
    idGoals = searchGoals.body[0].id
    expect(searchGoals.status).toBe(200);
  });
});
describe("DELETE: /goals", () => {
    it("should delete a goals", async () => {
    const deleteGoals = await request(api)
      .delete("/goals")
      .set('Authorization', `Bearer ${token}`)
      .send({id:idGoals})
    expect(deleteGoals.status).toBe(200);
  });
});