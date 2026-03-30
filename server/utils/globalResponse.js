// 🗄️🛠️ - utils.js need to be invoked, middleware.js runs on auto
const sendResponse = ( res, { status = 200, success = true, message = "Success", data = null }) => {
        return res.status( status ).json({
            success,
            message,
            data,
        });
    };
module.exports = { sendResponse };
