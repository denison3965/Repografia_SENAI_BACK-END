
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');



exports.post = (req, res) => {
 
    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({ error: error })

        //Verificando se os campos necessarios estão preenchidos 
        if(req.body.nomeRequisicao === null || req.body.paginas === null || req.body.copias === null || req.body.departamento === null || req.body.formato === null || req.body.suporte === null){
            res.send("Obs: Preencha os campos necessarios: Nome da requisição, número de páginas, número de cópias, endereço do departamento, formato ou suporte !!")
         }
         else{
            
         //Gerando numero da requisicao
        //pegar o ultimo numero de registro
        var year = new Date().getFullYear();

        //Consultar o ultimo registro e acrescentar mais um numero
        let num = null;
        let numero_requisicao

        conn.query('SELECT id_requisicao from requisicao ORDER BY id_requisicao DESC limit 1',
            async (error, result, field) => {
                conn.release()

               

                let num = result

                try {
                    num = num[0].id_requisicao
                    num = num.toString()
                } catch {
                    num = undefined
                }

                if (num != null) {

                    num = num.substr(4)

                    num = parseInt(num)
                    num = num + 1
                    numero_requisicao = await parseInt(`${year}${num}`)
                }
                else {

                    let default_num = 1
                    numero_requisicao = await parseInt(`${year}${default_num}`)

                }

                conn.query('SELECT id_funcionarios FROM funcionarios WHERE nif = ?', [req.body.nif], (error, resultado, field) => {
                    
                    let Id_funcionario = resultado[0].id_funcionarios

                    conn.query(

                     
                        'INSERT INTO requisicao (nome_requisicao ,id_requisicao, nif, num_paginas, num_copias, total_paginas, observacao, data_envio, data_entrega, id_formato, id_suporte, id_funcionarios, id_departamento, id_fornecedor, status, id_feedback ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        [
                            req.body.nomeRequisicao,
                            numero_requisicao,
                            req.body.nif,
                            parseInt(req.body.paginas),
                            parseInt(req.body.copias),
                            req.body.totalPaginas,
                            req.body.observacao,
                            req.body.dataSolicitante,
                            req.body.dataEntrega,
                            parseInt(req.body.formato),
                            parseInt(req.body.suporte),
                            parseInt(Id_funcionario),
                            req.body.departamento,
                            req.body.fornecedor,
                            req.body.status,
                            req.body.feedback
                        ],
                        (error, result, field) => {
                            

                        })

                    //Adicionando na tabela de acabamento os acabamentos pedido pela requisicao
                     req.body.acabamento.map((element) => {

                        conn.query('INSERT INTO acabamento_requisicao (id_acabamento, id_requisicao) VALUES (?, ?)', [element ,numero_requisicao],
                        (error, result, field) => {
                            

                        })
                    })
                    res.status(201).send({message: 'Requisição feita com sucesso !', numeroReq: numero_requisicao})
                })

            })
         }
    })
}
