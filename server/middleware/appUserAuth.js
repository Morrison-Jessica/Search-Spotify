// 🧰 - Handles user auth tokens ( access & refresh ) 
// express Validator ??? 
// App session - routes req auth

// add header to request, header = JWT
const jwt = require ( "jsonwebtoken" ); // 🔐 JWT verify helper (from jsonwebtoken)
const User = require ( "../models/model" ); // 🧑‍💻 User model (from models/model.js)
// =========================================================
// for later - to verify tokens
// const { refreshAccessToken } = require( "../services/googleAuthService" );
// =========================================================


// ***********************************************************
// this is imported in routes/index.js - for all routes requiring auth
//const isAuth = (req, res, next) => {
    // const appAuthHandler = req.headers["authorization"];
    // const token = authHeader.split(" ")[1];
    // 📬Postman: Auth - select Bearer Token from dropdown
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log ... 
// ***********************************************************

// protect routes, refresh if needed
const appUserAuth = async ( req, res, next ) => {
// 1. check for access token in header
    try {
        // 📬 read auth header from request (from client)
        const authHeader = req.headers[ "authorization" ];

        // 🚫 block if no auth header (no JWT sent)
        if ( !authHeader ) {
            return res.status ( 401 ).json({ 
                success: false,  // ❌ shows as failed
                message: "Missing Authorization header",
            });
        }

        // 🧩 split "Bearer <token>" to get the token only
        const token = authHeader.split( " " )[ 1 ];

        // 🚫 block if token missing after split
        if ( !token ) {
            return res.status ( 401 ).json({ 
                success: false,  // ❌ shows as failed
                message: "Missing JWT token",
            });
        }

        // 🔍 verify JWT with secret (from .env)
        let decoded;
        try {
            decoded = jwt.verify( token, process.env.JWT_SECRET );
        } catch ( err ) {
            return res.status ( 401 ).json({ 
                success: false,  // ❌ shows as failed
                message: "Invalid or expired JWT",
            });
        }

        // 🧾 get userId from decoded JWT payload
        const userId = decoded.userId || decoded.id;

        // block if no user ID
        if ( !userId ) {
            return res.status ( 401 ).json({ success: false,
                message: "Not Authenticated",
             });
        }  // end if
// 2. find user in db
        const user = await User.findById( userId );
        // Block if not found
        if ( !user ) {
            return res.status ( 401 ).json({ 
                success: false,
                message: "User Not Found",
            });
        } // end if 
// 3. check valid/expired
        const now = new Date ();
        const expiresAt = user.expires_at;

        // valid? -> continue
        if ( expiresAt && expiresAt > now ) {
            // controllers can use data
            req.user = user;
            return next();
        };

// ========== REFRESH LOGIC =================================
// 4. expired ? => refresh_token
        // const newTokens = await refreshAccessToken( user.refresh_token );

        // save new access token & expires_at
        // user.access_token = newTokens.access_token;
        // user.expires_at = newTokens.expires_at;
        // await user.save();

        // continue after refresh
        // req.user = user;
        // return next();
// ===========================================================

        // temp block - until refresh logic
        return res.status ( 401 ).json({
            success: false,
            message: "Token Expired",
        });
    // end try
    }  catch ( err ) {
        // send error to global handler
        next( err);
    }
};  // end appUserAuth

module.exports = appUserAuth;

// *******************************************************
// find user db, check if valid
     //const user = await User.findById(decoded.id);
    // console.log ...

    // if (!user.acess_token) {
    //    res.status(401).json({ message: "Unauthorized", success: false });
    // }

    // "expires in" logic
    // 
// ********************************************************
