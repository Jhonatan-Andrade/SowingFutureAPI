
import { prisma } from "../dataBase/prisma.client";
import { ApiError } from "../error";
import {GoalsRepository,GoalsProfile, GoalsCreateDb} from "./goals.entities";

export class GoalsDb implements GoalsRepository {

    async create(goals: GoalsCreateDb): Promise<GoalsProfile> {
        try{
            const goalsData =  await prisma.goals.create({
                data: goals,
            });
            return goalsData;
        }catch(error){
            throw new ApiError(500,"Error creating goals");
        }
    }
    async findByUserId(userId: string): Promise< GoalsProfile[] | null> {
        try{
            const goalsData = await prisma.goals.findMany({
                select: { id: true, title: true, targetValue: true, currentValue: true, date:true },
                where: {userId}
            });
            return goalsData;
        }catch(error){
            throw new ApiError(400,"Error finding goals by ID");
        }
    }
    async delete(id: string): Promise<void> {
        try{
            await prisma.goals.deleteMany({
                where: {id}
            })
        }catch(error){
            throw new ApiError(500,"Error delete goals");
        }
    }
}