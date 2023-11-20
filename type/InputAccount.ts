// for database input
export type InputAccount = {
    userId: number;
};

export interface InputLoginAccount extends InputAccount {
    account_name: string;
    email: number;
    password: number;
}

export interface InputCardAccount extends InputAccount {
    bank_name: string;
    cardholder: string;
    cardNumber: number;
    Issuer: string; //VISA, Mastercard, American Express, etc
    expirationMonth: string; // e.g, Jan, Feb, etc
    expirationYear: number; // e.g, 2023, 2022 etc
}
