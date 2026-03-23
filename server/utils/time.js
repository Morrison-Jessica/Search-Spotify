// 🕒 - time helpers for token expiry

// ⏳ convert expires_in (seconds) to a real Date
const makeExpiresAt = ( expiresInSeconds ) => {
    // 🧮 get current time in milliseconds
    const nowMs = Date.now();
    // ➕ add seconds (converted to ms) to get expiration time
    const expiresAtMs = nowMs + ( expiresInSeconds * 1000 );
    // 📅 return Date object for DB storage
    return new Date( expiresAtMs );
};

// 📦 export helper for controllers/services
module.exports = {
    makeExpiresAt,
};
