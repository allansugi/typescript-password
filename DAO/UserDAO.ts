import pool from "../config/dbConfig";
import { Pool } from "mysql2/promise";
import { User } from "../type/User";

export default class UserDAO {
    private pool: Pool;

    constructor() {
        this.pool = pool;
    }

    /**
     * find an account with matching user id
     * @param id
     * @returns null if no account found else return the account
     */
    async findAccount(id: number): Promise<User | null> {
        const query = `SELECT * FROM account WHERE id = ?`;
        const values = [id];
        const [account] = await this.pool.execute<User[]>(query, values);
        return account.length ? account[0] : null;
    }

    /**
     * insert new account to database
     * @param username
     * @param email
     * @param password
     */
    async insertRegistrationAccount(
        username: string,
        email: string,
        password: string,
    ): Promise<void> {
        const query =
            "INSERT INTO account(username, email, password) VALUES (?, ?, ?)";
        const values = [username, email, password];
        await this.pool.execute(query, values);
    }

    /**
     * get an account with matching user email
     * @param email
     * @param password
     * @returns User if there is a matching account, otherwise null
     */
    async getAccount(email: string): Promise<User | null> {
        const query = "SELECT * FROM account WHERE email = ?";
        const values = [email];
        const [accounts] = await this.pool.execute<User[]>(query, values);
        return accounts.length ? accounts[0] : null;
    }

    /**
     * update current username with new username
     * @param id user id
     * @param username new username
     */
    async updateUsername(id: number, username: string): Promise<void> {
        const query = `UPDATE account set username = ? WHERE id = ?`;
        const values = [username, id];
        await this.pool.execute(query, values);
    }

    /**
     * update current hashed password with the new hashed password
     * @param id user id
     * @param password new hashed password
     */
    async updatePassword(id: number, password: string): Promise<void> {
        const query = "UPDATE account set password = ? WHERE id = ?";
        const values = [password, id];
        let result = await this.pool.execute(query, values);
    }
}
