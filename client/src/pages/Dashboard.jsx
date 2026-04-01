// 📄 🏠 Dashboard - 📋 📐 📚
import React from 'react';
import InputDollarAmount from "../components/inputDollarAmount.jsx";
import Button from "../components/submitButton.jsx";
import Form from "../components/form.jsx";
import "./Dashboard.css";

// =======================================
// 🏠 Form, Chart, TradeList 
const Dashboard = () => {
  return ( 
    <>
      <div className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        <Form />
        <div className="dashboard__hint">
          Enter a dollar amount to add your first trade.
        </div>
      </div>
    </>
  );

  //return (...);
} // end Dashboard
export default Dashboard;
