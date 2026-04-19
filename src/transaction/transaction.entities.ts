
export interface TransactionCreate {
    description: string;
    valueMoney: number;
    recordsInAndOut: string;
    category: string;
    targetDate:string;
    paymentMethod:string;
}
export interface TransactionCreateDb {
    description: string;
    valueMoney: number;
    recordsInAndOut: string;
    category: string;
    targetDate:string;
    paymentMethod:string;
    userId:number
}
export interface TransactionProfile {
    id: number;
    description: string;
    valueMoney: number;
    recordsInAndOut: string;
    category: string;
    targetDate:string;
    paymentMethod:string;
}
export interface TransactionRepository {
    create(transaction: TransactionCreateDb): Promise<TransactionProfile>;
    findById(id: number): Promise<TransactionProfile[] | null>;
    delete(id: number): Promise<void>;
}