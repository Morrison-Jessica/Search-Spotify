// 🗄️💜 index - imports all routes "App Global"
const express = require("express");
const router = express.Router();
const authRouter = require('./authRoute');
const appUserAuth = require('../middleware/appUserAuth');
const appRouter = require('./appRoutes');


router.use("/auth", authRouter);
router.use("/app", appUserAuth, appRouter);


// ==== appUserAuth Middleware called ====
//router.use("/", appUserAuth, ...);  // app func 





// const -> controller

// router.get - login
// router.get - callback
// router.get - logout

module.exports = router;
