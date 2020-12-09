const express = require('express')
const router = express.Router()
const app = express(); 
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('../model/db').pool



exports.put = (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) res.status(500).send({error: error})

        conn.query(
         `UPDATE funcionarios
           SET senha   = ?
           WHERE id_funcionarios = ? `,

           [req.body.senha, req.body.id_funcionarios],

           (error, resultado, field) => {
            conn.release()
            if(error) {
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({
                mesagem: 'Senha alterada com sucesso',
            })
        }
        )
    })
}