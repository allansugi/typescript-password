import pool from "../config/dbConfig";
import { app } from "../server";
import { clear } from "./dbClear";
import request from "supertest";
import {
    accountForLogin,
    accountForRegister,
    changedPasswordAccount,
    newPassword,
    newusername,
    testEmail,
} from "./dummy";
import { User } from "../type/User";

// test for route that requires token verifier middleware
const server = app.getServer();
const agent = request.agent(server);

// close database pool connection
afterAll(async () => {
    await pool.end();
    server.close();
});

// for clearing the database
afterEach(async () => {
    await clear();
});

describe("changing password", () => {
    beforeEach(async () => {
        await agent.post("/api/auth/register/v1").send(accountForRegister);
    });

    it("change password statuscode 200", async () => {
        const login = await agent
            .post("/api/auth/login/v1")
            .send(accountForLogin);
        expect(login.statusCode).toEqual(200);

        // change password then another with new password
        const changeReq = await agent.put("/api/user/change/password/v1").send({
            newPassword: newPassword,
        });

        expect(changeReq.statusCode).toEqual(200);
    });

    it("login with old password", async () => {
        await agent.post("/api/auth/login/v1").send(accountForLogin);

        // change password then another with new password
        await agent.put("/api/user/change/password/v1").send({
            newPassword: newPassword,
        });

        const falseLoginReq = await agent
            .post("/api/auth/login/v1")
            .send(accountForLogin);
        expect(falseLoginReq.statusCode).toEqual(401);
    });

    it("login with new password", async () => {
        await agent.post("/api/auth/login/v1").send(accountForLogin);

        // change password then another with new password
        await agent.put("/api/user/change/password/v1").send({
            newPassword: newPassword,
        });

        const loginReq = await agent
            .post("/api/auth/login/v1")
            .send(changedPasswordAccount);
        expect(loginReq.statusCode).toEqual(200);
    });
});

describe("changing username", () => {
    beforeEach(async () => {
        await agent.post("/api/auth/register/v1").send(accountForRegister);
    });

    it("change username statuscode 200", async () => {
        await agent.post("/api/auth/login/v1").send(accountForLogin);

        // change password then another with new password
        const changeReq = await agent.put("/api/user/change/username/v1").send({
            newUsername: newusername,
        });

        expect(changeReq.statusCode).toEqual(200);
    });

    it("get new username", async () => {
        await agent.post("/api/auth/login/v1").send(accountForLogin);

        // change password then another with new password
        await agent.put("/api/user/change/username/v1").send({
            newUsername: newusername,
        });

        const [account] = await pool.execute<User[]>(
            "select * from account where email = ?",
            [testEmail],
        );
        expect(account[0].username).toEqual(newusername);
    });
});
