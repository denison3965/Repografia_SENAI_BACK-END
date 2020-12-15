const express = require('express')
const router = express.Router()
const app = express();
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');

exports.get = (req , res) => {
    
    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })

        conn.query('SELECT id_funcionarios, nif, funcionarios.nome, sobrenome, email, telefone, data_criacao, administrativo, situacao, data_suspensao, funcionarios.id_cargo, cargo_funcionario.nome_cargo  FROM funcionarios INNER JOIN cargo_funcionario ON funcionarios.id_cargo = cargo_funcionario.id_cargo',
            (err, result) => {
                conn.release()

                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }

                res.send(result)
            })
    })
}

