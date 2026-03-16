
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
    id: string;
    userName: string;
    email: string; 
}
export interface UserUpdate {
    id: string;
    userName?: string;
    password?: string; 
}
export interface UserFindByEmailOrName {
    id: string;
    userName: string;
    email: string;
    password: string; 
}
export interface UserMemory {
    id: string;
    userName: string;
    email: string;
    password: string; 
}
export interface UserRepository {
    create(user: UserSignup): Promise<UserProfile>;
    findByEmail(email: string): Promise<UserFindByEmailOrName | null>;
    findByName(userName: string): Promise<UserFindByEmailOrName | null>;
    update(user: UserUpdate): Promise<UserProfile>;
    delete(id:string):Promise<any>;
}