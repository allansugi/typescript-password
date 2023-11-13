import express from "express";
import { UserAccountController } from "../controller/UserAccountController";
import { cookieJWTAuth } from "../middleware/verifyTokenMiddleware";

/**
 * router for user-account related routes
 */
export const router = express.Router();
const userController = new UserAccountController();

// testing that the router is working
router.get("/echo", (req, res) => {
    res.status(200).json({
        message: "hello world",
    });
});

router.put("/change/username/v1", cookieJWTAuth, (req, res) => {
    userController.changeUsername(req, res);
});

router.put("/change/password/v1", cookieJWTAuth, (req, res) => {
    userController.changePassword(req, res);
});
