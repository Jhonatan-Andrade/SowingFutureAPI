
import { FastifyInstance } from "fastify";
import { AccountingRecordCreate } from "./accountingRecord.entities";
import { AccountingRecordServices} from "./accountingRecord.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const accountingRecordServices = new AccountingRecordServices()

export async function AccountingRecordControllers(app: FastifyInstance) {

    app.post('/accounting-records', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const data  = request.body as AccountingRecordCreate
        await accountingRecordServices.createAccountingRecord(email,data)

        reply.status(201).send({message: 'Accounting record created successfully'});
    });
    app.get('/accounting-records', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        try {
            const data = await accountingRecordServices.searchAccountingRecord(email)
            reply.status(200).send(data);
        } catch (error) {
            reply.status(401).send({ message: 'Accounting Record not found' });
        }
    });
    app.delete('/accounting-records', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const {id} = request.body as {id:string}
        try {
            await accountingRecordServices.deleteAccountingRecord(id)
            reply.status(200).send({message: 'Accounting record delete successfully'});
        } catch (error) {
            reply.status(401).send({ message: 'Accounting Record not delete' });
        }
    });
    
  
}