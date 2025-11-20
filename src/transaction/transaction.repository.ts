
import { prisma } from "../dataBase/prisma.client";
import { ApiError } from "../error";
import {TransactionRepository,TransactionProfile, TransactionCreateDb} from "./transaction.entities";

export class TransactionDb implements TransactionRepository {

    async create(transaction: TransactionCreateDb): Promise<TransactionProfile> {
        try{
            const transactionData =  await prisma.transaction.create({
                data: transaction,
            });
            return transactionData;
        }catch(error){
            throw new ApiError(500,"Error creating transaction");
        }
    }
    async findByUserId(userId: string): Promise< TransactionProfile[] | null> {
        try{
            const transactionData = await prisma.transaction.findMany({
                where: {userId}
            });
            return transactionData;
        }catch(error){
            throw new ApiError(400,"Error finding transaction by ID");
        }
    }
    async delete(id: string,userId:string): Promise<void> {
        try{
            await prisma.transaction.deleteMany({
                where: {id,userId}
            })
        }catch(error){
            throw new ApiError(500,"Error delete transaction");
        }
    }
}