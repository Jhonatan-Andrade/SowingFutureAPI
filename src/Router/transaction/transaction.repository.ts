import { ObjectId } from "mongodb";
import { ApiError } from "../../error.js";
import { TransactionRepository, TransactionCreateDb, TransactionProfile } from "./transaction.entities.js";
import { db } from "../../dataBase/mongoDB.js";

export class TransactionDb implements TransactionRepository {
    private collection;

    constructor() {
        this.collection = db.collection("transactions");
    }

    async create(transaction: TransactionCreateDb): Promise<TransactionProfile> {
        try {
            console.log(transaction);

            const result = await this.collection.insertOne(transaction);

            return {
                id: result.insertedId.toString(),
                description: transaction.description,
                valueMoney: transaction.valueMoney,
                recordsInAndOut: transaction.recordsInAndOut,
                category: transaction.category,
                targetDate: typeof transaction.targetDate === "string" 
                    ? transaction.targetDate 
                    : (transaction.targetDate as Date).toISOString(),
                bankAccount: transaction.bankAccount,
                paymentMethod: transaction.paymentMethod
            };
        } catch (error) {
            throw new ApiError(500, "Error creating transaction record");
        }
    }

    async findById(userId: string | number): Promise<TransactionProfile[] | null> {
        try {
            const docs = await this.collection.find({ userId }).toArray();

            return docs.map((doc) => ({
                id: doc._id.toString(),
                description: doc.description,
                valueMoney: doc.valueMoney,
                recordsInAndOut: doc.recordsInAndOut,
                category: doc.category,
                targetDate: typeof doc.targetDate === "string" ? doc.targetDate : doc.targetDate.toISOString(),
                bankAccount: doc.bankAccount,
                paymentMethod: doc.paymentMethod
            })) as TransactionProfile[];
        } catch (error) {
            throw new ApiError(400, "Error finding transaction record by ID");
        }
    }

    async delete(id: string | number): Promise<void> {
        try {
            await this.collection.deleteOne({ _id: new ObjectId(id as string) });
        } catch (error) {
            throw new ApiError(500, "Error deleting transaction record");
        }
    }
}