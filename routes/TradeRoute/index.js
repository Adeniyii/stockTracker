const router = require('express').Router();
const buyStock = require('./buyStock');

router.use(buyStock);

module.exports = router;
