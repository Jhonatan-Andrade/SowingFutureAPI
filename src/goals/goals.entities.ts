
export interface GoalsCreate {
    title: string;
    targetValue: number;
    currentValue: number;
    targetDate:string;
}
export interface GoalsCreateDb {
    title: string;
    targetValue: number;
    currentValue: number;
    targetDate:string;
    userId:number
}
export interface GoalsProfile {
    id: number;
    title: string;
    targetValue: number;
    currentValue: number;
    targetDate:string;
}
export interface GoalsUpdate {
    id: number;
    title?: string;
    targetValue?: number;
    currentValue?: number;
    targetDate?:string;
}
export interface GoalsRepository {
    create(record: GoalsCreateDb): Promise<GoalsProfile>;
    findByUserId(userId: number): Promise<GoalsProfile[] | null>;
    delete(id: number): Promise<void>;
}