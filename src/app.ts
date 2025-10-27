import fastify from "fastify";
import cors from "@fastify/cors";
import { UserControllers } from "./user/user.controllers";
import { AccountingRecordControllers } from "./accountingRecord/accountingRecord.controllers";

export const app = fastify({ logger: false });
app.register(cors, {
    origin: [],
    credentials: true,
});
app.get('/', (req, res) => {
    res.send({
    message: "🌱 Bem-vindo(a) à SowingFutureAPI!",
    description: "Uma API dedicada a semear um futuro mais sustentável 🌍",
    version: "1.0.0",
  });
})
app.register(UserControllers);
app.register(AccountingRecordControllers)