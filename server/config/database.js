const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "online-store"
});

connection.connect(err => {
    if(err) {
        console.log("connection failed" + err.stack);
        return;
    }
    console.log("connection works" + connection.threadId);
});

module.exports = connection;