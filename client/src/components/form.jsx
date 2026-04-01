// 🧩 📋Form ( 💰, 🚀 )
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputDollarAmount from "./inputDollarAmount.jsx";
import Button from "./submitButton.jsx";
import { apiFetch } from "../utils/api";


export default function Form( { onSaved } ) { // 📣 optional callback
    const { handleSubmit, register, reset } = useForm();
    const [ status, setStatus ] = useState( "" );
    const [ isError, setIsError ] = useState( false );
    const onSubmit = async ( data ) => {
        // 🧹 clear status
        setStatus( "" );
        setIsError( false );

        // 🧾 grab amount from form data
        const amountRaw = data?.amount;
        const amount = Number( amountRaw );

        // 🚫 block if no amount
        if ( amountRaw === undefined || amountRaw === null || amountRaw === "" ) {
            setStatus( "Enter an amount to save." );
            setIsError( true );
            return;
        }
        if ( Number.isNaN( amount ) ) {
            setStatus( "Amount must be a number." );
            setIsError( true );
            return;
        }

        // 🌐 send POST /trades with cookie auth
        const { res, data: payload } = await apiFetch( "/trades", {
            method: "POST",
            body: JSON.stringify( { amount } ),
        } );

        // 🚫 stop if error
        if ( !res.ok ) {
            setStatus( payload?.message || "Failed to save trade" );
            setIsError( true );
            return;
        }

        // ✅ clear form after save
        reset();
        setStatus( "Trade saved." );
        setIsError( false );
        // 🔔 notify parent to refresh trades
        if ( typeof onSaved === "function" ) {
            onSaved();
        }
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
          { status && (
            <p className={ isError ? "tradeForm__status tradeForm__status--error" : "tradeForm__status" }>
              { status }
            </p>
          ) }
        </form>
      );
}
