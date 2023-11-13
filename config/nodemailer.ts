import nodemailer, { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
});
