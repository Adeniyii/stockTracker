const router = require('express').Router();
const buyStock = require('./buyStock');
const getPositions = require('./getPositions');

router.use(buyStock, getPositions);

module.exports = router;
