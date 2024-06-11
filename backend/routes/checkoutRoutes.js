const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController.js');

router.get('/', checkoutController.getCheckout);
router.post('/', checkoutController.postCheckout);

module.exports = router;
