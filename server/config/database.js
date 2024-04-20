require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABSE_PASSWORD,
    database: process.env.DATABSE_NAME
});

connection.connect(err => {
    if (err) {
        console.log("connection failed" + err.stack);
        return;
    }
    console.log("connection works" + connection.threadId);
});

module.exports = connection;