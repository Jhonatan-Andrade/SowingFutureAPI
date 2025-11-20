
export interface TransactionCreate {
    description: string;
    value: string;
    type: string;
    category: string;
    date: string;
    paymentMethod: string;
    observations?: string;
}
export interface TransactionCreateDb {
    description: string;
    value: string;
    type: string;
    category: string;
    date: string;
    paymentMethod: string;
    observations: string;
    userId: string;
}
export interface TransactionProfile {
    id: string;
    description: string;
    value: string;
    type: string;
    category: string;
    date: string;
    paymentMethod: string;
    observations: string;
}
export interface TransactionRepository {
    create(record: TransactionCreateDb): Promise<TransactionProfile>;
    findByUserId(userId: string): Promise<TransactionProfile[] | null>;
    delete(id: string,userId:string): Promise<void>;
}