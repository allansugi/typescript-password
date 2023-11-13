import { JSONError, JSONResult } from "../type/Message";
import UserDAO from "../DAO/UserDAO";
import bcrypt from "bcrypt";
import { createDatabaseError } from "../type/ErrorResponse";
import { TokenService } from "./TokenService";

export default class AuthService {
    private userDao: UserDAO;
    private tokenService: TokenService;

    constructor() {
        this.userDao = new UserDAO();
        this.tokenService = new TokenService(process.env.SECRET_KEY || "");
    }

    /**
     * hash password and insert the account registered with the hashed password
     * into the database
     * note: account requirements handled in frontend
     * @param username
     * @param email
     * @param password
     * @returns
     */
    async register(data: {
        username: string;
        email: string;
        password: string;
    }): Promise<JSONResult | JSONError> {
        try {
            const saltRounds = 10;
            const password = data.password;
            const hash = await bcrypt.hash(password, saltRounds);
            await this.userDao.insertRegistrationAccount(
                data.username,
                data.email,
                hash,
            );
            return {
                success: true,
                result: "successful registration",
            };
        } catch (err) {
            return createDatabaseError(err);
        }
    }

    /**
     * check user authentication and store it to active session
     * @param email
     * @param password
     * @returns JSONResult if successful, JSONError if there's database problem
     */
    async login(data: {
        email: string;
        password: string;
    }): Promise<JSONResult | JSONError> {
        try {
            const result = await this.userDao.getAccount(data.email);

            if (result === null) {
                return {
                    success: false,
                    result: "account does not exist",
                };
            }

            const passwordMatch = await bcrypt.compare(
                data.password,
                result.password,
            );

            if (!passwordMatch) {
                return {
                    success: false,
                    result: "incorrect password",
                };
            } else {
                const token = this.tokenService.createToken(result.id);
                return {
                    success: true,
                    result: token,
                };
            }
        } catch (err) {
            return createDatabaseError(err);
        }
    }
}
