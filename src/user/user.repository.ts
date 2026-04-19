import {pool} from "../dataBase/databaseClient";
import { ApiError } from "../error";
import { UserSignup, UserProfile, UserUpdate, UserRepository, UserFindByEmailOrName } from "./user.entities";
    

export class UserRepositoryDb implements UserRepository {

    async create(user: UserSignup): Promise<UserProfile> {
        try{
            const userQueryResult =  await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [user.name, user.email, user.password]
            );
            return userQueryResult.rows[0] as UserProfile;
        }catch(error){
            throw new ApiError(500,"Error creating user");
        }
    }
    async findByEmail(email: string): Promise<UserFindByEmailOrName | null> {
        try{
            const userQueryResult = await pool.query(
                'SELECT id, name as "userName", email, password FROM users WHERE email = $1',
                [email]
            );
            return userQueryResult.rows[0] as UserFindByEmailOrName;
        }catch(error){
            if (typeof error === "object" && error !== null && "code" in error && (error as any).code === '42703') {
                return null; 
            }
            throw new ApiError(400,"Error finding user by email");
        }
    }
    async findByName(userName: string): Promise<UserFindByEmailOrName | null> {
        try{
            const userQueryResult = await pool.query(
                'SELECT id, name as "userName", email, password FROM users WHERE name = $1',
                [userName]  
            );
            return userQueryResult.rows[0] as UserFindByEmailOrName;
        }catch(error){
            if (typeof error === "object" && error !== null && "code" in error && (error as any).code === '42703') {
                return null; 
            }
            throw new ApiError(400,"Error finding user by name");
        }
    }
    async findById(id: string): Promise< UserProfile | null> {
        try{
            const userFindByIdData = await pool.query(
                'SELECT id, name as "userName", email, password FROM users WHERE id = $1',
                [id]
            );
            return userFindByIdData.rows[0] as UserProfile;
        }catch(error){
            throw new ApiError(400,"Error finding user by ID");
        }

    }
    async update(user: UserUpdate): Promise<UserProfile> {
        try{
            const userUpdatedData = await pool.query(
                'UPDATE users SET name = $1, password = $3 WHERE id = $4 RETURNING *',
                [user.name, user.password, user.id]
            );
            return userUpdatedData.rows[0] as UserProfile;
        }catch(error){
            throw new ApiError(500,"Error updating user");
        }
    }
    async delete(id:number){
        try {
            await pool.query('DELETE FROM users WHERE id = $1', [id]);
        } catch (error) {
            throw new ApiError(500,"Error deleting user");
        }

    }
}