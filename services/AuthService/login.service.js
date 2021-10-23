const { generateToken } = require('./generateToken');

/**
 * Service to login a user
 * @param {*} user Payload to sign into jwt.
 * @returns *
 */
exports.loginService = async (user) => {
  const userWithTokens = await generateToken({ user_id: user._id });
  const data = {};
  data.user = userWithTokens;
  return data;
};
