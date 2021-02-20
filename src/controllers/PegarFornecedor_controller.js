
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');

exports.get = (req, res ) => {
    
    mysql.getConnection((err, conn) =>{
        if(err) {
            res.status(500).send(err)
        }

        conn.query('SELECT * FROM fornecedor', (err, result, field) => {
            conn.release()
            if (err) {
                res.status(500).send(err)
            }

            res.send(result)
        })
    })
}