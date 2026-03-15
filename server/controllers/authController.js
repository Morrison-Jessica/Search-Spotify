// 💚
const axios = require('axios');
const User = require('../models/model');
// Google Auth lines go here 
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

// ======================
// ======== LOGIN =======
// ======================
// url search params...
// http://localhost:3000/api/v1/auth/login
const login = async (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: 'profile email',
        access_type: 'offline',
        prompt: 'consent'
    });
    const authURL = `${GOOGLE_AUTH_URL}?${params.toString()}`;
    res.redirect(authURL);
    
};

// =========================
// ======== CALLBACK =======
// =========================
const callback = async (req, res) => {
    console.log("===== Callback Check Point 1 =====");

    const { code, error } = req.query;
    //console.log("Query Params:", { code, error });

    if (!code) {
        return res.status(400).json({ message: "Code not found", success: false});
    }

    try {
        const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, { code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: 'authorization_code',
        });

// later, check if google token is expired, if so, use refresh token to get new access token or ask user to login again - "Please login into Google to continue"
        const { access_token, expires_in, refresh_token } = tokenResponse.data;
        
        const userInfoResponse = await axios.get(GOOGLE_USERINFO_URL, { headers: { Authorization: `Bearer ${access_token}` } });

        const { id, email, name, picture } = userInfoResponse.data;

        let user = await User.findOne({ googleId: id });

            if (user) {
                // Update existing user
                user.email = email;
                user.name = name;
                user.picture = picture;
                user.access_token = access_token;
                user.expires_in = expires_in;
                user.refresh_token = refresh_token;
                await user.save();
            } else {
                // Create new user
                user = new User({
                    googleId: id,
                    email,
                    name,
                    picture,
                    access_token,
                    expires_in,
                    refresh_token
                });
                await user.save();
            }
        const safeUser = {
            id: user._id,
            googleId: user.googleId,
            email: user.email,
            name: user.name,
            picture: user.picture
        };
        res.status(200).json({ message: "Google auth success", success: true, user: safeUser });
    } catch (err) {
        console.error("Google OAuth callback error:", err);
        res.status(500).json({ message: "Google auth failed", success: false });
    }
};  // END CALLBACK
// =======================
// ======== LOGOUT =======
// =======================
const logout = async (req, res) => {
    res.status(200).json('message From Logout AUTH API');

};

module.exports = {
    login, 
    callback,
    logout
};

// calback

// logout


// module.exports
