// 🗄️📱💚 - for app functions...
const { getTradeRows } = require("../services/googleSheetsService");
const { createRow } = require("../services/sheetDbService");

// =========================
// ===== DASHBOARD =========
// =========================
const getDashboard = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Dashboard placeholder",
        data: {
            bestDay: "+$0",
            worstDay: "$0",
            winRate: "0%",
            weeklyPnL: [],
            monthlyPnL: [],
        },
    });
};

// =========================
// ====== TRADES ===========
// =========================
const getTrades = async (req, res, next) => {
    const user = req.user;
    if (!user || !user.sheetId || !user.refresh_token) {
        return res.status(400).json({
            success: false,
            message: "Missing sheet or refresh token",
        });
    }

    const values = await getTradeRows({
        refreshToken: user.refresh_token,
        spreadsheetId: user.sheetId,
    });

    return res.status(200).json({
        success: true,
        message: "Trades fetched",
        data: values,
    });
};

const createTrade = async (req, res, next) => {
    const user = req.user;
    const amount = Number(req.body.amount);

    if (!user || !user.sheetId || !user.refresh_token) {
        return res.status(400).json({
            success: false,
            message: "Missing sheet or refresh token",
        });
    }

    if (Number.isNaN(amount)) {
        return res.status(400).json({
            success: false,
            message: "Amount must be a number",
        });
    }

    const sheetDbUrl = user.sheetDbUrl || process.env.SHEETDB_API_URL;
    if (!sheetDbUrl) {
        return res.status(400).json({
            success: false,
            message: "Missing SheetDB URL",
        });
    }

    const date = new Date().toISOString();
    const userName = user.name || user.email || "User";

    await createRow({
        sheetDbUrl,
        date,
        userName,
        amount,
    });

    return res.status(201).json({
        success: true,
        message: "Trade saved",
        data: { date, user: userName, amount },
    });
};

// =========================
// ====== SETTINGS =========
// =========================
const setSheetDbUrl = async (req, res, next) => {
    const user = req.user;
    const sheetDbUrl = req.body.sheetDbUrl;

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Not Authenticated",
        });
    }

    if (!sheetDbUrl || typeof sheetDbUrl !== "string") {
        return res.status(400).json({
            success: false,
            message: "sheetDbUrl is required",
        });
    }

    user.sheetDbUrl = sheetDbUrl;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "SheetDB URL saved",
        data: { sheetDbUrl },
    });
};

module.exports = {
    getDashboard,
    getTrades,
    createTrade,
    setSheetDbUrl,
};
