
export interface AccountingRecordCreate {
    title: string;
    value: number;
    type: string;
}
export interface AccountingRecordCreateDb {
    title: string;
    value: number;
    type: string;
    userId:string
}
export interface AccountingRecordProfile {
    id: string;
    title: string;
    value: number;
    type: string;
}
export interface AccountingRecordUpdate {
    id: string;
    title?: string;
    value?: number;
    type?: string;
}
export interface AccountingRecordRepository {
    create(record: AccountingRecordCreateDb): Promise<AccountingRecordProfile>;
    findByUserId(userId: string): Promise<AccountingRecordProfile[] | null>;
    delete(id: string): Promise<void>;
}