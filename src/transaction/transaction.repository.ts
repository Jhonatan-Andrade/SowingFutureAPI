
import db from "../dataBase/databaseClient"
import { ApiError } from "../error";
import { TransactionRepository, TransactionCreateDb, TransactionProfile } from "./transaction.entities";

export class TransactionDb implements TransactionRepository {

    async create(transaction: TransactionCreateDb): Promise<TransactionProfile> {
        try{
            const transactionData =  await db.query(
                'INSERT INTO transactions (description, value_money, records_in_and_out, category, target_date, payment_method, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, description, value_money as "valueMoney", records_in_and_out as "recordsInAndOut", category, target_date as "targetDate", payment_method as "paymentMethod", user_id as "userId"',
                [transaction.description, transaction.valueMoney, transaction.recordsInAndOut, transaction.category, transaction.targetDate, transaction.paymentMethod, transaction.userId]
            );
            
            return transactionData.rows[0] as TransactionProfile;
        }catch(error){
            throw new ApiError(500,"Error creating transaction record");
        }
    }
    async findById(userId: number): Promise< TransactionProfile[] | null> {
        try{
            const transactionRecordData = await db.query(
                'SELECT id, description, value_money as "valueMoney", records_in_and_out as "recordsInAndOut", category, target_date as "targetDate", payment_method as "paymentMethod" FROM transactions WHERE user_id = $1',
                [userId]
            );
            return transactionRecordData.rows as TransactionProfile[];
        }catch(error){
            throw new ApiError(400,"Error finding transaction record by ID");
        }
    }
    async delete(id: number): Promise<void> {
        try{
            await db.query('DELETE FROM transactions WHERE id = $1', [id]);   
        }catch(error){
            throw new ApiError(500,"Error deleting transaction record");
        }
    }
}