const express = require('express')
require("dotenv-safe").config();
const mysql = require('../model/db').pool


exports.put = (req, res) => {
    
    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })

        if(req.body.feedback === undefined){
            res.send("Houve um erro ao enviar feedback !!")
        }else{
            conn.query(
                `UPDATE requisicao
                SET id_feedback  = ?
                WHERE id_requisicao = ?`, 
                
                [req.body.feedback, req.body.id_requisicao],
            
                (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                    
                }
    
                res.send('Feedback enviado com sucesso !!')
            })
        }





    })
}