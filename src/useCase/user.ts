import { UserLogin, UserSignup, UserProfile } from "../interface/user";  
import { isValidEmail, isValidPassword } from "../scripts/isValidLogin";

export async function createUser(data: UserSignup): Promise<UserProfile> {
    if(!data.name || !data.email || !data.password){
        throw new Error('Name, email and password are required');
    }
    if(!isValidEmail(data.email)){
        throw new Error('Invalid email format');
    }
    if(!isValidPassword(data.password)){
        throw new Error('Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
    }
    return { id: 1, name: data.name, email: data.email };
}
export async function loginUser(data: UserLogin): Promise<{ message: string }> {
    if(!data.email || !data.password){
        throw new Error('Email and password are required');
    }
    if(!isValidEmail(data.email)){
        throw new Error('Invalid email format');
    }
    if(!isValidPassword(data.password)){
        throw new Error('Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
    }

    return { message: 'Login successful' };
}
export async function getUserProfile(email: string): Promise<UserProfile | null> {
    if (email) {
        return { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    } else {
        return null;
    }
}
