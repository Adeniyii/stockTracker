const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user.model');
const { generateToken } = require('./generateToken');

/**
 * Handle user sign-up
 * @param {*} body Registration details for new user
 * @returns *
 */
exports.signUpService = async (body) => {
  let { password, phone_number, email } = body;
  password = await bcrypt.hash(body.password, 10);
  const user = await UserModel.create({
    password,
    phone_number,
    email,
  });

  const userWithToken = generateToken({ user_id: user._id });

  const data = {};
  data.user = userWithToken;
  return data;
};

// TODO: Add refresh and Access token to new users.
