import fastify from "fastify";
import cors from "@fastify/cors";
import { UserControllers } from "./user/users.controllers";

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
// app.setErrorHandler((error, request, reply) => {
//   const statusCode = error.statusCode || 500
//   reply.status(statusCode).send({
//     statusCode,
//     error: error.name,
//     message: error.message,
//     path: request.url,
//   })
// })
app.register(UserControllers);