import { InputAccount } from "../../type/Account";
import { JSONResult, JSONError } from "../../type/Message";
import { userToken } from "../../type/Token";
import { AccountService } from "./AccountService";

export class OnlineAccountService implements AccountService {
    getStoredAccounts(data: { token: userToken; }): Promise<JSONResult | JSONError> {
        throw new Error("Method not implemented.");
    }
    updateStoredAccountInfo(data: { accountId: number; newInfo: InputAccount; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteStoredAccount(data: { userId: number; accountId: number; }): Promise<void> {
        throw new Error("Method not implemented.");
    }

}