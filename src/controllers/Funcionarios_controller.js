const express = require('express')
const router = express.Router()
const app = express();
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');


exports.post = (req, res) => {


    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })

        //verificar se há um nif igual ao que já esta cadastrado 
        conn.query(
            '  SELECT nif FROM funcionarios WHERE nif = ?',
            [req.body.nif],

            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                    })
                }

                let nif
                try {
                    nif = resultado[0].nif
                } catch {
                    nif = undefined
                }

                if (nif != undefined) {
                   res.send("OBS: Funcionario existente !!")
                }
                else {
                    bcrypt.hash("senai115", 10, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: errorBcrypt }) }
                        conn.query(
                            'INSERT INTO funcionarios ( nif, nome, sobrenome, email, telefone ,data_criacao, senha, administrativo, situacao, data_suspensao, id_cargo) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                            [req.body.nif, req.body.nome, req.body.sobrenome, req.body.email, req.body.telefone, req.body.data_criacao, hash, req.body.administrativo, req.body.situacao, req.body.data_suspensao, req.body.id_cargo],
                            (error, resultado, field) => {

                                if (error) {
                                    return res.status(500).send({
                                        error: error,
                                        response: null
                                    })
                                }
                                res.status(201).send("Funcionario cadastrado com sucesso !!")
                            }
                        )

                    })

                   
                }
            }

        )





    })
}





