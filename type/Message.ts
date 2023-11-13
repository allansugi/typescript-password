// for any HTTP response body
export type JSONResult = {
    success: boolean;
    result: NonNullable<unknown>;
};

export type ResultToken = {
    success: boolean;
    token: string;
};

export type JSONError = {
    success: boolean;
    result: string;
    error: unknown;
};
