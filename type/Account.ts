import { RowDataPacket } from "mysql2";

// for ddatabase input
export interface InputAccount extends RowDataPacket {
    userId: number;
}

export interface InputLoginAccount extends InputAccount {
    email: string;
    password: string;
}

export interface InputBankAccount extends InputAccount {
    cardholder: string;
    cardNumber: number;
    brand: string;
    expirationMonth: string; // e.g, Jan, Feb, etc
    expirationYear: number; // e.g, 2023, 2022 etc
}
