
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');



exports.post = (req, res) => {
    mysql.getConnection((error, conn) => {

        if (error) res.status(500).send({ error: error })

        console.log(req.body)

        //Gerando numero da requisicao
            //pegar o ultimo numero de registro
            var year = new Date().getFullYear();

            //Consultar o ultimo registro e acrescentar mais um numero
            let num = null;
            let numero_requisicao

            conn.query('SELECT id_requisicao from requisicao ORDER BY id_requisicao DESC limit 1',
                async(error, resultado, field) =>{

                    
                    
                    let num = resultado

                    try { 
                        num = num[0].id_requisicao 
                        num = num.toString()
                        console.log(num)
                    } catch {
                        num = undefined
                    }
                    

                    console.log(num)    

                    if(num != null) 
                    {
                        console.log("estou aqui")
                        num = num.substr(4)
                        console.log(num)
                        num = parseInt(num)
                        num = num + 1 
                        numero_requisicao = await parseInt(`${year}${num}`)
                    }
                    else
                    {
                        console.log("estou aqui 2")
                        let default_num = 1
                        numero_requisicao = await parseInt(`${year}${default_num}`)
                        console.log(numero_requisicao)
                    }

                    conn.query(
                        'INSERT INTO requisicao (id_requisicao, nif, num_paginas, num_copias, total_paginas, observacao, data_envio, data_entrega ) VALUES (?,?,?,?,?,?,?,?)',
                        [
                            numero_requisicao, 
                            req.body.nif,
                            req.body.paginas,
                            req.body.copias,
                            req.body.totalPaginas,
                            req.body.observacao,
                            req.body.dataSolicitante,
                            req.body.dataEntrega
                        ],
            
                        (error, resultado, field) => {
                            
            
                            if (error) {
                                return res.status(500).send({
                                    error: error,
                                    response: null
                                })
                            }
                            res.status(201).send({
                                mesagem: 'Requisicao criada com sucesso !!!',
                            })
                        }

                    )

                    //Adicionando na tabela de acabamento os acabamentos pedido pela requisicao
                    req.body.acabamento.map((element, index) => {
                        conn.query('INSERT INTO acabamento_requisicao (id_acabamento,id_requisicao) VALUES (?, ?)',[element, numero_requisicao],
                            (error, result, field) => {
                                
            
                                if (error) {
                                    return res.status(500).send({
                                        error: error,
                                        response: null
                                    })
                                }

                            })
                    })



                    

                })


    })
}
