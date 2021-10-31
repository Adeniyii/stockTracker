const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const successResponse = require('../util/successHandler');
const {
  userExists,
  loginService,
  signUpService,
  refreshTokenExists,
  refreshTokenService,
} = require('../services/AuthService');

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

/**
 * Refreshes users access and refresh tokens
 * @param req
 * @param res
 * @param next
 */
const refreshToken = async (req, res, next) => {
  const { refresh_token } = req.body;
  // eslint-disable-next-line consistent-return
  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_KEY,
    async (err, decoded) => {
      if (err) {
        return next(new AppError('Invalid token', 401));
      }
      // make sure the user has not generated another refresh token already
      const existingToken = await refreshTokenExists(
        decoded.user_id,
        refresh_token,
      );
      if (!existingToken) {
        return next(new AppError('Invalid token', 401));
      }
      const tokens = await refreshTokenService(decoded.user_id);
      return successResponse(res, 200, { tokens });
    },
  );
};

module.exports = {
  login: catchAsync(login),
  signUp: catchAsync(signUp),
  refreshToken: catchAsync(refreshToken),
};
