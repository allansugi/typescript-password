import { RowDataPacket } from "mysql2";

// for database output
export interface OutputAccount extends RowDataPacket {
    accountId: number;
    userId: number;
}

export interface OutputLoginAccount extends OutputAccount {
    account_name: string;
    email: string; //could be username
    password: number;
}

// not sure whether to store debit/credit card info
export interface OutputCardAccount extends OutputAccount {
    bank_name: string;
    cardholder: string;
    cardNumber: number;
    Issuer: string; //VISA, Mastercard, American Express, etc
    expirationMonth: string; // e.g, Jan, Feb, etc
    expirationYear: number; // e.g, 2023, 2022 etc
}
