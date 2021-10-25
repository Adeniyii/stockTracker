const Otp = require('../../models/otp.model');

/**
 * Validate provided OTP
 * @param {string} user_id User's id
 * @param {string} otp_code User's verification code
 * @returns *
 */
exports.verifyOtp = async (user_id, otp_code) => {
  let isSuccessful = false;

  const otp = await Otp.findOne({
    user_id,
    otp_code,
  });

  if (otp) {
    isSuccessful = true;
  }
  return isSuccessful;
};
