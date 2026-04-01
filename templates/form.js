// 🧩 📋Form ( 💰, 🚀 )
//import React from "react";
// import ...
// impoort ... 


// ** NOTE: form is parent that handles the event...
// prop of parent (form.jsx) is the action of the button...{ onSumbit }
// { onSumbit } is the attribute of the HTML form element... <form onSubmit= { ... } >
// Form() {...} is... declared variable (const handleSubmit =) that will = the event function (e) => {...};
// inside {} of (e): e.preventDefault(); const value = e.target.elements.amount.value; - means listen for This to happen 
// onSubmit(value);  Form prop onSubmit() now carries the value from <input/> 
// .value is defined as the data from <input/>
// return () is - HTML <form> <input/> <button></button> </form> becomes...

export default function Form() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target.elements.amount.value;
        onSubmit(value);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <Input name="amount" placeholder="Enter $ amount" type="number" />
          <Button type="submit">Submit</Button>
        </form>
      );
}
// Parent: "You do this, I Tell you to do the this" - light the fire/go 