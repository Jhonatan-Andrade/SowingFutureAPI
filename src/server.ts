import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import cors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";

import { UserControllers } from './Router/user/user.controllers.js'
import { TransactionControllers } from './Router/transaction/transaction.controllers.js';
import { GoalsControllers } from './Router/goals/goals.controllers.js';

const isProduction = process.env.NODE_ENV === 'production'
const secretKey = process.env.SECRET_KEY_COOKIES
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173,http://127.0.0.1:5173').split(',').map(origin => origin.trim())
const allowAnyOrigin = !isProduction || process.env.ALLOW_ANY_ORIGIN === 'true'
const allowCrossSiteCookies = process.env.ALLOW_CROSS_SITE_COOKIES === 'true' || !isProduction

if (!secretKey) {
  console.error('ERRO FATAL: SECRET_KEY_COOKIES não foi definida!')
  process.exit(1)
}

const server = fastify({
  logger: false,
})

server.register(fastifyCookie, {
  secret: secretKey,
  parseOptions: {
    // Impede acesso do JavaScript (document.cookie), protegendo contra XSS
    httpOnly: true,
    // Em desenvolvimento, permite cookies em testes de origens diferentes.
    // Em produção, só envia via HTTPS.
    secure: isProduction || process.env.COOKIE_SECURE === 'true',
    // Permite cookies em contextos cross-site quando houver autorização explícita.
    sameSite: allowCrossSiteCookies ? 'none' : 'lax',
    // Torna o cookie acessível em todas as rotas/endpoints da sua API
    path: '/'
  }
})
server.register(cors, {
  // Em ambiente de desenvolvimento, o REST Client pode enviar requisições com Origin diferente.
  origin: (origin, callback) => {
    if (!origin || allowAnyOrigin || allowedOrigins.includes(origin) || origin.startsWith('vscode-')) {
      callback(null, true)
      return
    }

    callback(new Error('Origin not allowed by CORS'), false)
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
server.register(fastifyRateLimit, {
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
server.get('/', (req, res) => {
    res.send({
    message: "🌱 Bem-vindo(a) à SowingFutureAPI!",
    description: "Uma API dedicada a semear um futuro 🌍",
    version: "1.0.0",
  });
})
server.register(UserControllers)
server.register(TransactionControllers)
server.register(GoalsControllers)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.log(`Server is Running : http://localhost:8080`);
})