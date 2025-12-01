const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your MySQL root password
  database: 'blood_donation_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admin_users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Add a new donor
app.post('/api/donors', (req, res) => {
  const { name, age, gender, blood_group, phone, email, city, last_donation_date } = req.body;
  const sql = 'INSERT INTO donors (name, age, gender, blood_group, phone, email, city, last_donation_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, age, gender, blood_group, phone, email, city, last_donation_date];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Donor added successfully', id: result.insertId });
  });
});

// Get all donors
app.get('/api/donors', (req, res) => {
  const sql = 'SELECT * FROM donors';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Search for donors
app.get('/api/donors/search', (req, res) => {
  const { bloodGroup, city } = req.query;
  let sql = 'SELECT * FROM donors WHERE 1=1';
  const values = [];

  if (bloodGroup) {
    sql += ' AND blood_group = ?';
    values.push(bloodGroup);
  }
  if (city) {
    sql += ' AND city LIKE ?';
    values.push(`%${city}%`);
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update donor details
app.put('/api/donors/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, gender, blood_group, phone, email, city, last_donation_date } = req.body;
  const sql = 'UPDATE donors SET name = ?, age = ?, gender = ?, blood_group = ?, phone = ?, email = ?, city = ?, last_donation_date = ? WHERE id = ?';
  const values = [name, age, gender, blood_group, phone, email, city, last_donation_date, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Donor updated successfully' });
  });
});

// Delete a donor
app.delete('/api/donors/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM donors WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Donor deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
