const UserModel = require('../../models/user.model');
const { removeUndefined } = require('../../util/removeUndefined');

exports.updateUser = async (user, update) => {
  // remove all fields in the update object
  // with undefined as the value
  const updateObj = removeUndefined(update);

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: user._id },
    updateObj,
    { runValidators: true, context: 'query', new: true },
  ).select(['-password', '-access_token', '-refresh_token', '-is_super_admin']);
  return updatedUser;
};
