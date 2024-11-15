// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',      // Replace with your database host if different
    user: 'root',           // Replace with your MySQL username
    password: '123456',   // Replace with your MySQL password
    database: 'wings_cafe_inventory'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
