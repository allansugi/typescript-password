import pool from "../config/dbConfig";
export async function clear(): Promise<void> {
    const query = "DELETE FROM account";
    await pool.execute(query);
}
