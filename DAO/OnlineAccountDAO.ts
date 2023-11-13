import { Pool } from "mysql2/promise";
import pool from "../config/dbConfig";

export default class OnlineAccountDAO<I, O> {
    private pool: Pool;

    constructor() {
        this.pool = pool;
    }
}