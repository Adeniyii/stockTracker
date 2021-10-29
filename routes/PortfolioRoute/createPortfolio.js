const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { createPortfolio } = require('../../controllers/portfolio.controller');
const {
  validateCreatePortfolio,
} = require('../../middlewares/portfolioValidator');

router.post(
  '/create/:user_id',
  auth,
  validateCreatePortfolio(),
  bodyValidator,
  createPortfolio,
);

module.exports = router;
