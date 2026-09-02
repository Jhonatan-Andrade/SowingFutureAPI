
import { GoalsCreate,GoalsHistoryDataAdd,GoalsProfile,GoalsRepository } from "./goals.entities.js";  
import { GoalsDb } from "./goals.repository.js";
import { ApiError } from "../../error.js";
import { UserRepositoryDb } from "../user/user.repository.js";
import { UserRepository } from "../user/user.entities.js";
import { isValidDate } from "../../utils/isValidDate.js";


class GoalsServices  {
    private goals: GoalsRepository;
    private userRepository : UserRepository
    constructor() {
        this.goals = new GoalsDb();
        this.userRepository = new UserRepositoryDb();
    }
    async createGoals(email:string,data: GoalsCreate): Promise<{create:boolean}> {
        if (!email) throw new ApiError(400, 'Email is required');
 
        const {title,date,targetValue,note} = data;
        if(!title|| !date || !targetValue  )throw new ApiError(400,'Title , targetValue or date are required');
        if(!isValidDate(date)) throw new ApiError(400, 'Data inválida');
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) throw new ApiError(404, 'User not found');
            await this.goals.create({
                title,
                date,
                targetValue,
                historical:[],
                userId:user.id,
                note
            });
            return {create:true}
        } catch (err) {
            return {create:false}
        }
    }
    async addMoneyGoals(email:string,data:GoalsHistoryDataAdd) {
        if (!email) throw new ApiError(400, 'Email is required');
        const {dateTime,value,goalsId} = data;
        if(!dateTime|| !value || !goalsId )throw new ApiError(400,'DateTime ,value or goalsId are required');
        if(!isValidDate(dateTime)) throw new ApiError(400, 'Data inválida');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const goal = await this.goals.findById(goalsId);
        if (!goal) throw new ApiError(404, 'Goal not found');

        const updatedGoal = await this.goals.update(goalsId, {
            dateTime,
            value,
            goalsId
        });

    return updatedGoal;    
        
    }
    async searchGoals(email: string): Promise<GoalsProfile[] | null> {
        if (!email) throw new ApiError(400, 'Email is required');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const goals = await this.goals.findByUserId(user.id)
        if (!goals) throw new ApiError(404, 'Goals not found');

        return goals;    
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