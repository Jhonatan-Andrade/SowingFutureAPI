import { ObjectId } from "mongodb";
import { db } from "../../dataBase/mongoDB.js"; // Supondo que retorne a instância do Db do MongoDB
import { ApiError } from "../../error.js";
import { UserSignup, UserProfile, UserUpdate, UserRepository, UserFindByEmailOrName } from "./user.entities.js";

export class UserRepositoryDb implements UserRepository {
    private collection: ReturnType<typeof db.collection>;

    constructor() {
        this.collection = db.collection("users");
    }

    private mapUser(user: any): any {
        if (!user) return null;
        const { _id, name, ...rest } = user;
        return {
            id: _id.toString(),
            name: name,
            ...rest
        };
    }

    async create(user: UserSignup): Promise<UserProfile> {
        try {
            const newUser = {
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: new Date()
            };

            const result = await this.collection.insertOne(newUser);
            
            return this.mapUser({
                _id: result.insertedId,
                ...newUser
            }) as UserProfile;
        } catch (error) {
            throw new ApiError(500, "Error creating user");
        }
    }

    async findByEmail(email: string): Promise<UserFindByEmailOrName | null> {
        try {
            const user = await this.collection.findOne({ email });
           
            return this.mapUser(user) as UserFindByEmailOrName | null;
        } catch (error) {
            console.log(error);
            
            throw new ApiError(400, "Error finding user by email");
        }
    }

    async findByName(userName: string): Promise<UserFindByEmailOrName | null> {
        try {
            const user = await this.collection.findOne({ name: userName });
            return this.mapUser(user) as UserFindByEmailOrName | null;
        } catch (error) {
            throw new ApiError(400, "Error finding user by name");
        }
    }

    async findById(id: string): Promise<UserProfile | null> {
        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }
            const user = await this.collection.findOne({ _id: new ObjectId(id) });
            return this.mapUser(user) as UserProfile | null;
        } catch (error) {
            throw new ApiError(400, "Error finding user by ID");
        }
    }

    async update(user: UserUpdate): Promise<UserProfile> {
        try {
            if (!ObjectId.isValid(user.id)) {
                throw new ApiError(400, "Invalid ID format");
            }

            const updatedUser = await this.collection.findOneAndUpdate(
                { _id: new ObjectId(user.id) },
                { $set: { name: user.name, password: user.password } },
                { returnDocument: "after" }
            );

            if (!updatedUser) {
                throw new ApiError(404, "User not found");
            }

            return this.mapUser(updatedUser) as UserProfile;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, "Error updating user");
        }
    }

    async delete(id: string | number): Promise<void> {
        try {
            const objectId = typeof id === "string" ? new ObjectId(id) : id;
            await this.collection.deleteOne({ _id: objectId as any });
        } catch (error) {
            throw new ApiError(500, "Error deleting user");
        }
    }
}