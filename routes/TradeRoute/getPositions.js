const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const {
  getPortfolioPositions,
} = require('../../controllers/portfolio.controller');
const {
  validatePortfolioPositions,
} = require('../../middlewares/tradeValidator');

router.get(
  '/:user_id/positions',
  auth,
  validatePortfolioPositions(),
  bodyValidator,
  getPortfolioPositions,
);

module.exports = router;
