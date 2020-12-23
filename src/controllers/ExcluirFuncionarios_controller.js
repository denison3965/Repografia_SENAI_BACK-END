const express = require('express')
const router = express.Router()
const app = express();
require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.put = (req, res) => { 

    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })

        conn.query(
            `UPDATE funcionarios SET situacao = "inativo" 
            WHERE nif   = ?`,
            [req.body.nif],

            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mesagem: 'Funcionario excluido com sucesso',
                    id_funcionarios: resultado.insertId
                })
            }
        )  

    }) 
}
