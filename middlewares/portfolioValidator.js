const { body, param, query } = require('express-validator');

/**
 * Validate registration request body
 */
exports.validateCreatePortfolio = () => [
  body('name').exists(),
  param('user_id').isMongoId(),
];

exports.validateGetPortfolio = () => [
  query('portfolio_id').isMongoId(),
  param('user_id').isMongoId(),
];

exports.validateGetPortfolioValue = () => [
  query('portfolio_id').isMongoId(),
  param('user_id').isMongoId(),
];

exports.validateGetAllPortfolio = () => [param('user_id').isMongoId()];
