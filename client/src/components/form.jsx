// 🧩 📋Form ( 💰, 🚀 )
import React from "react";
import { useForm } from "react-hook-form";
import InputDollarAmount from "./inputDollarAmount.jsx";
import Button from "./submitButton.jsx";


export default function Form() {
    const { handleSubmit, register, reset } = useForm();
    const onSubmit = async ( data ) => {
        // 🧮 build api base url
        const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

        // 🧾 grab amount from form data
        const amountRaw = data?.amount;
        const amount = Number( amountRaw );

        // 🚫 block if no amount
        if ( amountRaw === undefined || amountRaw === null || amountRaw === "" ) {
            return;
        }
        if ( Number.isNaN( amount ) ) {
            return;
        }

        // 🌐 send POST /app/trades with cookie auth
        const res = await fetch( `${apiBaseUrl}/app/trades`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { amount } ),
        } );

        // 🔍 read response
        const payload = await res.json();

        // 🚫 stop if error
        if ( !res.ok ) {
            console.error( payload?.message || "Failed to save trade" );
            return;
        }

        // ✅ clear form after save
        reset();
      };
    
      return (
        <form className="tradeForm" onSubmit={ handleSubmit( onSubmit ) }>
          <label className="tradeForm__label" htmlFor="amount">
            Dollar Amount
          </label>
          <InputDollarAmount
            id="amount"
            name="amount"
            placeholder="+0.00"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            className="tradeForm__input"
            { ...register( "amount" ) }
          />
          <Button className="tradeForm__button" type="submit">
            Add Trade
          </Button>
        </form>
      );
}
