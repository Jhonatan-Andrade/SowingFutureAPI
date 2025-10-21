import { UserLogin, UserSignup, UserProfile } from "../entities/user";  
import { isValidEmail, isValidPassword } from "../utils/isValidLogin";

class UserUseCase {

    async createUser(data: UserSignup): Promise<UserProfile> {
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
    async loginUser(data: UserLogin): Promise<{ message: string }> {
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
    async getUserProfile(email: string): Promise<UserProfile | null> {
        if (email) {
            return { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
        } else {
            return null;
        }
    }
}
export{ UserUseCase }