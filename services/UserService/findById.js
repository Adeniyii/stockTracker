const UserModel = require('../../models/user.model');

/**
 * Query database for a user matching _id
 * @param {string} _id User id to look up
 * @returns *
 */
exports.findUserById = async (_id) => {
  const user = await UserModel.findById(_id).select([
    '-password',
    '-access_token',
    '-refresh_token',
  ]);

  return user;
};
