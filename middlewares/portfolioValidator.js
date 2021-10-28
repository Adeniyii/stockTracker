const { body } = require('express-validator');

/**
 * Validate registration request body
 */
exports.validateCreatePortfolio = () => [
  body('name').exists(),
  body('user_id').isMongoId(),
];
