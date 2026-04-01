// 🗄️🔄🎟️ - Google OAuth refresh helper
const axios = require("axios");

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

// refresh access token using refresh_token
const refreshAccessToken = async ( refreshToken ) => {
    if ( !refreshToken ) {
        throw new Error( "Missing refresh token" );
    }

    const res = await axios.post( GOOGLE_TOKEN_URL, {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
    } );

    const { access_token, expires_in } = res.data;
    const expires_at = expires_in ? new Date( Date.now() + ( expires_in * 1000 ) ) : null;

    return {
        access_token,
        expires_in,
        expires_at,
    };
};

module.exports = {
    refreshAccessToken,
};
