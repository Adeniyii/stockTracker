const router = require('express').Router();
const createPortfolio = require('./createPortfolio');

router.use(createPortfolio);

module.exports = router;
