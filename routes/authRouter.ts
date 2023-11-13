import express from "express";
import { AuthController } from "../controller/AuthController";

/**
 * router for user-account related routes
 */
export const router = express.Router();
const authController = new AuthController();

// testing that the router is working
router.get("/echo", (req, res) => {
    res.status(200).json({
        message: "hello world",
    });
});

router.post("/register/v1", (req, res) => {
    authController.signup(req, res);
});

router.post("/login/v1", (req, res) => {
    authController.signin(req, res);
});
