
export interface GoalsCreate {
    title: string;
    targetValue: boolean;
    currentValue: boolean;
    targetDate:string;
}
export interface GoalsCreateDb {
    title: string;
    targetValue: boolean;
    currentValue: boolean;
    targetDate:string;
    userId:string
}
export interface GoalsProfile {
    id: string;
    title: string;
    targetValue: boolean;
    currentValue: boolean;
    targetDate:string;
}
export interface GoalsUpdate {
    id: string;
    title?: string;
    targetValue?: boolean;
    currentValue?: boolean;
    targetDate?:string;
}
export interface GoalsRepository {
    create(record: GoalsCreateDb): Promise<GoalsProfile>;
    findByUserId(userId: string): Promise<GoalsProfile[] | null>;
    delete(id: string): Promise<void>;
}