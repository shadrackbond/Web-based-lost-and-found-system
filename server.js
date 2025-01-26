const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MySQL Setup
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'lostandfound'
});

mysqlConnection.connect(error => {
    if (error) throw error;
    console.log('MySQL Connected...');
});

// MongoDB Setup
mongoose.connect('mongodb://localhost:27017/lostandfound', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.post('/api/report', (req, res) => {
    const { itemType, description } = req.body;

    // Save to MySQL (Example)
    const query = 'INSERT INTO reports (itemType, description) VALUES (?, ?)';
    mysqlConnection.query(query, [itemType, description], (error, results) => {
        if (error) return res.status(500).send(error);
        res.status(200).json({ message: 'Item reported successfully!' });
    });
});

app.get('/api/search', (req, res) => {
    const { query } = req.query;

    // Search in MongoDB (Example)
    mongoose.connection.db.collection('items').find({ $text: { $search: query } }).toArray((error, results) => {
        if (error) return res.status(500).send(error);
        res.status(200).json({ results });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
