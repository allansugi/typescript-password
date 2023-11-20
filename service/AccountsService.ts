import AccountsDAO from "../DAO/AccountsDAO";
import { createDatabaseError } from "../type/ErrorResponse";

// different accounts to store the password
export class AccountsService {
    private dao: AccountsDAO;

    constructor() {
        this.dao = new AccountsDAO();
    }

    // add new account
    async addAccount(data: {
        userId: number;
        accountName: string;
        emailOrUser: string;
        password: string;
    }) {
        try {
            const result = await this.dao.insertnewAccount(
                data.userId,
                data.accountName,
                data.emailOrUser,
                data.password,
            );
            return {
                success: true,
                result: "account has been added",
            };
        } catch (error) {
            return createDatabaseError(error);
        }
    }

    // remove an existing account
    async removeAccount(accountId: number) {
        try {
            const result = await this.dao.removeAccount(accountId);
            return {
                success: true,
                result: "account has been removed",
            };
        } catch (error) {
            return createDatabaseError(error);
        }
    }

    // get all specific user accounts
    async getAccounts(userId: number) {
        try {
            const accounts = await this.dao.findAccounts(userId);

            if (accounts == null) {
                return {
                    success: true,
                    result: [],
                };
            }

            return {
                success: true,
                result: accounts,
            };
        } catch (error) {
            return createDatabaseError(error);
        }
    }

    // get a specific user accounts
    async getAccount(accountId: number) {
        try {
            const account = await this.dao.getAccount(accountId);

            if (account == null) {
                return {
                    success: false,
                    result: [],
                };
            }

            return {
                success: true,
                result: account,
            };
        } catch (error) {
            return createDatabaseError(error);
        }
    }
}
