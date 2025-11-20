
import { FastifyInstance } from "fastify";
import { AccountingRecordCreate } from "./accountingRecord.entities";
import { AccountingRecordServices} from "./accountingRecord.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const accountingRecordServices = new AccountingRecordServices()


export async function AccountingRecordControllers(app: FastifyInstance) {

    app.post('/accounting-records', { preHandler: isAuthenticated }, async (request, reply) => {
        const email = request.user.email;
        const dataBody  = request.body as AccountingRecordCreate
        try {
            const data = await accountingRecordServices.createAccountingRecord(email,dataBody)
            reply.status(201).send(data);
        } catch (error) {
            reply.status(401).send({ message: 'Accounting Record not found' });
        }

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