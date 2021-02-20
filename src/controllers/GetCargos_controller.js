
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');

exports.get = (req, res) => {
    
    mysql.getConnection((err, conn) => {
        if (err) res.status(500).send({error: err})

        conn.query('SELECT * FROM cargo_funcionario',(err, result, field) => {
            conn.release()
            res.send(result)
        })
    })
}