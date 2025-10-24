
import { prisma } from "../dataBase/prisma.client";
import { ApiError } from "../error";
import { UserSignup, UserProfile, UserUpdate, UserRepository, UserFindByEmail } from "./user.entities";

export class UserRepositoryDb implements UserRepository {


    async create(user: UserSignup): Promise<UserProfile> {
        
        try{
            const userCreated =  await prisma.user.create({
                data: user,
            });
        
            return userCreated;
        }catch(error){
            throw new ApiError(500,"Error creating user");
        }
    }
    async findByEmail(email: string): Promise<UserFindByEmail | null> {
        try{
            const userFindByEmail = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                },
                where: {
                    email,
                },
            });
            return userFindByEmail;
        }catch(error){
            throw new ApiError(400,"Error finding user by email");
        }
    }
    async findById(id: string): Promise< UserProfile | null> {
        try{
            const userFindById = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
                where: {
                    id,
                },
            });
            return userFindById;
        }catch(error){
            throw new ApiError(400,"Error finding user by ID");
        }

    }
    async update(user: UserUpdate): Promise<UserProfile> {
        try{
            const userUpdated = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: user,
            });
            return userUpdated;
        }catch(error){
            throw new ApiError(500,"Error updating user");
        }
    }
}