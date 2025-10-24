
//import { PrismaClient } from '@prisma/client';
import { prisma } from "../dataBase/prisma.client";
import { app } from "../app";
let api: any;

beforeAll(async () => {
  api = await app.listen({ port: 0 }); 
});

afterAll(async () => {
  await app.close();
});
describe("Database Connection Tests", () => {
  it("should connect to the database and perform a simple query", async () => {
    //const prisma = new PrismaClient();
    const users = await prisma.user.findMany(); 
    expect(Array.isArray(users)).toBe(true);
  }); 
});