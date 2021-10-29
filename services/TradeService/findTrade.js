const TradeModel = require('../../models/trade.model');

exports.findTradeBySymbol = async (symbol, portfolio_id) => {
  const stock = await TradeModel.findOne({ symbol, portfolio_id });

  return stock;
};

exports.findAllPortfolioTrades = async (portfolio_id) => {
  const stockList = await TradeModel.find({ portfolio_id, shares: { $gt: 0 } });

  return stockList;
};
