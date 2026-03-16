
export interface UserLogin {
    email: string;
    password: string;
}
export interface UserSignup {
    userName: string;
    email: string;
    password: string;
}
export interface UserProfile {
    id: number;
    userName: string;
    email: string; 
}
export interface UserUpdate {
    id: number;
    userName?: string;
    password?: string; 
}
export interface UserFindByEmailOrName {
    id: number;
    userName: string;
    email: string;
    password: string; 
}
export interface UserMemory {
    id: number;
    userName: string;
    email: string;
    password: string; 
}
export interface UserRepository {
    create(user: UserSignup): Promise<UserProfile>;
    findByEmail(email: string): Promise<UserFindByEmailOrName | null>;
    findByName(userName: string): Promise<UserFindByEmailOrName | null>;
    update(user: UserUpdate): Promise<UserProfile>;
    delete(id:number):Promise<any>;
}