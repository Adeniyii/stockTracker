const bcrypt = require('bcryptjs');
// eslint-disable-next-line no-unused-vars
const { request, response, NextFunction } = require('express');
const { loginService } = require('../services/AuthService/login.service');
const { signUpService } = require('../services/AuthService/signup.service');
const { userExists } = require('../services/AuthService/userExists.service');
const { errorResponse, successResponse } = require('../util/response_handler');

/**
 * Sign up a user
 * @param {request} req Express request object
 * @param {response} res Express response onject
 * @param {NextFunction} next Next function
 * @returns *
 */
exports.signUp = async (req, res, next) => {
  const { email, phone_number } = req.body;

  try {
    const duplicateUser = await userExists(email, phone_number);
    if (duplicateUser) {
      return errorResponse(res, 'User already exists', 409);
    }

    const user = await signUpService(req.body);

    // TODO: send email or sms that a new user just signed up

    return successResponse(res, 201, user);
  } catch (error) {
    errorResponse(res, 'Something went wrong', 500);
    return next(error);
  }
};

/**
 * Sign in a user
 * @param {request} req Express request object
 * @param {response} res Express response onject
 * @param {NextFunction} next Next function
 * @returns *
 */
exports.signIn = async (req, res, next) => {
  const { email, phone_number, password } = req.body;

  try {
    const user = await userExists(email, phone_number);
    const isMatched = await bcrypt.compare(password, user.password);

    if (user && isMatched) {
      const signedInUser = loginService(user);

      // TODO: Send email or sms on user sign in.

      return successResponse(res, 201, signedInUser);
    }
    return errorResponse(res, 'Invalid credentials', 401);
  } catch (error) {
    errorResponse(res, 'Something went wrong', 500);
    return next(error);
  }
};
