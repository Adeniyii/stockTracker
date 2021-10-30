const router = require('express').Router();
const createPortfolio = require('./createPortfolio');
const getPortfolio = require('./getPortfolio');
const getTotalValue = require('./getTotalValue');

router.use(getPortfolio, createPortfolio, getTotalValue);

module.exports = router;
