// 💛
const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  picture: String
});
const User = mongoose.model('User', userInfo);

module.exports = User;
