import { Request, Response } from "express";
import { AccountsService } from "../service/AccountsService";

export class AccountController {
    private service: AccountsService;

    constructor() {
        this.service = new AccountsService();
    }

    async addNewAccount(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.service.addAccount(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async removeExistingAccount(req: Request, res: Response): Promise<void> {
        try {
            const accountId = parseInt(req.query.accountId as string);
            const result = await this.service.removeAccount(accountId);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getAllAccounts(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.body.userId.id as string)
            const result = await this.service.getAccounts(userId);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getAccount(req: Request, res: Response): Promise<void> {
        try {
            const accountId = parseInt(req.query.accountId as string);
            const result = await this.service.getAccount(accountId);
            if (!result.success) {
                res.status(401).json(result);
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}
