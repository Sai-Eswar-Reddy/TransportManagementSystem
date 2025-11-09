const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "eswar@2005",
    database: "transport_management"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

module.exports = db;
