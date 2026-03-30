// 🗄️📱💜  for app routes...
// Establish route endpoints here ... use endpoint name in controller.js 
const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const { getDashboard, getTrades, createTrade } = require('../controllers/appController');

// ===== Dashboard =====
router.get('/dashboard', asyncWrap(getDashboard));

// ===== Trades =====
router.get('/trades', asyncWrap(getTrades));
router.post('/trades', asyncWrap(createTrade));

module.exports = router;
