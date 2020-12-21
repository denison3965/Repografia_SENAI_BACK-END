const express = require('express')
const app = express();
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');

exports.put = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })


        bcrypt.hash('senai115', 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errorBcrypt }) }

            conn.query(
                `UPDATE funcionarios
                      SET senha   = ?
                      WHERE nif   = ? `,
    
                [hash, req.body.nif],
    
                (error, resultado, field) => {
                    conn.release()
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    res.status(201).send("Senha restaurada com sucesso !!")
                }
            )

        })

    })
}





