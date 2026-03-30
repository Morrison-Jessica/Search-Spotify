// 🧰 - asyncWrap for try/catch route handler
const asyncWrap = ( fn ) => {
    // returns new function
    return ( req, res, next ) => {
        // conroller errors pass to next() -> errorHandler.js
        Promise.resolve( fn( req, res, next )).catch( next ); // sends error to next() -> errorHandler.js
    };
};

// export to use in routes & controllers
module.exports = asyncWrap;