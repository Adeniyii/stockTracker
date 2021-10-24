const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const { findUserById } = require('../services/UserService');
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

module.exports = { getSingleUser: catchAsync(getSingleUser) };
