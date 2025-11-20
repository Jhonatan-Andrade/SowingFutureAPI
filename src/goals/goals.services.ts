
import { GoalsCreate,GoalsProfile,GoalsRepository } from "./goals.entities";  
import { GoalsDb } from "./goals.repository";
import { ApiError } from "../error";
import { UserRepositoryDb } from "../user/user.repository";
import { UserRepository } from "../user/user.entities";
import { isValidMoney, monetaryFormatting } from "../utils/monetaryFormatting";


class GoalsServices  {
    private goals: GoalsRepository;
    private userRepository : UserRepository
    constructor() {
        this.goals = new GoalsDb();
        this.userRepository = new UserRepositoryDb();
    }
    async createGoals(email:string,data: GoalsCreate): Promise<{create:boolean}> {
        if (!email) throw new ApiError(400, 'Email is required');

        const {title,targetValue , currentValue,date} = data;
        if(!title || !targetValue || !currentValue || !date)throw new ApiError(400,'Title , targetValue,currentValue or date are required');
        const dataTargetValue = monetaryFormatting(targetValue)
        if (isValidMoney(dataTargetValue)) throw new ApiError(500,"Error creating goals")
        const dataCurrentValue = monetaryFormatting(currentValue)
        if (isValidMoney(dataCurrentValue)) throw new ApiError(500,"Error creating goals")

        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) throw new ApiError(404, 'User not found');
            await this.goals.create({title,targetValue:dataTargetValue , currentValue:dataCurrentValue,date,userId:user.id});
            return {create:true}
        } catch (err) {
            return {create:false}
        }
    }
    async searchGoals(email: string): Promise<GoalsProfile[] | null> {
        if (!email) throw new ApiError(400, 'Email is required');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const goalss = await this.goals.findByUserId(user.id)
        if (!goalss) throw new ApiError(404, 'Goals not found');

        return goalss;    
    }
    async deleteGoals(id:string):Promise<{delete:boolean}>{
        if (!id) throw new ApiError(400, 'id is required');
        try{
            await this.goals.delete(id)
            return {delete:true}; 
        }
        catch(err){return {delete:false}}
    }
}
export { GoalsServices };