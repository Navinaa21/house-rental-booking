const db = require('../models/db.js');

exports.signup = (req, res) => {
  const { role, email, password } = req.body;
  const sql = 'INSERT INTO login (role, email, password) VALUES (?, ?, ?)';

  db.query(sql, [role, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'User signed up successfully' });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM login WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        const { role } = user;
        if (role === 'Buyer') {
          res.json({ success: true, role: 'Buyer', message: 'Login successful' });
        } else if (role === 'Renter') {
          res.json({ success: true, role: 'Renter', message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid role' });
        }
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
};
