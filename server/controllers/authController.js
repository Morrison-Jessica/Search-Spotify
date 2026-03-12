// 💚
// Google Auth lines go here 
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

// url search params...
// login
const login = async (req, res) => {
    res.status(200).json('message', 'From AUTH API');
    
};

const callback = async (req, res) => {
    res.status(200).json('message' , 'From AUTH API');
    
};

const logout = async (req, res) => {
    res.status(200).json('message' , 'From AUTH API');

};

module.exports = {
    login, 
    callback,
    logout
};

// calback

// logout


// module.exports
