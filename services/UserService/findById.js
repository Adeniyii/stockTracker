const UserModel = require('../../models/user.model');

exports.findUserById = async (_id) => {
  const user = await UserModel.findById(_id).select([
    '-password',
    '-access_token',
    '-refresh_token',
  ]);

  return user;
};
