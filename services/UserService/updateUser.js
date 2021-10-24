const UserModel = require('../../models/user.model');

exports.updateUser = async (user, update) => {
  // remove all fields in the update object
  // with undefined as the value
  const updateObj = Object.keys(update).reduce((acc, key) => {
    const _acc = acc;
    if (update[key] !== undefined) {
      _acc[key] = update[key];
    }
    return _acc;
  }, {});

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: user._id },
    updateObj,
    { runValidators: true, context: 'query', new: true },
  ).select(['-password', '-access_token', '-refresh_token', '-is_super_admin']);
  return updatedUser;
};
