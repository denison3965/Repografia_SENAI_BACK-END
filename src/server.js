const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const routers = require('./routes')
require('dotenv').config()
const bodyParser = require('body-parser')
const db = require ('./model/db')
const morgan = require("morgan")
const path = require('path');

//Configuration
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({
    extended: true
}));


//Rotas
app
    .use('/v1', routers)

//Set Port

const port = process.env.APP_PORT
app.listen(port, function () {
    console.log(`A api esta rodando em http://localhost:${process.env.APP_PORT}​​​​​​​​/v1/`)
})

