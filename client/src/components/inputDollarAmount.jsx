// input holds the text/number = <input />
// input attributes - type= is the prop {...prop}
// name of function IS the jsx <Element />...
// so <input type= "string" className= "..."/> becomes...

import React from "react";

const InputDollarAmount = React.forwardRef( ( { ...props }, ref ) => {
    return( <input ref={ ref } { ...props } /> );
} );

InputDollarAmount.displayName = "InputDollarAmount";

export default InputDollarAmount;
