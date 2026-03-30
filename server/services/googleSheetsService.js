// 🗄️👩🏻‍🔧 - backend services
// 📗 Google Sheets API helper 
const { google } = require("googleapis"); // 📦 Google API client

// 🔖 Sheet tab name (must match the tab in Google Sheets)
const SHEET_TITLE = "Trades";

// 🔐 Create OAuth client using .env credentials
const buildOAuthClient = () => {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID, // 🪪 client id
        process.env.GOOGLE_CLIENT_SECRET, // 🔑 client secret
        process.env.GOOGLE_REDIRECT_URI // 🔁 redirect uri
    );
};

// =========================
// ===== CREATE SHEET ======
// =========================
const createSpreadsheetForUser = async ({ accessToken, userName }) => {
    const auth = buildOAuthClient(); // build client
    auth.setCredentials({ access_token: accessToken }); // 🔐 use access token
    const sheets = google.sheets({ version: "v4", auth }); // 📗 sheets API

    const title = userName ? `${userName} Trades` : "User Trades"; // 🏷️ sheet name
    const createRes = await sheets.spreadsheets.create({
        requestBody: {
            properties: { title }, // 🏷️ file name
            sheets: [{ properties: { title: SHEET_TITLE } }], // 📄 tab name
        },
    });

    const spreadsheetId = createRes.data.spreadsheetId; // 🆔 sheet id
    const spreadsheetUrl = createRes.data.spreadsheetUrl; // 🔗 sheet url

    //  add header row for SheetDB + clarity
    await sheets.spreadsheets.values.append({
        spreadsheetId, // 🆔 sheet id
        range: `${SHEET_TITLE}!A1:C1`, //  header range
        valueInputOption: "USER_ENTERED", //  allow formatting
        requestBody: {
            values: [["Date", "User", "Amount"]], // 🧾 column names
        },
    });

    return { spreadsheetId, spreadsheetUrl }; // ✅ return ids
};

// =========================
// ===== APPEND ROW ========
// =========================
const appendTradeRow = async ({ refreshToken, spreadsheetId, row }) => {
    const auth = buildOAuthClient(); //  build client
    auth.setCredentials({ refresh_token: refreshToken }); // 🔐 use refresh token
    const sheets = google.sheets({ version: "v4", auth }); // 📗 sheets API

    await sheets.spreadsheets.values.append({
        spreadsheetId, // 🆔 sheet id
        range: `${SHEET_TITLE}!A:C`, //  append to columns A-C
        valueInputOption: "USER_ENTERED", // allow formatting
        insertDataOption: "INSERT_ROWS", //  add new row
        requestBody: { values: [row] }, //  row data
    });
};

// =========================
// ====== READ ROWS ========
// =========================
const getTradeRows = async ({ refreshToken, spreadsheetId }) => {
    const auth = buildOAuthClient(); //  build client
    auth.setCredentials({ refresh_token: refreshToken }); //  use refresh token
    const sheets = google.sheets({ version: "v4", auth }); //  sheets API

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId, // 🆔 sheet id
        range: `${SHEET_TITLE}!A:C`, //  read columns A-C
    });

    return res.data.values || []; //  rows
};

module.exports = {
    createSpreadsheetForUser,
    appendTradeRow,
    getTradeRows,
};
