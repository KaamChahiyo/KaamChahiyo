import nodemailer from "nodemailer";

const email = process.env.EMAIL_SERVER_USER;
const password = process.env.EMAIL_SERVER_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
