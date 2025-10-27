
import { prisma } from "../dataBase/prisma.client";
import { ApiError } from "../error";
import {AccountingRecordRepository,AccountingRecordProfile, AccountingRecordCreateDb} from "./accountingRecord.entities";

export class AccountingRecordDb implements AccountingRecordRepository {

    async create(accountingRecord: AccountingRecordCreateDb): Promise<AccountingRecordProfile> {
        try{
            const accountingRecordData =  await prisma.accountingRecord.create({
                data: accountingRecord,
            });
            return accountingRecordData;
        }catch(error){
            throw new ApiError(500,"Error creating accounting record");
        }
    }
    async findByUserId(userId: string): Promise< AccountingRecordProfile[] | null> {
        try{
            const accountingRecordData = await prisma.accountingRecord.findMany({
                select: { id: true, title: true, value: true, type:true },
                where: {userId}
            });
            return accountingRecordData;
        }catch(error){
            throw new ApiError(400,"Error finding accounting record by ID");
        }
    }
    async delete(id: string): Promise<void> {
        try{
            await prisma.accountingRecord.deleteMany({
                where: {id}
            })
        }catch(error){
            throw new ApiError(500,"Error delete accounting record");
        }
    }
}