// 💜
const express = require("express");
const router = express.Router();
const authRouter = require('./authRoute');

router.use("/auth", authRouter);





// express
// router


// const -> controller

// router.get - login
// router.get - callback
// router.get - logout

module.exports = router;
