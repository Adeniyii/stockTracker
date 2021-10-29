const { body, param } = require('express-validator');

/**
 * Validate registration request body
 */
exports.validateCreatePortfolio = () => [
  body('name').exists(),
  body('user_id').isMongoId(),
];

exports.validateGetPortfolio = () => [
  param('portfolio_id').isMongoId(),
  body('user_id').isMongoId(),
];

exports.validateGetAllPortfolio = () => [param('user_id').isMongoId()];
