
import { FastifyInstance } from "fastify";
import { TransactionCreate } from "./transaction.entities";
import { TransactionServices} from "./transaction.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const transactionServices = new TransactionServices()

export async function TransactionControllers(app: FastifyInstance) {

    app.post('/transaction', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const data  = request.body as TransactionCreate
        await transactionServices.createTransaction(email,data)
        reply.status(201).send({message: 'Transaction created successfully'});
    });
    app.get('/transaction', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        try {
            const data = await transactionServices.searchTransaction(email)
            reply.status(200).send(data);
        } catch (error) {
            reply.status(401).send({ message: 'Transaction not found' });
        }
    });
    app.delete('/transaction', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const {id} = request.body as {id:string}
        try {
            await transactionServices.deleteTransaction(id,email)
            reply.status(200).send({message: 'Transaction deleted successfully'});
        } catch (error) {
            reply.status(401).send({ message: 'Transaction not deleted' });
        }
    });
  
  
}