// 📄 🏠 Dashboard - 📋 📐 📚
import React, { useState } from 'react'; // ⚛️ hooks
import Form from "../components/form.jsx"; // 📋 trade form
import TradeList from "../components/tradeList.jsx"; // 📚 trade list
import "./Dashboard.css";

// =======================================
// 🏠 Form, Chart, TradeList 
const Dashboard = () => {
  // 🔄 refresh key to reload trades
  const [ refreshKey, setRefreshKey ] = useState( 0 ); // 🔄 refresh counter
  // 🔔 handler when trade is saved
  const handleSaved = () => {
    setRefreshKey( ( prev ) => prev + 1 ); // ➕ bump to refetch
  };
  return ( 
    <>
      <div className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        {/* 📋 trade form */}
        <Form onSaved={ handleSaved } />
        <div className="dashboard__hint">
          Enter a dollar amount to add your first trade.
        </div>
        {/* 📚 trade list */}
        <TradeList refreshKey={ refreshKey } />
      </div>
    </>
  );

  //return (...);
} // end Dashboard
export default Dashboard;
