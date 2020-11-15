const express = require('express');

const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

//Routes
const authRoute = require('./routes/auth');

const verifyToken = require('./routes/verifyToken')

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true }, ()=> {
    console.log("Connected to DB");
})


// Use Middlewares
app.use(express.json());


//Route Middlewares
app.use('/api/user',authRoute);



app.listen(8000, () => console.log('Server Running'));