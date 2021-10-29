const PortfolioModel = require('../../models/portfolio.model');

/**
 * Find a single portfolio by a filter.
 * @param filter
 * @returns *
 */
exports.findPortfolioByFilter = async (filter) => {
  const portfolio = await PortfolioModel.findOne({ ...filter });

  return portfolio;
};

/**
 * Find a single portfolio by id.
 * @param user_id
 * @returns
 */
exports.findPortfolioById = async (id) => {
  const portfolio = await PortfolioModel.findById(id);

  return portfolio;
};

/**
 * Find all portfolio by user_id.
 * @param user_id
 * @returns
 */
exports.findAllPortfolio = async (user_id) => {
  const portfolio = await PortfolioModel.find({ user_id });

  return portfolio;
};
