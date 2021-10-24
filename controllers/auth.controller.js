const bcrypt = require('bcryptjs');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const { successResponse } = require('../util/response_handler');
const { loginService } = require('../services/AuthService/login.service');
const { signUpService } = require('../services/AuthService/signup.service');
const { userExists } = require('../services/AuthService/userExists.service');

/**
 * Registers a user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void|*>}
 */
const signUp = async (req, res, next) => {
  const { email, phone_number } = req.body;

  const duplicateUser = await userExists(email, phone_number);

  if (duplicateUser) {
    const err = new AppError('User already exists', 409);
    return next(err);
  }

  const user = await signUpService(req.body);

  // TODO: send email or sms that a new user just signed up

  return successResponse(res, 201, user);
};

/**
 * Signs in a user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void|*>}
 */
const login = async (req, res, next) => {
  const { email, phone_number, password } = req.body;

  const user = await userExists(email, phone_number);
  const isMatched = user && (await bcrypt.compare(password, user.password));

  if (user && isMatched) {
    const signedInUser = await loginService(user);

    // TODO: Send email or sms on user sign in.

    return successResponse(res, 201, signedInUser);
  }
  // If user does not exist
  const err = new AppError('Invalid Credentials', 401);
  return next(err);
};

module.exports = { login: catchAsync(login), signUp: catchAsync(signUp) };
