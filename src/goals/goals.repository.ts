
import {pool} from "../dataBase/databaseClient"
import { ApiError } from "../error";
import {GoalsRepository,GoalsProfile, GoalsCreateDb} from "./goals.entities";

export class GoalsDb implements GoalsRepository {

    async create(goals: GoalsCreateDb): Promise<GoalsProfile> {
        try{
            const goalsData =  await pool.query(
                'INSERT INTO goals (title, target_value, current_value, target_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, target_value as "targetValue", current_value as "currentValue", target_date as "targetDate"',
                [goals.title, goals.targetValue, goals.currentValue, goals.targetDate, goals.userId]
            );
            return goalsData.rows[0] as GoalsProfile;
        }catch(error){
            throw new ApiError(500,"Error creating goals");
        }
    }
    async findByUserId(userId: number): Promise< GoalsProfile[] | null> {
        try{
            const goalsData = await pool.query(
                'SELECT id, title, target_value as "targetValue", current_value as "currentValue", target_date as "targetDate" FROM goals WHERE user_id = $1',
                [userId]
            );
            return goalsData.rows as GoalsProfile[];
        }catch(error){
            throw new ApiError(400,"Error finding goals by ID");
        }
    }
    async delete(id: number): Promise<void> {
        try{
            await pool.query('DELETE FROM goals WHERE id = $1', [id]);   
        }catch(error){
            throw new ApiError(500,"Error delete goals");
        }
    }
}