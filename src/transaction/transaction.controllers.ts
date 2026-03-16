
import { FastifyInstance } from "fastify";
import { TransactionCreate } from "./transaction.entities";
import { TransactionServices} from "./transaction.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const transactionServices = new TransactionServices()

export async function TransactionControllers(app: FastifyInstance) {

    app.post('/transactions', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const data  = request.body as TransactionCreate
        await transactionServices.createTransaction(email,data)

        reply.status(201).send({message: 'Transaction created successfully'});
    });
    app.get('/transactions', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        try {
            const data = await transactionServices.searchTransaction(email)
            reply.status(200).send(data);
        } catch (error) {
            reply.status(401).send({ message: 'Transaction not found' });
        }
    });
    app.delete('/transactions', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const {id} = request.body as {id:number}
        try {
            await transactionServices.deleteTransaction(id)
            reply.status(200).send({message: 'Transaction delete successfully'});
        } catch (error) {
            reply.status(401).send({ message: 'Transaction not delete' });
        }
    });
    
  
}