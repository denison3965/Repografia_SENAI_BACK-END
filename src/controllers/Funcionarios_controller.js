const express = require('express')
const router = express.Router()
const app = express(); 
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('../model/db').pool


exports.post = (req, res) => {
    mysql.getConnection((error, conn) => {
    if(error) res.status(500).send({error: error})
        
    //sentando o numero do senai padrão caso o usuario não coloque numero
    var telefone = '01010101'
    if(req.body.telefone != null ){
        telefone = req.body.telefone
    }
    conn.query(
<<<<<<< HEAD
        'INSERT INTO funcionarios ( nif, nome, sobrenome, email, telefone ,data_criacao, senha, administrativo, situacao, data_suspensao) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [req.body.nif, req.body.nome, req.body.sobrenome,req.body.email, telefone,req.body.data_criacao,req.body.senha,req.body.administrativo,req.body.situacao, req.body.data_suspensao],
=======
        'INSERT INTO funcionarios ( nif, nome, sobrenome, email, telefone ,data_criacao, senha, administrativo, situacao,id_cargo) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [req.body.nif, req.body.nome, req.body.sobrenome,req.body.email, telefone,req.body.data_criacao,req.body.senha,req.body.administrativo,req.body.situacao, req.body.id_cargo ],
>>>>>>> 3d08341701ae710a3bd12b5745892294bc5ad2c8
        (error, resultado, field) => {
            conn.release()

            if(error) {
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({
                mesagem: 'Funcionario inserido com sucesso',
                id_funcionarios: resultado.insertId
            })
            console.log(mesagem)
        }
    )

    })
}


