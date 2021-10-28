const router = require('express').Router();
const createPortfolio = require('./createPortfolio');
const getPortfolio = require('./getPortfolio');

router.use(getPortfolio);
router.use(createPortfolio);

module.exports = router;
