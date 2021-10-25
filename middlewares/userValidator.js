const { body, param, oneOf } = require('express-validator');

exports.userIdValidation = () => [param('user_id').isMongoId()];

exports.userUpdateValidation = () => [
  param('user_id').isMongoId(),
  body('email').isEmail().optional(),
  body('first_name').isString().optional(),
  body('last_name').isString().optional(),
  body('phone_number').isString().optional(),
  body('is_2fa_enabled').isBoolean().optional(),
];

exports.userActivationValidation = () => [
  param('user_id').isMongoId(),
  oneOf(
    [body('email').isEmail(), body('phone_number').isMobilePhone()],
    'phone_number or email is required',
  ),
];

exports.verifyOtpValidation = () => [
  param('user_id').isMongoId(),
  body('otp').isString(),
];
