// backend/app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')





dotenv.config();

// midellware
app.use(cors())
app.use(express.json());


// routes

app.use('/api/contacts', require('./routes/contactRoute'));

// default route

app.get('/', (req, res) => {
    res.send("  Contact Management System Api")
})

module.exports=app



