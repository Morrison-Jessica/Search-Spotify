// 🗄️💙 - this file is for app config 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const routeHandler = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

// config env variables
app.use(morgan('dev'));
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({ 
    origin : ( origin, callback ) => {
        if ( !origin ) {
            return callback( null, true );
        }
        if ( allowedOrigins.includes( origin ) ) {
            return callback( null, true );
        }
        return callback( new Error( "Not allowed by CORS" ) );
    },
    credentials : true,
    })
);

// handle preflight
app.options( /.*/, cors({
    origin: allowedOrigins,
    credentials: true,
}) );
// CREATE dbConfig file and import here
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));



// ========================
// ==== 🗄️🧰MIDDLEWARES ====
// ========================

// JSON data parsing - Must be before route handlers ... 
app.use(express.json());  // this is the req.body res ...
// 🍪
app.use(cookieParser());

// localhost:3000/api/v1/...
app.use('/api/v1', routeHandler);

// Global error handler - Must be after route handlers ...
app.use (errorHandler);

module.exports = app;
