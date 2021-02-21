const express = require('express')
const app = express(); 
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');



exports.put = (req, res) => {
   
    mysql.getConnection((error, conn) => {
        if(error) res.status(500).send({error: error})

            //verificar se a senha atual é igual a senha que esta no banco 
            conn.query( 
                `SELECT senha FROM funcionarios WHERE nif = ?`,
                [req.body.nif],

                async (error, resultado, field) => {
                    conn.release()
                    if(error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }

                    //comparar se a senha atual é igual a senha do banco de dados
                   let verificar_senha =  await bcrypt.compareSync(req.body.senhaAtual, resultado[0].senha)
                        
                   if(verificar_senha == true){
                      //verificar se a nova senha é igual ao confimar senha 
                      if(req.body.novaSenha === req.body.confirmarSenha){
                          
                        bcrypt.hash(req.body.novaSenha, 10, (errBcrypt, hash) => {
                            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                            conn.query(
                                `UPDATE funcionarios
                                  SET senha   = ?
                                  WHERE nif   = ? `,
                            
                                  [hash, req.body.nif],
                            
                                  (error, resultado, field) => {
                                   
                                   if(error) {
                                       return res.status(500).send({
                                           error: error,
                                           response: null
                                       })
                                   }
                                   res.status(201).send('Senha alterada com sucesso')
                               }
                               )
                        })

                      }
                      else{
                          res.send("senha atual não corresponde com confirmar senha")
                      }
                   }
                   else{
                       res.send("senha atual errada")
                   }
                }
                
            )
    })
}







