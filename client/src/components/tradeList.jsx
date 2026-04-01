// 📚 🧾 Trade List - shows user trades
import React, { useEffect, useMemo, useState } from "react"; // ⚛️ hooks
import { apiFetch } from "../utils/api"; // 🌐 api helper

// =========================
// 📚 TradeList Component
const TradeList = ({ refreshKey = 0 }) => {
    // 🧠 local state: rows
    const [ rows, setRows ] = useState( [] );
    // ⏳ local state: loading
    const [ isLoading, setIsLoading ] = useState( false );
    // 🚫 local state: error
    const [ error, setError ] = useState( "" );

    // 🔄 fetch trades when mounted or refreshed
    useEffect( () => {
        // 🧹 reset status
        setError( "" );
        setIsLoading( true );

        // 🧾 async loader
        const load = async () => {
            // 🌐 GET /trades with cookie auth
            const { res, data } = await apiFetch( "/trades", { method: "GET" } );

            // 🚫 stop if error
            if ( !res.ok ) {
                setError( data?.message || "Failed to load trades" );
                setRows( [] );
                setIsLoading( false );
                return;
            }

            // 📦 raw values from sheet
            const values = data?.data || [];
            // 🧼 remove header row if present
            const cleaned = values.filter( ( row, index ) => {
                if ( !Array.isArray( row ) ) return false; // 🚫 skip bad rows
                if ( index !== 0 ) return true; // ✅ keep non-header rows
                const header = row.map( ( cell ) => String( cell ).toLowerCase() ); // 🏷️ normalize headers
                return !( header[0] === "date" && header[1] === "user" && header[2] === "amount" ); // 🧹 drop header
            } );

            // ✅ save rows
            setRows( cleaned );
            setIsLoading( false );
        };

        // 🚀 run loader
        load();
    }, [ refreshKey ] );

    // 🧮 map rows into view models
    const items = useMemo( () => {
        return rows.map( ( row, index ) => {
            const date = row?.[0] || ""; // 📅 date column
            const user = row?.[1] || ""; // 👤 user column
            const amount = row?.[2] ?? ""; // 💰 amount column
            return { id: `${ index }-${ date }`, date, user, amount }; // 🧾 view model
        } );
    }, [ rows ] );

    return (
        <div className="tradeList">
            <h2 className="tradeList__title">Trades</h2>
            { isLoading && <p className="tradeList__status">Loading trades...</p> }
            { error && <p className="tradeList__status tradeList__status--error">{ error }</p> }
            { !isLoading && !error && items.length === 0 && (
                <p className="tradeList__status">No trades yet.</p>
            ) }
            { items.length > 0 && (
                <ul className="tradeList__items">
                    { items.map( ( item ) => (
                        <li key={ item.id } className="tradeList__item">
                            <span className="tradeList__date">{ item.date }</span>
                            <span className="tradeList__user">{ item.user }</span>
                            <span className="tradeList__amount">{ item.amount }</span>
                        </li>
                    ) ) }
                </ul>
            ) }
        </div>
    );
};

export default TradeList;
