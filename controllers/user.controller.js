const bcrypt = require('bcryptjs');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const successResponse = require('../util/successHandler');
const {
  findUserById,
  updateUser,
  sendEmailOtp,
  verifyOtp,
} = require('../services/UserService');

/**
 * Find a user.
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const getSingleUser = async (req, res, next) => {
  const { user_id } = req.params;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can access users with a different id from theirs
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  const requestedUser = await findUserById(user_id);
  if (!requestedUser) {
    return next(new AppError('User not found', 404));
  }
  return successResponse(res, 200, { user: requestedUser });
};

/**
 * Update a single user.
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const updateSingleUser = async (req, res, next) => {
  const { user_id } = req.params;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can update users with a different id from theirs
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  // Retrieve user to update
  const requestedUser = await findUserById(user_id);
  if (!requestedUser) {
    return next(new AppError('User not found', 404));
  }

  let { phone_number, email, password, first_name, last_name, is_2fa_enabled } =
    req.body;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  // Updated payload
  const update = {
    phone_number,
    email,
    first_name,
    last_name,
    password,
    is_2fa_enabled,
  };
  // Update user document
  const updated = await updateUser(requestedUser, update);
  return successResponse(res, 200, { user: updated });
};

/**
 * Send OTP to user
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const activateUser = async (req, res, next) => {
  const { user_id } = req.params;
  const { email, phone_number } = req.body;

  const requestingUser = await findUserById(req.user.user_id);
  // only super admins can send an OTP on behalf of a user
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  const requestedUser = await findUserById(user_id);
  if (!requestedUser) {
    return next(new AppError('User not found', 404));
  }

  // Check if 2FA is enabled for user
  if (requestedUser.is_2fa_enabled === false) {
    return next(new AppError('Two-factor authentication is disabled', 405));
  }

  let isSent;

  if (email && requestedUser.email === email) {
    isSent = await sendEmailOtp(user_id, email);
  } else if (
    phone_number &&
    requestedUser.phone_number === Number(phone_number) &&
    !email
  ) {
    // isSent = await sendSmsOtp(user_id, phone_number);
    isSent = false;
  } else {
    return next(new AppError("Couldn't send OTP", 400));
  }

  if (!isSent) {
    return next(new AppError('OTP not sent', 500));
  }
  return successResponse(res, 204);
};

/**
 * Verify OTP provided by user
 * @param req
 * @param res
 * @param next
 * @returns *
 */
const verifyActivationCode = async (req, res, next) => {
  const { user_id } = req.params;
  const { otp } = req.body;

  const requestingUser = await findUserById(req.user.user_id);

  // only super admins can send an OTP on behalf of a user
  if (req.user.user_id !== user_id && requestingUser.is_super_admin === false) {
    return next(new AppError('Permission denied', 403));
  }

  const requestedUser = await findUserById(user_id);

  if (!requestedUser) {
    return next(new AppError('User not found', 404));
  }

  // Check if 2FA is enabled for user
  if (requestedUser.is_2fa_enabled === false) {
    return next(new AppError('Two-factor authentication is disabled', 405));
  }

  // Verify OTP
  const isVerified = await verifyOtp(user_id, otp);

  if (!isVerified) {
    return next(new AppError('OTP not found', 404));
  }

  return successResponse(res, 204);
};

// Exports
module.exports = {
  activateUser: catchAsync(activateUser),
  getSingleUser: catchAsync(getSingleUser),
  updateSingleUser: catchAsync(updateSingleUser),
  verifyActivationCode: catchAsync(verifyActivationCode),
};
