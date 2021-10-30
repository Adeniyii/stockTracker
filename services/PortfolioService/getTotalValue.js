const mongoose = require('mongoose');
const TradeModel = require('../../models/trade.model');

/**
 * Returns the total portfolio value, and cummulative stock value
 * @param portfolio_id
 * @returns *
 */
exports.getTotalPortfolioValue = async (portfolio_id) => {
  const totalValue = await TradeModel.aggregate([
    { $match: { portfolio_id: new mongoose.Types.ObjectId(portfolio_id) } },
    {
      $group: {
        _id: '$symbol',
        totalValue: { $sum: { $multiply: ['$shares', '$purchase_price'] } },
      },
    },
  ]);

  const total = totalValue.reduce(
    (acc, obj) => {
      const _acc = acc;
      _acc.total += obj.totalValue;
      _acc.stockAggregate.push(obj);

      return _acc;
    },
    { total: 0, stockAggregate: [] },
  );

  return total;
};
