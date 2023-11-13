// for database output
export type OutputAccount = {
    accountId: number;
    userId: number;
};

export interface OutputLoginAccount extends OutputAccount {
    account_name: string;
    email: number;
    password: number;
}

export interface OutputCardAccount extends OutputAccount {
    bank_name: string;
    cardholder: string;
    cardNumber: number;
    Issuer: string; //VISA, Mastercard, American Express, etc
    expirationMonth: string; // e.g, Jan, Feb, etc
    expirationYear: number; // e.g, 2023, 2022 etc
}