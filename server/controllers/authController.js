// 💚
// Google Auth lines go here 
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

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

const callback = async (req, res) => {
    res.status(200).json('message From Callback AUTH API');
    
};

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
