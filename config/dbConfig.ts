import mysql from "mysql2";
import "dotenv/config";

// TODO: make a class for sql pool connection
const prodConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const testConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_DATABASE,
};

const env = process.env.NODE_ENV || "production";
const config = env === "testing" ? testConfig : prodConfig;
// create connection pool with promise wrapper
const pool = mysql.createPool(config).promise();

export default pool;
