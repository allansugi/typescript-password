import { UserAccountService } from "../service/UserService";
import { Request, Response } from "express";

export class UserAccountController {
    private service: UserAccountService;

    constructor() {
        this.service = new UserAccountService();
    }

    async changeUsername(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.service.changeUsername(req.body);
            if (!result.success) {
                res.status(401).json(result);
            } else {
                res.status(200).json(result);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                result: "database connection error",
            });
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.service.changePassword(req.body);
            if (!result.success) {
                res.status(401).json(result);
            } else {
                res.status(200).json(result);
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
