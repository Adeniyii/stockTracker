const TradeModel = require('../../models/trade.model');
const { removeUndefined } = require('../../util/removeUndefined');

exports.updateTradeService = async (symbol, portfolio_id, payload) => {
  const sanitizedPayload = removeUndefined(payload);

  const userWithTokens = await TradeModel.findOneAndUpdate(
    { symbol, portfolio_id },
    { ...sanitizedPayload },
    { new: true },
  );

  return userWithTokens;
};
