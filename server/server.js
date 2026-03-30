// 🗄️🚪💙 - app is imported from index, this file starts server
require('dotenv').config();
const app = require('./index');


const PORT = process.env.PORT || 3000;
// install cors, AXIOS
app.get ('/', (req, res ) => {
    res.send(`connected to server`);
});

app.listen(PORT, () => console.log('Server running') );
