import AuthService from "../service/AuthService";
import { Request, Response } from "express";

// TODO: make response status for each function where success is false
export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.register(req.body);
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                result: "database connection error",
            });
        }
    }

    async signin(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.login(req.body);
            if (!result.success) {
                res.status(401).json(result);
            } else {
                const token = result.result;
                console.log(token)
                res.cookie("token", token);
                res.status(200).json({
                    success: true,
                    message: "login successful",
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                result: "database connection error",
            });
        }
    }
}
