const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user.model');

/**
 * Handle user sign-up
 * @param {{*}} body Registration details for new user
 * @returns *
 */
exports.signUpService = async (body) => {
  let { password, phone_number, email, state, country } = body;
  password = await bcrypt.hash(body.password, 10);
  const user = await UserModel.create({
    password,
    phone_number,
    email,
    state,
    country,
  });

  return user;
};

// TODO: Add refresh and Access token to new users.
