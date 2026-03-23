
import { FastifyInstance } from "fastify";
import { UserLogin, UserSignup } from "./user.entities";
import { UserServices} from "./user.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userServices = new UserServices()

export async function UserControllers(app: FastifyInstance) {
    app.post('/users/signup', async (request, reply) => {
        const { userName, email, password } = request.body as UserSignup;
        const {token} = await userServices.createUser({ userName, email, password });
        if (!token) {
            reply.status(400).send({ message: 'User could not be created' });
            return;
        }
        const inProd = process.env.NODE_ENV === 'production';
        reply.setCookie('token', token, {
            path: '/',
            httpOnly: true, 
            secure: inProd,  
            sameSite: inProd ? 'strict' : 'lax',
            maxAge: 60 * 60 * 2 
        });
        reply.status(200).send("Usuário criado com sucesso!");
    });
    app.post('/users/login', async (request, reply) => {
        const { email, password } = request.body as UserLogin;
        const {token} = await userServices.loginUser({ email, password });
          
        if (!token) {
            reply.status(401).send({ message: 'Invalid email or password' });
            return;
        }
        const inProd = process.env.NODE_ENV === 'production';
        reply.setCookie('token', token, {
            path: '/',
            httpOnly: true, 
            secure: inProd,  
            sameSite: inProd ? 'strict' : 'lax',
            maxAge: 60 * 60 * 24  
        });
        reply.status(200).send("Login realizado com sucesso!");
    });
    app.get('/users/profile',{preHandler:isAuthenticated}, async (request, reply) => {
        const email = request.user.email;
        if (!email) {
            reply.status(401).send({ message: 'Token invalid or expired' });
            return;
        }
        const userProfile = await userServices.searchUser(email as string);

        if (userProfile) {
            reply.status(200).send(userProfile);
        } else {
            reply.status(401).send({ message: 'User not found' });
        }
    });
}