const { findUserById } = require('./findById');
const { sendEmailOtp } = require('./sendOtp');
const { updateUser } = require('./updateUser');
const { verifyOtp } = require('./verifyOtp');

module.exports = { findUserById, updateUser, sendEmailOtp, verifyOtp };
