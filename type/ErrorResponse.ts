import { JSONError } from "./Message";

export function createDatabaseError(errorMessage: unknown): JSONError {
    return {
        success: false,
        result: "database connection problem",
        error: errorMessage,
    };
}
