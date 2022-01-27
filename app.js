const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require('dotenv/config');

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

const bookRoutes = require("./api/routes/books");

app.use('/books', bookRoutes);

app.get('/', (req,res)=>{
    res.send('Home')
})

mongoose.connect(process.env.DB_CONNECTION, ()=>
    console.log('connected to DB')
);

app.use((req, res, next) => {
    res.status(404).json("NOT FOUND");
});

module.exports = app;
app.listen(3000);

