import express from "express";
import { AccountController } from "../controller/AccountController";
import { cookieJWTAuth } from "../middleware/verifyTokenMiddleware";

export const router = express.Router();
const accountController = new AccountController();

// testing that the router is working
router.get("/echo", (req, res) => {
    res.status(200).json({
        message: "hello world",
    });
});

router.post("/add/v1", cookieJWTAuth, (req, res) => {
    accountController.addNewAccount(req, res);
})

router.get("/get/1/v1", cookieJWTAuth, (req, res) => {
    accountController.getAccount(req, res);
})

router.get("/get/all/v1", cookieJWTAuth, (req, res) => {
    accountController.getAllAccounts(req, res);
})

router.delete("/remove/v1", cookieJWTAuth, (req, res) => {
    accountController.removeExistingAccount(req, res);
})