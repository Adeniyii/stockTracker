const TradeModel = require('../../models/trade.model');
const { removeUndefined } = require('../../util/removeUndefined');

exports.createTradeService = async (payload) => {
  const sanitizedPayload = removeUndefined(payload);

  const trade = await TradeModel.create(sanitizedPayload);

  return trade;
};
