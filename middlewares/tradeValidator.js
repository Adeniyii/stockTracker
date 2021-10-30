const { body, param, query } = require('express-validator');

/**
 * Validate trade request body
 */
exports.validateBuyStock = () => [
  body('symbol').exists(),
  body('shares').exists(),
  query('portfolio_id').isMongoId(),
  param('user_id').isMongoId(),
];

exports.validatePortfolioPositions = () => [
  param('user_id').isMongoId(),
  query('portfolio_id').isMongoId(),
];
