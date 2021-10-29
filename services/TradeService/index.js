const { createTradeService } = require('./create');
const { findTradeBySymbol, findAllPortfolioTrades } = require('./findTrade');
const { updateTradeService } = require('./updateTrade');

module.exports = {
  findTradeBySymbol,
  createTradeService,
  updateTradeService,
  findAllPortfolioTrades,
};
