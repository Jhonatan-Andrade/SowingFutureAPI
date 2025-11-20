
export interface GoalsCreate {
    title: string;
    targetValue: string;
    currentValue: string;
    date:string;
}
export interface GoalsCreateDb {
    title: string;
    targetValue: string;
    currentValue: string;
    date:string;
    userId:string
}
export interface GoalsProfile {
    id: string;
    title: string;
    targetValue: string;
    currentValue: string;
    date:string;
}
export interface GoalsUpdate {
    id: string;
    title?: string;
    targetValue?: string;
    currentValue?: string;
    date?:string;
}
export interface GoalsRepository {
    create(record: GoalsCreateDb): Promise<GoalsProfile>;
    findByUserId(userId: string): Promise<GoalsProfile[] | null>;
    delete(id: string): Promise<void>;
}