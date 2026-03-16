
import db from "../dataBase/databaseClient"
import { ApiError } from "../error";
import {AccountingRecordRepository,AccountingRecordProfile, AccountingRecordCreateDb} from "./accountingRecord.entities";

export class AccountingRecordDb implements AccountingRecordRepository {

    async create(accountingRecord: AccountingRecordCreateDb): Promise<AccountingRecordProfile> {
        try{
            const accountingRecordData =  await db.query(
                'INSERT INTO accounting_records (title, value_money, records_in_and_out, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, value_money, records_in_and_out',
                [accountingRecord.title, accountingRecord.valueMoney, accountingRecord.recordsInAndOut, accountingRecord.userId]
            );
            return accountingRecordData.rows[0] as AccountingRecordProfile;
        }catch(error){
            throw new ApiError(500,"Error creating accounting record");
        }
    }
    async findByUserId(userId: string): Promise< AccountingRecordProfile[] | null> {
        try{
            const accountingRecordData = await db.query(
                'SELECT id, title, value_money as "valueMoney", records_in_and_out as "recordsInAndOut" FROM accounting_records WHERE user_id = $1',
                [userId]
            );
            return accountingRecordData.rows as AccountingRecordProfile[];
        }catch(error){
            throw new ApiError(400,"Error finding accounting record by ID");
        }
    }
    async delete(id: string): Promise<void> {
        try{
            await db.query('DELETE FROM accounting_records WHERE id = $1', [id]);   
        }catch(error){
            throw new ApiError(500,"Error delete accounting record");
        }
    }
}