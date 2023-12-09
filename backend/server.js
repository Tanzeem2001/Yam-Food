const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db.js'); // Assuming this is where your MongoDB connection is set up.
const port = 8000;

app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-type, Accept"
    );
    next();
})

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});

// const createUserRoute = require('./Routes/CreateUser');
// app.use('/api', createUserRoute);

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/MyOrderData"));
app.listen(port, () => {
    console.log(`Yam Food app listening on port ${port}`);
});
