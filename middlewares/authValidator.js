const { body, oneOf } = require('express-validator');

/**
 * Validate registration request body
 */
exports.validateUserSignUp = () => [
  oneOf(
    [body('email').isEmail(), body('phone_number').isMobilePhone()],
    'phone_number or email required',
  ),
  body('password').isLength({ min: 6 }),
];

/**
 * Validate login request body
 */
exports.validateUserLogin = () => [
  body('password').exists(),
  oneOf(
    [body('email').isEmail(), body('phone_number').isMobilePhone()],
    'phone_number or email required',
  ),
];

exports.refreshTokenValidation = () => [body('refresh_token').isString()];
