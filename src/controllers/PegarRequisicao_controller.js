
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');

exports.get = ( req, res) => {
    
    mysql.getConnection((err, conn) => {
        if(err) res.status(500).send(err)

        conn.query('SELECT * FROM requisicao', (err, resultado, field) => {
            res.send(resultado)
        })
    })
}