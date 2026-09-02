export interface GoalsHistoryDataAdd {
    goalsId:string,
    dateTime:string,
    value:string
}
export interface GoalsHistoryData extends GoalsHistoryDataAdd {
    id:string,
}
export interface GoalsCreate {
    title:string,
    date:string,
    targetValue: string ,
    historical:GoalsHistoryData[]
    note:string
} 
export interface GoalsCreateDb extends GoalsCreate { 
    userId:string
}
export interface GoalsProfile extends GoalsCreate {
    id:string 
}
export interface GoalsUpdate {
    id: string;
    title?: string;
    targetValue?: string;
    targetDate?:string;
}
export interface GoalsRepository {
    create(record: GoalsCreateDb): Promise<GoalsProfile>;
    findByUserId(userId: string): Promise<GoalsProfile[] | null>;
    findById(id: string): Promise<GoalsProfile | null>;
    update(goalId: string, data: GoalsHistoryDataAdd): Promise<GoalsProfile>;
    delete(id: string): Promise<void>;
}