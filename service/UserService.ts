import UserDAO from "../DAO/UserDAO";
import { createDatabaseError } from "../type/ErrorResponse";
import { JSONError, JSONResult } from "../type/Message";
import bcrypt from "bcrypt";
import { userToken } from "../type/Token";

export class UserAccountService {
    private dao: UserDAO;

    constructor() {
        this.dao = new UserDAO();
    }

    /**
     * find the account by user id
     * @param id
     * @returns true if account exist and false if no account found
     */
    private async accountExist(id: number): Promise<boolean> {
        const result = await this.dao.findAccount(id);
        return result !== null;
    }

    /**
     * change existing username with new username
     * @param data body containing id and new username
     * @returns
     */
    async changeUsername(data: {
        userId: userToken;
        newUsername: string;
    }): Promise<JSONResult | JSONError> {
        try {
            const exist = await this.accountExist(data.userId.id);
            if (!exist) {
                return {
                    success: false,
                    result: "no such account exist",
                };
            }

            await this.dao.updateUsername(data.userId.id, data.newUsername);
            console.log("updated into the database");
            return {
                success: true,
                result: "username has been changed",
            };
        } catch (err) {
            console.log(err);
            return createDatabaseError(err);
        }
    }

    /**
     * change user existing password with a new password
     * @param data JSON body containing user id and new password
     * @returns JSON Error if error is thrown else JSONResult
     */
    async changePassword(data: {
        userId: userToken;
        newPassword: string;
    }): Promise<JSONResult | JSONError> {
        try {
            console.log(data);
            const exist = await this.accountExist(data.userId.id);
            if (!exist) {
                return {
                    success: false,
                    result: "no such account exist",
                };
            }

            const saltRounds = 10;
            const password = data.newPassword;

            try {
                const hash = await bcrypt.hash(password, saltRounds);
                await this.dao.updatePassword(data.userId.id, hash);
            } catch (error) {
                throw Error("error: " + error);
            }

            return {
                success: true,
                result: "password has been changed",
            };
        } catch (err) {
            return createDatabaseError(err);
        }
    }
}
