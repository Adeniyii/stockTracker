const TradeModel = require('../../models/trade.model');

exports.findTradeBySymbol = async (symbol, portfolio_id) => {
  const stock = await TradeModel.findOne({ symbol, portfolio_id });

  return stock;
};
