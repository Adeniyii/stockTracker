const { validationResult } = require('express-validator');
const AppError = require('../util/appError');

/**
 * Process errors from middleware validations
 * @param req
 * @param res
 * @param next
 * @returns *
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().forEach((err) => {
    if (err.param === 'phone_number') {
      extractedErrors.push({ message: `${err.msg}` });
    } else {
      extractedErrors.push({ message: `${err.param} ${err.msg}` });
    }
  });

  const response = {
    success: false,
    message: 'Request is not valid',
    error: {
      code: 400,
      description: extractedErrors[0].message,
    },
  };

  if (extractedErrors.length > 1) {
    response.error.errors = extractedErrors;
  }

  const err = new AppError(extractedErrors[0].message, 400);
  return next(err);
};
