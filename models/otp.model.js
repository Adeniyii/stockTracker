const mongoose = require('mongoose');

// Records the OTP that is sent during the login
// process.
const otpSchema = new mongoose.Schema({
  otp_code: {
    type: String,
    required: true,
  },
  otp_type: {
    type: String,
    enum: ['sms', 'email'],
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  created_at: { type: Date, expires: '2m', default: Date.now },
});

module.exports = mongoose.model('otp', otpSchema);
