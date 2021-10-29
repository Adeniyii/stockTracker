const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { purchaseStock } = require('../../controllers/portfolio.controller');
const { validateBuyStock } = require('../../middlewares/tradeValidator');

router.post(
  '/:user_id',
  auth,
  validateBuyStock(),
  bodyValidator,
  purchaseStock,
);

module.exports = router;
