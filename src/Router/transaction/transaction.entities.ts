export interface TransactionCreate {
    description: string;
    category: string;
    targetDate: string | Date;
    bankAccount: string; 
    recordsInAndOut: string;
    valueMoney: string;
    paymentMethod: string;
}


export interface TransactionCreateDb extends TransactionCreate {
    userId: string; 
}

export interface TransactionProfile {
    id: string; 
    description: string;
    category: string;
    targetDate: string | Date;
    bankAccount: string; 
    recordsInAndOut: string;
    valueMoney: string;
    paymentMethod: string;
}

export interface TransactionRepository {
    create(transaction: TransactionCreateDb): Promise<TransactionProfile>;
    findById(userId: string): Promise<TransactionProfile[] | null>;
    delete(id: string): Promise<void>;
}