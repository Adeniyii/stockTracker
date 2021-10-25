const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    name: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
