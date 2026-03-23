// ❌ - global error handler. Recieves err from asyncWrap.js
const errorHandler = ( err, req, res, next) => {
    // log error in console
    console.error("💥 Global Error: ", err );

    // use status code or default to 500
    const status = err.status || 500;
    // use error message or default message
    const message = err.message || "Something went wrong 🤷🏻‍♀️";

    // consistent JSON response 
    res.status (status).json ({
        success: false,  // shows as failed
        message,  // readable error message
    });
};

// export to use in server.js
module.exports = errorHandler;