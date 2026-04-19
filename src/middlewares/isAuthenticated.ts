// Tipagem para req.user
declare module "fastify" {
  interface FastifyRequest {
    user: {
      email: string;
    };
  }
}
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;
const expires = (process.env.JWT_EXPIRES_IN as string) ?? "2h";


export async function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {

  if (!secret) {
    return reply.code(500).send({ message: "Server error" });
  }
  const token = request.cookies.token;
  if (!token) {
    return reply.code(401).send({ message: "Token not provided" });
  }
  try {
    const payload = jwt.verify(token, secret) as { email: string };
    (request as any).user = payload;
  } catch (err) {
    return reply.code(401).send({ message: "Token invalid or expired" });
  }
}

export function signUser(email: string): string {
  if (!secret) {
    throw Error("Erro no servidor");
  }
  const token = jwt.sign({ email }, secret, { expiresIn: expires as any });
  if (!token) {
    throw Error("Usuario não autorizado");
  }
  return token;
}
