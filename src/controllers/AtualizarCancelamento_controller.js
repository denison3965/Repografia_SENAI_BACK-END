const express = require('express')
require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.put = (req, res) => {

    mysql.getConnection((err, conn) => {
        if (err) res.status(500).send({ error: err })

        if(req.body.status === undefined || req.body.id_requisicao === undefined){
            console.log("Algo deu errado ao cancelar requisicao")
        }else{
            conn.query(`UPDATE requisicao SET status = ? WHERE id_requisicao = ?`,

            [req.body.status, req.body.id_requisicao],
                (error, result, field) => {
                    conn.release()
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    res.send('Cancelamento feio com sucesso !!')
                }
            )
        }


    })
}