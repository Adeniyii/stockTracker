const UserModel = require('../../models/user.model');

/**
 * Check if a user exists.
 * @param {string} email User's email
 * @param {string} phone_number User's phone number
 * @returns *
 */
exports.userExists = async (email, phone_number) => {
  let user;
  if (email && !phone_number) {
    user = await UserModel.findOne({
      email,
    });
  } else if (phone_number && !email) {
    user = await UserModel.findOne({
      phone_number,
    });
  } else if (email && phone_number) {
    user = await UserModel.findOne({
      $or: [{ email }, { phone_number }],
    });
  }

  return user;
};
