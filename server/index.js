// 💙 - this file is for app config 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const routeHandler = require('./routes');

app.use(morgan('dev'));
app.use(cors({ 
    origin : process.env.CLIENT_URL,
    credentials : true,
    })
);
// CREATE dbConfig file and import here
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


// ========================
// ==== 💙 MIDDLEWARES ====
// ========================


// JSON data parsing - Must be before route handlers ... 
app.use(express.json());  // this is the req.body res ...

// Global error handling
const errorHandler = (err, req, res, next) => {
    //console.error("Global error handler:", err);
    //res.status(500).json({ message: "Internal 
    //Server Error", success: false });
    // error response is the "throw new Error" in controller functions ... 

}


// localhost:3000/api/v1/...
app.use('/api/v1', routeHandler);

// err, req, res, next TEST
app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });

});
module.exports = app;
