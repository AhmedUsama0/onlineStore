require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

class Mail {
    transporter;
    static createTransporter() {
        this.transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }
    static send(fullName, payerEmail, items, callback) {
        this.createTransporter();
        const opitons = {
            viewEngine: {
                extName: ".hbs",
                partialsDir: path.resolve("views"),
                defaultLayout: false,
            },
            viewPath: path.resolve("views"),
            extName: ".hbs"
        };
        this.transporter.use("compile", hbs(opitons));
        this.transporter.sendMail({
            from: "Shocart",
            to: process.env.MAIL_USER,
            subject: "Payment Confirmation",
            template: "mail",
            context: {
                fullName,
                items
            }
        }, (err, info) => callback(err, info))
    }
}


module.exports = Mail;