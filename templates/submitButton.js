// Text on button is passed into fn() as { children } - brackets "piece of something"  - ({ children })
// Attributes like type= 'submit' & className= '...' are the props {...props} - spread operator grabs ALL attributes
// name of function IS the jsx <Element />...
// so <button type= "submit" className= "...">Text</button> becomes... 

// ** NOTE: form is parent that handles the event, similar to a parent handling useState */

export default function Button( {children, ...props} ) {
    return <button {...props}>{ children }</button>;
}