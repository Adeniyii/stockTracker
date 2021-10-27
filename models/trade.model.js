const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  purchase_price: {
    type: Number,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  portfolio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'portfolio',
  },
  purchase_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Trade', tradeSchema);
