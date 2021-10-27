const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    default: 10000,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
