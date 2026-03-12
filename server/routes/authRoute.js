// 💜
const express = require('express');
const router = express.Router();


const { login, logout, callback } = require("../controllers/authController");

router.get("/login", login);
router.get("/callback", callback);
router.get("/logout", logout);

module.exports = router;


// Build backend routes.
// /auth/google
// /auth/google/callback
// /api/users
// /api/auth/me


// 🧩 Quick dev tip (saves a LOT of pain)
// Many developers temporarily add a mock login route.
// Example:
// POST /auth/dev-login
// res.json({
//   id: "123",
//   email: "dev@test.com"
// });
// This lets you test everything else before Google OAuth works.
// Then remove it later.
