const PortfolioModel = require('../../models/portfolio.model');

exports.createPortfolioService = async (name, user_id) => {
  const payload = {
    name,
    user_id,
  };
  const portfolio = await PortfolioModel.create(payload);
  return portfolio;
};
