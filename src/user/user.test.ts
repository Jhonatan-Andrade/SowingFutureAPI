
import request from "supertest";
import { app } from "../app";
import { prisma } from "../dataBase/prisma.client";

let api: any;

beforeAll(async () => {
  api = await app.listen({ port: 0 }); 
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: "jhonatanDev@example.com" },
  });
  await app.close();
});

describe("User Signup Tests", () => {
  it("should create a user", async () => {
    const user = {
      name: "Jhonatan Dev",
      email: "jhonatanDev@example.com",
      password: "jhonatan@3DEV",
    };

    const response = await request(api)
      .post("/users/signup")
      .send(user);
    expect(response.status).toBe(201);
  });
});
describe("User Login Tests", () => {
  it("should login a user", async () => {
    const user = {
      email: "jhonatanDev@example.com",
      password: "jhonatan@3DEV",
    };

    const response = await request(api)
      .post("/users/login")
      .send(user);
    
    expect(response.status).toBe(200);

  });
});