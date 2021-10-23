const jwt = require('jsonwebtoken');
const UserModel = require('../../models/user.model');

exports.genarateToken = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '2h',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: '7d',
  });

  // Save the user's new tokens
  const userWithTokens = await UserModel.findOneAndUpdate(
    { _id: payload.user_id },
    { refreshToken, accessToken },
    { runValidators: true, context: 'query', new: true },
  ).select(['-password']);

  return userWithTokens;
};
