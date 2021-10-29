const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const {
  getSinglePortfolio,
  getAllPortfolio,
} = require('../../controllers/portfolio.controller');
const {
  validateGetPortfolio,
  validateGetAllPortfolio,
} = require('../../middlewares/portfolioValidator');

router.get(
  '/:user_id/all',
  auth,
  validateGetAllPortfolio(),
  bodyValidator,
  getAllPortfolio,
);
router.get(
  '/:portfolio_id',
  auth,
  validateGetPortfolio(),
  bodyValidator,
  getSinglePortfolio,
);

module.exports = router;
