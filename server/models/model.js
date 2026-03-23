// 💛
const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  picture: String,
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  expires_at: Date
});
const User = mongoose.model('User', userInfo);

module.exports = User;
