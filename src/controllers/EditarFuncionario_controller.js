const express = require('express')
const app = express();
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');


exports.put = (req, res) => {


    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })

        //verificar se a senha atual é igual a senha que esta no banco 
        conn.query(
            `UPDATE funcionarios SET nome = ?, sobrenome = ?, id_cargo = ?, nif = ?, telefone = ?, email = ?, administrativo = ? WHERE nif = ?`, [req.body.nome, req.body.sobrenome, parseInt(req.body.id_cargo), req.body.nifEditar, req.body.telefone, req.body.email, req.body.administrativo, parseInt(req.body.nifEditar)], (error, result, field) => {
            conn.release()
            if (error) {
                return res.status(500).send( error )
            }

            res.send('Usuarios Alterado com sucesso Alterado com sucesso')
        })



    })
}










