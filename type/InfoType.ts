import { StoredAccount } from "./Account";
import { InputAccount } from "./InputAccount";

export interface InfoType<T extends InputAccount> {
    getInfos(userId: number): Promise<StoredAccount[] | null>;
    getInfo(userId: number, accountId: number): Promise<StoredAccount[] | null>;
    storeInfo(data: T): Promise<void>;
}
