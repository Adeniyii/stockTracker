const PortfolioModel = require('../../models/portfolio.model');

/**
 * Find a single portfolio by name and user_id.
 * @param name
 * @param user_id
 * @returns
 */
exports.findPortfolioByFilter = async (filter) => {
  const portfolio = await PortfolioModel.findOne({ ...filter });

  return portfolio;
};

/**
 * Find a single portfolio by id.
 * @param name
 * @param user_id
 * @returns
 */
exports.findPortfolioById = async (id) => {
  const portfolio = await PortfolioModel.findById(id);

  return portfolio;
};
