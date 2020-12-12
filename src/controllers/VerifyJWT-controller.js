const express = require('express')
const router = express.Router()
const app = express(); 
const bcrypt = require('bcrypt');


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('../model/db').pool


const bodyParser = require('body-parser');
app.use(bodyParser.json());


exports.get = ( req, res, next ) => {
    // res.send("Esta tudo funcionando")
    console.log("Esta tudo funcionando");

    mysql.getConnection((err, conn) => {
        conn.release()
        if (err) res.status(500).send({ error: err })


        conn.query('SELECT administrativo FROM funcionarios WHERE nif = ?', [req.nif],
        (error, resultado, field) => {
            let isAdm = resultado[0].administrativo
            
            if(isAdm == 'sim'){
                res.json([{nif: req.nif ,nome:'luiz',auth: true, adm: "sim"}]);
            }

            if(isAdm == 'nao') {
                res.json([{nif: req.nif ,nome:'luiz',auth: true, adm: "nao"}]);
            }
        } )
    })
}