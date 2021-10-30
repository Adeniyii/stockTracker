const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { getPortfolioValue } = require('../../controllers/portfolio.controller');
const {
  validateGetPortfolioValue,
} = require('../../middlewares/portfolioValidator');

router.get(
  '/:user_id/value',
  auth,
  validateGetPortfolioValue(),
  bodyValidator,
  getPortfolioValue,
);

module.exports = router;
