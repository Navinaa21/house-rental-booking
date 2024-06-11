const db = require('../models/db.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload;

exports.getHouses = (req, res) => {
  const sql = 'SELECT * FROM info';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching house details:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.addHouse = (req, res) => {
  const sql = "INSERT INTO info (`img`, `title`, `location`, `price`, `bedroom`, `plotarea`, `furnishing`, `carparking`, `water`, `bed`, `blender`, `microwave`, `refrigerator`, `bathroom`, `email`, `phone`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.file.filename,
    req.body.title,
    req.body.location,
    req.body.price,
    req.body.bedroom,
    req.body.plotarea,
    req.body.furnishing,
    req.body.carparking,
    req.body.water,
    req.body.bed,
    req.body.blender,
    req.body.microwave,
    req.body.refrigerator,
    req.body.bathroom,
    req.body.email,
    req.body.phone
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: 'Error inserting data into house_details' });
    }
    console.log('Data inserted into house_details successfully');
    return res.json({ success: true });
  });
};

exports.updateHouse = (req, res) => {
  const { id } = req.query;
  const sql = `
    SELECT i.*, p.houseID, p.First_Name, p.Last_Name, p.mobile, p.address, p.city, p.state, p.zip, p.country 
    FROM info AS i 
    LEFT JOIN payment AS p ON i.ID = p.houseID 
    WHERE i.email = ?`;
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching house and payment details:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.deleteHouse = (req, res) => {
  const houseId = req.params.houseId;
  const sql = 'DELETE FROM info WHERE ID = ?';
  db.query(sql, [houseId], (err, result) => {
    if (err) {
      console.error('Error deleting house details:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'House deleted successfully' });
      } else {
        res.status(404).json({ error: 'House not found' });
      }
    }
  });
};
