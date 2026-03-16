
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
    const response = await api.inject({
      method: "GET",
      url: "/users/profile",
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });
    expect(response.statusCode).toBe(200);
    const userProfile = JSON.parse(response.body);
    expect(userProfile).toHaveProperty("email");
    expect(userProfile).toHaveProperty("userName");
  }); 
});