// 🗄️💙 - this file is for app config 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const routeHandler = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// config env variables
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
// ==== 🗄️🧰MIDDLEWARES ====
// ========================

// JSON data parsing - Must be before route handlers ... 
app.use(express.json());  // this is the req.body res ...

// localhost:3000/api/v1/...
app.use('/api/v1', routeHandler);

// Global error handler - Must be after route handlers ...
app.use (errorHandler);

module.exports = app;
