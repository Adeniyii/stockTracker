/* eslint-disable no-unused-expressions */
const { body, oneOf } = require('express-validator');

/**
 * Validate registration request body
 */
exports.validateUserSignIn = () => [
  body('password').exists(),
  oneOf([
    body('email').isEmail(),
    body('phone_number').isMobilePhone(),
    'Phone number or email required',
  ]),
];
