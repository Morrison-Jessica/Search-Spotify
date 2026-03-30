const { google } = require("googleapis");

const SHEET_TITLE = "Trades";

const buildOAuthClient = () => {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
};

const createSpreadsheetForUser = async ({ accessToken, userName }) => {
    const auth = buildOAuthClient();
    auth.setCredentials({ access_token: accessToken });
    const sheets = google.sheets({ version: "v4", auth });

    const title = userName ? `${userName} Trades` : "User Trades";
    const createRes = await sheets.spreadsheets.create({
        requestBody: {
            properties: { title },
            sheets: [{ properties: { title: SHEET_TITLE } }],
        },
    });

    const spreadsheetId = createRes.data.spreadsheetId;
    const spreadsheetUrl = createRes.data.spreadsheetUrl;

    // Add header row
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TITLE}!A1:C1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [["Date", "User", "Amount"]],
        },
    });

    return { spreadsheetId, spreadsheetUrl };
};

const appendTradeRow = async ({ refreshToken, spreadsheetId, row }) => {
    const auth = buildOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TITLE}!A:C`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [row] },
    });
};

const getTradeRows = async ({ refreshToken, spreadsheetId }) => {
    const auth = buildOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_TITLE}!A:C`,
    });

    return res.data.values || [];
};

module.exports = {
    createSpreadsheetForUser,
    appendTradeRow,
    getTradeRows,
};
