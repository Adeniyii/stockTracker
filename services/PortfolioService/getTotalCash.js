const PortfolioModel = require('../../models/portfolio.model');

exports.getTotalCash = async (user_id, portfolio_id) => {
  const cashLeft = await PortfolioModel.findOne({
    user_id,
    _id: portfolio_id,
  }).select(['cash']);

  return cashLeft;
};
