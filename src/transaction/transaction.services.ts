
import { TransactionCreate,TransactionCreateDb,TransactionProfile,TransactionRepository } from "./transaction.entities";  
import { TransactionDb } from "./transaction.repository";
import { isValidEmail } from "../utils/isValidLogin";
import { ApiError } from "../error";
import { UserRepositoryDb } from "../user/user.repository";
import { UserRepository } from "../user/user.entities";

import { isValidMoney, monetaryFormatting } from "../utils/monetaryFormatting";

class TransactionServices  {
    private transaction: TransactionRepository;
    private userRepository : UserRepository
    constructor() {
        this.transaction = new TransactionDb();
        this.userRepository = new UserRepositoryDb();
    }
    async createTransaction(email:string,data: TransactionCreate): Promise<{create:boolean}> {
        if (!email) throw new ApiError(400, 'Email is required');

        const {description,value,type,category,date,paymentMethod,observations} = data;
        if(!description || !value || !type || !category || !date || !paymentMethod ) throw new ApiError(400,'All fields are required');

        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) throw new ApiError(404, 'User not found');
            const dataValue = monetaryFormatting(value)
            if (isValidMoney(dataValue)) throw new ApiError(500,"Error creating transaction")

            const data: TransactionCreateDb = {
                description,
                value:dataValue,
                type,category,date,paymentMethod,
                observations: observations || "",
                userId: user.id
            }
            await this.transaction.create(data);
            
            
            return {create:true}
        } catch (err) {
            return {create:false}
        }
    }
    async searchTransaction(email: string): Promise<TransactionProfile[] | null> {
        if (!email) throw new ApiError(400, 'Email is required');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const transactions = await this.transaction.findByUserId(user.id)
        if (!transactions) throw new ApiError(404, 'Transactions not found');

        return transactions;    
    }
    async deleteTransaction(id:string,email:string):Promise<{delete:boolean}>{
        if (!email) throw new ApiError(400, 'Email is required');
        if (!id) throw new ApiError(400, 'id is required');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');
        
        try{
            await this.transaction.delete(id,user.id)
            return {delete:true}; 
        }
        catch(err){return {delete:false}}
    }
}
export { TransactionServices };