import { InputAccount } from "../../type/Account";
import { JSONError, JSONResult } from "../../type/Message";
import { userToken } from "../../type/Token";

export interface AccountService {

    /**
     * get stored account associated with the user account Id
     * @param data contain user token to get their userId
     */
    getStoredAccounts(data: {
        token: userToken
    }): Promise<JSONResult|JSONError>;

    /**
     * update stored account information
     * @param data contain accountId and updated info for that account
     */
    updateStoredAccountInfo(data: {
        accountId: number,
        newInfo: InputAccount
    }): Promise<void>;

    deleteStoredAccount(data: {
        userId: number,
        accountId: number
    }): Promise<void>;
}