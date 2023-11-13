import request from "supertest";
import { app } from "../server";
import { accountForRegister, wrongEmail, wrongPassword } from "./dummy";
import pool from "../config/dbConfig";
import { clear } from "./dbClear";

const server = app.getServer();
// close database pool connection
afterAll(async () => {
    await pool.end();
    server.close();
});

// for clearing the database
afterEach(async () => {
    await clear();
});

// check whether server can make a request
describe("router test", () => {
    it("hello world", async () => {
        const res = await request(server).get("/api/auth/echo");
        expect(res.statusCode).toEqual(200);
    });
});

describe("test user registration", () => {
    it("successful registration", async () => {
        const res = await request(server)
            .post("/api/auth/register/v1")
            .send(accountForRegister);
        expect(res.statusCode).toEqual(200);
    });
});

describe("test user login", () => {
    // register
    beforeEach(async () => {
        await request(server)
            .post("/api/auth/register/v1")
            .send(accountForRegister);
    });

    it("successful login", async () => {
        const login = await request(server)
            .post("/api/auth/login/v1")
            .send(accountForRegister);
        expect(login.statusCode).toEqual(200);
    });

    it("wrong email", async () => {
        const login = await request(server)
            .post("/api/auth/login/v1")
            .send(wrongEmail);
        expect(login.statusCode).toEqual(401);
        expect(login.body.result).toEqual("account does not exist");
    });

    it("wrong password", async () => {
        const login = await request(server)
            .post("/api/auth/login/v1")
            .send(wrongPassword);
        expect(login.statusCode).toEqual(401);
        expect(login.body.result).toEqual("incorrect password");
    });
});
