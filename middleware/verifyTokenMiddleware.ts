import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function cookieJWTAuth(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    try {
        const token = req.cookies.token;
        console.log(req.cookies.token);
        const secret = process.env.SECRET_KEY || "";
        const user = jwt.verify(token, secret);
        req.body.userId = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        res.status(401).send({
            success: false,
            error: "not logged in / not authorized",
        });
    }
}
