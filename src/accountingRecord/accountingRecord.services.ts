
import { AccountingRecordCreate,AccountingRecordProfile,AccountingRecordRepository } from "./accountingRecord.entities";  
import { AccountingRecordDb } from "./accountingRecord.repository";
import { isValidEmail } from "../utils/isValidLogin";
import { ApiError } from "../error";
import { UserRepositoryDb } from "../user/user.repository";
import { UserRepository } from "../user/user.entities";

class AccountingRecordServices  {
    private accountingRecord: AccountingRecordRepository;
    private userRepository : UserRepository
    constructor() {
        this.accountingRecord = new AccountingRecordDb();
        this.userRepository = new UserRepositoryDb();
    }
    async createAccountingRecord(email:string,data: AccountingRecordCreate): Promise<{create:boolean}> {
        if (!email) throw new ApiError(400, 'Email is required');

        const {title,valueMoney,recordsInAndOut} = data;
        if(!title || !valueMoney || !recordsInAndOut)throw new ApiError(400,'Title , Value or Records In And Out are required');

        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) throw new ApiError(404, 'User not found');
            await this.accountingRecord.create({title,valueMoney,recordsInAndOut,userId:user.id});
            return {create:true}
        } catch (err) {
            return {create:false}
        }
    }
    async searchAccountingRecord(email: string): Promise<AccountingRecordProfile[] | null> {
        if (!email) throw new ApiError(400, 'Email is required');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const accountingRecords = await this.accountingRecord.findByUserId(user.id)
        if (!accountingRecords) throw new ApiError(404, 'Accounting Records not found');

        return accountingRecords;    
    }
    async deleteAccountingRecord(id:number):Promise<{delete:boolean}>{
        if (!id) throw new ApiError(400, 'id is required');
        try{
            await this.accountingRecord.delete(id)
            return {delete:true}; 
        }
        catch(err){return {delete:false}}
    }
}
export { AccountingRecordServices };