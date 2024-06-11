const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController.js');

router.get('/', houseController.getHouses);
router.post('/', houseController.upload.single('img'), houseController.addHouse);
router.get('/update', houseController.updateHouse);
router.delete('/:houseId', houseController.deleteHouse);

module.exports = router;
