
export interface AccountingRecordCreate {
    title: string;
    valueMoney: number;
    recordsInAndOut: string;
}
export interface AccountingRecordCreateDb {
    title: string;
    valueMoney: boolean;
    recordsInAndOut: string;
    userId:string
}
export interface AccountingRecordProfile {
    id: string;
    title: string;
    valueMoney: boolean;
    recordsInAndOut: string;
}
export interface AccountingRecordUpdate {
    id: string;
    title?: string;
    valueMoney?: boolean;
    recordsInAndOut?: string;
}
export interface AccountingRecordRepository {
    create(record: AccountingRecordCreateDb): Promise<AccountingRecordProfile>;
    findByUserId(userId: string): Promise<AccountingRecordProfile[] | null>;
    delete(id: string): Promise<void>;
}