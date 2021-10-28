const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { getPortfolio } = require('../../controllers/portfolio.controller');
const {
  validateGetPortfolio,
} = require('../../middlewares/portfolioValidator');

router.get('/', auth, validateGetPortfolio(), bodyValidator, getPortfolio);

module.exports = router;
