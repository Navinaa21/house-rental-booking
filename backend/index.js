const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes.js');
const houseRoutes = require('./routes/houseRoutes.js');
const checkoutRoutes = require('./routes/checkoutRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/checkout', checkoutRoutes);

app.listen(8081, () => {
  console.log('Server is listening on port 8081');
});
