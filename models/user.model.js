const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    last_name: { type: String, default: null },
    first_name: { type: String, default: null },
    email: { type: String, unique: true, sparse: true },
    phone_number: { type: String, unique: true, sparse: true },
    is_super_admin: { type: Boolean, default: false },
    is_2fa_enabled: { type: Boolean, default: false },
    password: { type: String },
    access_token: {
      type: String,
      unique: true,
      sparse: true,
    },
    refresh_token: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

// Format unique index mongo error to readable object
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
