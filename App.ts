import express, { Application } from "express";
import { router as authRouter } from "./routes/authRouter";
import { router as userRouter } from "./routes/userRouter";
import { router as accountRouter } from "./routes/accountRouter";
import cookieParser from "cookie-parser";
import { Server } from "http";

export class App {
    private app: Application;
    private port: number;
    public server!: Server;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.init();
    }

    init(): void {
        this.loadMiddleware();
        this.loadRouter();
    }

    private loadMiddleware(): void {
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private loadRouter(): void {
        this.app.use("/api/auth/", authRouter);
        this.app.use("/api/user/", userRouter);
        this.app.use("/api/account/", accountRouter);
    }

    getServer(): Server {
        return this.server;
    }

    getApp(): Application {
        return this.app;
    }

    listen(): void {
        this.server = this.app.listen(this.port, () => {
            console.log(`app listening on port`, this.port);
        });
    }
}
