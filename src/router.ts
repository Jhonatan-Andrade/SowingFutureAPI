import { FastifyInstance } from "fastify";
import { UserLogin, UserSignup } from "./interface/user";
import { createUser, getUserProfile, loginUser } from "./useCase/user";
import { isAuthenticated } from "./scripts/isAuthenticated";

export async function UserRouter(app: FastifyInstance) {
    app.get('/users/signup', async (request, reply) => {
        const { name, email, password } = request.body as UserSignup;
        const user = await createUser({ name, email, password });
        return user;
    });
    app.post('/users/login', async (request, reply) => {
        const { email, password } = request.body as UserLogin;
        const user = await loginUser({ email, password });
        return user;
    });
    app.get('/users/profile',{preHandler:isAuthenticated}, async (request, reply) => {
        const email = request.user.email;
        if (!email) {
            reply.status(401).send({ message: 'Token invalid or expired' });
            return;
        }
        const userProfile = await getUserProfile(email as string);
        if (userProfile) {
            return userProfile;
        } else {
            reply.status(401).send({ message: 'User not found' });
        }
    });
}