const { body, param } = require('express-validator');

exports.userIdValidation = () => [param('user_id').isMongoId()];

exports.userUpdateValidationRules = () => [
  param('user_id').isMongoId(),
  body('email').isEmail().optional(),
  body('first_name').isString().optional(),
  body('last_name').isString().optional(),
  body('phone_number').isString().optional(),
];
