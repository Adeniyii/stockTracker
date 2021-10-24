const jwt = require('jsonwebtoken');
const UserModel = require('../../models/user.model');

/**
 * Generate refresh & access tokens, and update user.
 * @param {*} payload Data to sign into a jwt
 * @returns *
 */
exports.generateToken = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '2h',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: '7d',
  });

  // Save the user's new tokens
  const userWithTokens = await UserModel.findOneAndUpdate(
    { _id: payload.user_id },
    { refresh_token: refreshToken, access_token: accessToken },
    { runValidators: true, context: 'query', new: true },
  ).select(['-password']);

  return userWithTokens;
};
