import jwt from "jsonwebtoken";

export class TokenService {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    /**
     * construct new jwt token containing userId
     * @param userId
     * @returns
     */
    createToken(userId: number): string {
        // alternative can be randomly generated string
        const token = jwt.sign({ id: userId }, this.secretKey, {
            expiresIn: "1h",
        });
        return token;
    }
}
