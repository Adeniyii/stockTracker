const UserModel = require('../../models/user.model');

exports.refreshTokenExists = async (user_id, token) => {
  const refreshTokenUser = await UserModel.findOne({
    _id: user_id,
    refresh_token: token,
  });
  return refreshTokenUser;
};
