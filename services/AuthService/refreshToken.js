const { generateToken } = require('./generateToken');

exports.refreshTokenService = async (user_id) => {
  const tokens = await generateToken({ user_id });
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  };
};
