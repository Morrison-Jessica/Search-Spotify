// 🎫💚 - GOOGLE OAUTH
const axios = require('axios');
const User = require('../models/model');
const jwt = require('jsonwebtoken');
const { createSpreadsheetForUser } = require('../services/googleSheetsService');
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
        scope: 'profile email https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
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

        // Google token expired? use refresh token to get new access token or user logs in again... 
        const { access_token, expires_in, refresh_token } = tokenResponse.data;
        const hasRefreshToken = Boolean(refresh_token);
        const expires_at = expires_in ? new Date(Date.now() + (expires_in * 1000)) : null;
        
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
                user.expires_at = expires_at;
                if (refresh_token) {
                    user.refresh_token = refresh_token;
                }  // confirms without exposure
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
                    refresh_token,
                    expires_at
                });
                await user.save();
            }
        if (!user.sheetId) {
            try {
                const sheet = await createSpreadsheetForUser({
                    accessToken: access_token,
                    userName: name
                });
                user.sheetId = sheet.spreadsheetId;
                user.sheetUrl = sheet.spreadsheetUrl;
                await user.save();
            } catch (sheetErr) {
                console.error("Google Sheets create error:", sheetErr);
            }
        }
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const appUrl = process.env.APP_URL;
        const redirectUrl = new URL('/dashboard', appUrl);
        redirectUrl.searchParams.set("token", jwtToken);
        const safeUser = {
            id: user._id,
            googleId: user.googleId,
            email: user.email,
            name: user.name,
            picture: user.picture,
            hasRefreshToken
        };
        //res.status(200).json({ message: "Google auth success", success: true, user: safeUser, token: jwtToken });
        return res.redirect(redirectUrl.toString());
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
