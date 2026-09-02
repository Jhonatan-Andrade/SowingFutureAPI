
import { TransactionCreate,TransactionCreateDb,TransactionRepository,TransactionProfile } from "./transaction.entities.js";  
import { TransactionDb } from "./transaction.repository.js";
import { ApiError } from "../../error.js";
import { UserRepositoryDb } from "../user/user.repository.js";
import { UserRepository } from "../user/user.entities.js";
import { isValidDate } from "../../utils/isValidDate.js";

class TransactionServices  {
    private transaction: TransactionRepository;
    private userRepository : UserRepository
    constructor() {
        this.transaction = new TransactionDb();
        this.userRepository = new UserRepositoryDb();
    }
    async createTransaction(email:string,data: TransactionCreate): Promise<{create:boolean}> {
        if (!email) throw new ApiError(400, 'Email is required');

        const {description,valueMoney,recordsInAndOut,category,targetDate,paymentMethod,bankAccount} = data;
        if(!description || !valueMoney || !recordsInAndOut || !category || !targetDate || !paymentMethod || !bankAccount)throw new ApiError(400,'All fields are required');

        const normalizedTargetDate = targetDate instanceof Date ? targetDate.toISOString() : targetDate;
        if (!isValidDate(normalizedTargetDate)) throw new ApiError(400, 'Data inválida');
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) throw new ApiError(404, 'User not found');
            await this.transaction.create({description,valueMoney,recordsInAndOut,category,targetDate,paymentMethod,bankAccount,userId:user.id});
            return {create:true}
        } catch (err) {
            return {create:false}
        }
    }
    async searchTransaction(email: string): Promise<TransactionProfile[] | null> {
        if (!email) throw new ApiError(400, 'Email is required');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const transactions = await this.transaction.findById(user.id)
        if (!transactions) throw new ApiError(404, 'Transactions not found');

        return transactions;    
    }
    async deleteTransaction(id:string):Promise<{delete:boolean}>{
        if (!id) throw new ApiError(400, 'id is required');
        try{
            await this.transaction.delete(id)
            return {delete:true}; 
        }
        catch(err){return {delete:false}}
    }
}
export { TransactionServices };