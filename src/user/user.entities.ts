
export interface UserLogin {
    email: string;
    password: string;
}
export interface UserSignup {
    name: string;
    email: string;
    password: string;
}
export interface UserProfile {
    id: number;
    name: string;
    email: string; 
}
export interface UserUpdate {
    id: number;
    name?: string;
    password?: string; 
}
export interface UserFindByEmailOrName {
    id: number;
    name: string;
    email: string;
    password: string; 
}
export interface UserMemory {
    id: number;
    name: string;
    email: string;
    password: string; 
}
export interface UserRepository {
    create(user: UserSignup): Promise<UserProfile>;
    findByEmail(email: string): Promise<UserFindByEmailOrName | null>;
    findByName(name: string): Promise<UserFindByEmailOrName | null>;
    update(user: UserUpdate): Promise<UserProfile>;
    delete(id:number):Promise<any>;
}