/* eslint-disable no-unused-expressions */
const { body, oneOf } = require('express-validator');

/**
 * Validate registration request body
 */
exports.validateUserSignIn = () => [
  oneOf(
    [body('email').isEmail(), body('phone_number').isMobilePhone()],
    'phone_number or email required',
  ),
  body('password').isLength({ min: 6 }),
];
