const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const tradeSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  purchase_price: { type: Number, required: true },
  shares: { type: Number, required: true },
  portfolio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'portfolio' },
  purchase_date: { type: Date, default: Date.now },
});

tradeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Trade', tradeSchema);
