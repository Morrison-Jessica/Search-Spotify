// 🗄️🧰 - Handles user auth tokens ( access & refresh ) 
// 🔐add header/bearer token to request, header = JWT verify helper (from jsonwebtoken) 
const jwt = require ( "jsonwebtoken" ); 
// 🧑‍💻 User model (from models/model.js)
const User = require ( "../models/model" ); 
// 🎟️to verify tokens
const { refreshAccessToken } = require( "../services/googleAuthService" );
// =========================================================


// 🎟️App session - routes req auth
// protect routes, refresh if needed
const appUserAuth = async ( req, res, next ) => {
// 1. check for access token in cookie
    try {
        // 🍪 read JWT from cookie (from client)
        const token = req.cookies?.token;

        if ( !token ) {
            return res.status ( 401 ).json({ 
                success: false,  // ❌ shows as failed
                message: "Missing JWT token",
            });
        }

        // ✅ verify JWT with secret (from .env)
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

        if ( !userId ) {
            return res.status ( 401 ).json({ 
                success: false,
                message: "Not Authenticated",
            });
        }  // end if

// 2. find user in db
        const user = await User.findById( userId );

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

// ========== 🔄REFRESH LOGIC =================================
// 4. expired ? => refresh_token
        const newTokens = await refreshAccessToken( user.refresh_token );

        // 💮save new access token & expires_at
        user.access_token = newTokens.access_token;
        user.expires_at = newTokens.expires_at;
        await user.save();

        // continue after refresh
        req.user = user;
        return next();
    // end try
    }  catch ( err ) {
        // send error to global handler
        next( err);
    }
};  // end appUserAuth

module.exports = appUserAuth;
