const { body, param } = require('express-validator');

/**
 * Validate trade request body
 */
exports.validateBuyStock = () => [
  body('symbol').exists(),
  body('shares').exists(),
  body('portfolio_id').exists(),
  param('user_id').isMongoId(),
];
