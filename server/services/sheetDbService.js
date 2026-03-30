// 🧾📗 - SheetDB helper
const axios = require("axios");

const SHEET_TAB = "Trades";

const createRow = async ({ sheetDbUrl, date, userName, amount }) => {
    if (!sheetDbUrl) {
        throw new Error("Missing SheetDB URL");
    }

    const payload = {
        sheet: SHEET_TAB,
        data: [
            {
                Date: date,
                User: userName,
                Amount: amount,
            },
        ],
    };

    const res = await axios.post(sheetDbUrl, payload);
    return res.data;
};

module.exports = {
    createRow,
};
