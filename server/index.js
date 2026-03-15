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


// =====================
// ==== MIDDLEWARES ====
// =====================


// JSON data parsing 
app.use(express.json());

// localhost:3000/api/v1/...
app.use('/api/v1', routeHandler);

module.exports = app;
