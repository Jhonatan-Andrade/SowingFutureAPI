
import { FastifyInstance } from "fastify";
import { GoalsCreate } from "./goals.entities";
import { GoalsServices} from "./goals.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { deleteGoalSchema, registerGoalSchema, searchGoalSchema } from "./routeSchema";

const goalsServices = new GoalsServices()

export async function GoalsControllers(app: FastifyInstance) {

    app.post('/goals', { 
        preHandler: isAuthenticated ,
        schema:registerGoalSchema
    }, async (request, reply) => {
        const email = request.user.email;
        const data  = request.body as GoalsCreate
      
        await goalsServices.createGoals(email,data)

        reply.status(201).send({message: 'Goals created successfully'});
    });
    app.get('/goals', { 
        preHandler: isAuthenticated ,
        schema:searchGoalSchema
    }, async (request, reply) => {
        const email = request.user.email;
        try {
            const data = await goalsServices.searchGoals(email)
            reply.status(200).send(data);
        } catch (error) {
            reply.status(401).send({ message: 'Goals not found' });
        }
    });
    app.delete('/goals/:id', { 
        preHandler: isAuthenticated ,
        schema:deleteGoalSchema
    }, async (request, reply) => {
        const { id } = request.params as { id: number };
        try {
            await goalsServices.deleteGoals(id)
            reply.status(200).send({message: 'Goals delete successfully'});
        } catch (error) {
            reply.status(401).send({ message: 'Goals not delete' });
        }
    });
    
  
}