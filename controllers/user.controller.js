const bcrypt = require('bcryptjs');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const { findUserById, updateUser } = require('../services/UserService');
const { successResponse } = require('../util/response_handler');

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

  let { phone_number, email, password, first_name, last_name } = req.body;

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
  };
  // Update user document
  const updated = await updateUser(requestedUser, update);
  return successResponse(res, 200, { user: updated });
};

// Exports
module.exports = {
  getSingleUser: catchAsync(getSingleUser),
  updateSingleUser: catchAsync(updateSingleUser),
};
