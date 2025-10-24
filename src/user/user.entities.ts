
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
    id: string;
    name: string;
    email: string; 
}
export interface UserUpdate {
    id: string;
    name?: string;
    password?: string; 
}
export interface UserFindByEmail {
    id: string;
    name: string;
    email: string;
    password: string; 
}
export interface UserRepository {
    create(user: UserSignup): Promise<UserProfile>;
    findByEmail(email: string): Promise<UserFindByEmail | null>;
    findById(id: string): Promise<UserProfile | null>;
    update(user: UserUpdate): Promise<UserProfile>;
}