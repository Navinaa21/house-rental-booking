const db = require('../models/db.js');

exports.getCheckout = (req, res) => {
  const { houseId } = req.query;
  const sql = 'SELECT * FROM info WHERE ID = ?';
  db.query(sql, [houseId], (err, result) => {
    if (err) {
      console.error('Error fetching house details:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ error: 'House not found' });
      }
    }
  });
};

exports.postCheckout = (req, res) => {
  const { firstName, lastName, mobile, address1, city, state, zip, country } = req.body;
  const { houseId } = req.query;

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const paymentSQL = 'INSERT INTO payment (houseID, First_Name, Last_Name, mobile, address, city, state, zip, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const paymentValues = [houseId, firstName, lastName, mobile, address1, city, state, zip, country];

    db.query(paymentSQL, paymentValues, (err, paymentResult) => {
      if (err) {
        console.error('Error inserting customer details:', err);
        db.rollback(() => {
          res.status(500).json({ error: 'Database error' });
        });
      } else {
        const deleteSQL = 'DELETE FROM info WHERE ID = ?';
        db.query(deleteSQL, [houseId], (err, deleteResult) => {
          if (err) {
            console.error('Error deleting house details:', err);
            db.rollback(() => {
              res.status(500).json({ error: 'Database error' });
            });
          } else {
            db.commit((err) => {
              if (err) {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'Database error' });
              } else {
                res.status(200).json({ message: 'Customer details saved and house details deleted successfully' });
              }
            });
          }
        });
      }
    });
  });
};
