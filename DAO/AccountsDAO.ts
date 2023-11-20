import { Pool } from "mysql2/promise";
import pool from "../config/dbConfig";
import { OutputLoginAccount } from "../type/outputAccount";

export default class AccountsDAO {
    private pool: Pool;

    constructor() {
        this.pool = pool;
    }

    /**
     * find an account with matching user id
     * @param userId
     * @returns null if no account found else return all associated accounts
     */
    async findAccounts(userId: number): Promise<OutputLoginAccount[] | null> {
        const query = `SELECT * FROM accountStore WHERE userId = ?`;
        const values = [userId];
        const [accounts] = await this.pool.execute<OutputLoginAccount[]>(
            query,
            values,
        );
        return accounts.length ? accounts : null;
    }

    /**
     * insert new account to database
     * @param username
     * @param email
     * @param password
     */
    async insertnewAccount(
        userId: number,
        accountName: string,
        emailOrUser: string,
        password: string,
    ): Promise<void> {
        const query =
            "INSERT INTO accountStore(userId, account_name, account_email, account_password) VALUES (?, ?, ?, ?)";
        const values = [userId, accountName, emailOrUser, password];
        await this.pool.execute(query, values);
    }

    /**
     * get an account based on their id
     * @param email
     * @param password
     * @returns User if there is a matching account, otherwise null
     */
    async getAccount(id: number): Promise<OutputLoginAccount | null> {
        const query = "SELECT * FROM accountStore WHERE id = ?";
        const values = [id];
        const [accounts] = await this.pool.execute<OutputLoginAccount[]>(
            query,
            values,
        );
        return accounts.length ? accounts[0] : null;
    }

    /**
     * update current username with new username
     * @param id primary key of the accountStore table
     * @param username email or a username
     */
    async updateUsername(id: number, username: string): Promise<void> {
        const query = `UPDATE accountStore set account_email = ? WHERE id = ?`;
        const values = [username, id];
        await this.pool.execute(query, values);
    }

    /**
     * update current hashed password with the new password
     * @param id primary key of accountStore table
     * @param password new hashed password
     */
    async updatePassword(id: number, password: string): Promise<void> {
        const query =
            "UPDATE accountStore set account_password = ? WHERE id = ?";
        const values = [password, id];
        await this.pool.execute(query, values);
    }

    async removeAccount(id: number): Promise<void> {
        const query = `DELETE FROM accountStore WHERE id = ?`;
        const values = [id];
        await this.pool.execute(query, values);
    }
}
