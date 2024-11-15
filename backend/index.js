const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabase'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Add Product Route
app.post('/api/products', (req, res) => {
    const { name, description, category, quantity, price } = req.body;

    const query = `
        INSERT INTO products (name, description, category, quantity, price)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [name, description, category, quantity, price];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(201).json({ message: 'Product added', id: result.insertId });
        }
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
