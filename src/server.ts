import fastify from "fastify";
import fastifyCookie from '@fastify/cookie';
import cors from "@fastify/cors";
import { UserControllers } from "./user/user.controllers";
import { AccountingRecordControllers } from "./accountingRecord/accountingRecord.controllers";
import { GoalsControllers } from "./goals/goals.controllers";
import { TransactionControllers } from "./transaction/transaction.controllers";
import fastifyRateLimit from "@fastify/rate-limit";
import { waitForDatabase } from "./dataBase/databaseClient";

export const app = fastify({
  logger: true,
})
app.register(fastifyCookie, {
  secret: process.env.SECRET_KEY_COOKIES,
  parseOptions: {}
})
app.register(cors, {
    origin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});
app.register(fastifyRateLimit, {
  global: true, 
  max: 50,      
  timeWindow: '1 minute',
  errorResponseBuilder: (request, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Respira… o servidor também precisa de um café ☕.',
    };
  }
});

app.get('/', (req, res) => {
    res.send({
    message: "🌱 Bem-vindo(a) à SowingFutureAPI!",
    description: "Uma API dedicada a semear um futuro 🌍",
    version: "1.0.0",
  });
})
app.register(UserControllers);
app.register(AccountingRecordControllers)
app.register(GoalsControllers)
app.register(TransactionControllers)

const apiPort = process.env.PORT ? Number(process.env.PORT) : 3333;
export  async function startServer() {
  try {
    await waitForDatabase();
    app.listen({ port: apiPort, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        console.error("Erro ao iniciar servidor:", err);
        process.exit(1);
      }
      console.log(`Server is Running : http://localhost:${apiPort}`);
    });
    return app
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

startServer();

