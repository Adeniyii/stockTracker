const PortfolioModel = require('../../models/portfolio.model');
const { removeUndefined } = require('../../util/removeUndefined');

exports.updatePortfolio = async (_id, user_id, update) => {
  // remove all fields in the update object
  // with undefined as the value
  const updateObj = removeUndefined(update);

  const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
    { _id, user_id },
    updateObj,
    { new: true },
  );

  return updatedPortfolio;
};
