require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require('./db');

//DB connection
connection();

//middlewares
app.use(express.json())
app.use(cors());

app.listen(8080,()=>console.log('Server running @ 8080'));