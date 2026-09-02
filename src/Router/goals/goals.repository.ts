import { ObjectId } from "mongodb";
import { db } from "../../dataBase/mongoDB.js";
import { ApiError } from "../../error.js";
import { GoalsRepository, GoalsProfile, GoalsCreateDb, GoalsHistoryDataAdd, GoalsHistoryData } from "./goals.entities.js";

export interface GoalsDocument {
    _id?: ObjectId;
    title: string;
    targetValue: string;
    date: string | Date;
    historical?: GoalsHistoryData[];
    note: string;
    userId: string;
}

export class GoalsDb implements GoalsRepository {
    private collection;

    constructor() {
        this.collection = db.collection<GoalsDocument>("goals");
    }

    async create(goals: GoalsCreateDb): Promise<GoalsProfile> {
        try {
            const newHistorical = goals.historical || [];

            const result = await this.collection.insertOne({
                title: goals.title,
                targetValue: goals.targetValue,
                date: goals.date,
                note: goals.note,
                userId: goals.userId,
                historical: newHistorical
            });

            return {
                id: result.insertedId.toString(),
                title: goals.title,
                targetValue: goals.targetValue,
                historical: newHistorical,
                note: goals.note,
                date: typeof goals.date === "string" 
                    ? goals.date 
                    : (goals.date as Date).toISOString()
            };
        } catch (error) {
            throw new ApiError(500, "Error creating goals");
        }
    }

    async findByUserId(userId: string): Promise<GoalsProfile[] | null> {
        try {
            const docs = await this.collection.find({ userId }).toArray();

            return docs.map((doc) => ({
                id: doc._id!.toString(),
                title: doc.title,
                targetValue: doc.targetValue,
                note: doc.note,
                date: typeof doc.date === "string" 
                    ? doc.date 
                    : (doc.date as Date).toISOString(),
                historical: doc.historical || []
            }));
        } catch (error) {
            throw new ApiError(400, "Error finding goals by User ID");
        }
    }

    async findById(id: string): Promise<GoalsProfile | null> {
        try {
            const doc = await this.collection.findOne({ _id: new ObjectId(id) });
            if (!doc) return null;

            return {
                id: doc._id!.toString(),
                title: doc.title,
                targetValue: doc.targetValue,
                date: typeof doc.date === "string" 
                    ? doc.date 
                    : (doc.date as Date).toISOString(),
                historical: doc.historical || [],
                note: doc.note
            };
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(400, "Error finding goal by ID");
        }
    }

    async update(goalId: string, data: GoalsHistoryDataAdd): Promise<GoalsProfile> {
        try {
            const objectId = new ObjectId(goalId);

            const newHistoryEntry: GoalsHistoryData = {
                id: new ObjectId().toString(),
                dateTime: data.dateTime,
                value: data.value,
                goalsId: goalId
            };

            const result = await this.collection.findOneAndUpdate(
                { _id: objectId },
                { $push: { historical: newHistoryEntry } },
                { returnDocument: 'after' }
            );

            if (!result) {
                throw new ApiError(404, "Goal not found");
            }

            return {
                id: result._id!.toString(),
                title: result.title,
                targetValue: result.targetValue,
                date: typeof result.date === "string" 
                    ? result.date 
                    : (result.date as Date).toISOString(),
                historical: result.historical || [],
                note: result.note
            };
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, "Error updating goal historical");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.collection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw new ApiError(500, "Error deleting goal");
        }
    }
}