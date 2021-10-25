const { findUserById } = require('./findById');
const { sendEmailOtp } = require('./sendOtp');
const { updateUser } = require('./updateUser');

module.exports = { findUserById, updateUser, sendEmailOtp };
