// 💛
const express = require('express');
const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  picture: String


  
});






module.exports = userInfo;