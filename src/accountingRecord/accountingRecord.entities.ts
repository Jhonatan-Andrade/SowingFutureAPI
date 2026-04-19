
export interface AccountingRecordCreate {
    title: string;
    valueMoney: number;
    recordsInAndOut: string;
}
export interface AccountingRecordCreateDb {
    title: string;
    valueMoney: number;
    recordsInAndOut: string;
    userId:number
}
export interface AccountingRecordProfile {
    id: number;
    title: string;
    valueMoney: number;
    recordsInAndOut: string;
}
export interface AccountingRecordUpdate {
    id: number;
    title?: string;
    valueMoney?: number;
    recordsInAndOut?: string;
}
export interface AccountingRecordRepository {
    create(record: AccountingRecordCreateDb): Promise<AccountingRecordProfile>;
    findByUserId(userId: number): Promise<AccountingRecordProfile[] | null>;
    delete(id: number): Promise<void>;
}