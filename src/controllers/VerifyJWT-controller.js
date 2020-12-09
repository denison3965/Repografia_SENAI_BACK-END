const express = require('express')
const router = express.Router()
const app = express(); 
const bcrypt = require('bcrypt');


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


exports.get = ( req, res, next ) => {
    // res.send("Esta tudo funcionando")
    console.log("Esta tudo funcionando");

    //Se o usuario for Adiministrador envias isso
        // res.json([{id:1,nome:'luiz',auth: true, adm: true}]);
    //else    
        res.json([{nif: req.nif ,nome:'luiz',auth: true, adm: "sim"}]);
}