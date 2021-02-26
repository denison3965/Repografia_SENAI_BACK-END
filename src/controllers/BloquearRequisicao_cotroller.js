const express = require('express')
const router = express.Router()
const app = express();
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('../model/db').pool


exports.get = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) res.status(500).res.send({ error: error })

        //Pegando a data de hoje em milisegundos
        var datahoje = Date.now();

        conn.query('SELECT id_requisicao, nome_requisicao, num_paginas, num_copias, total_paginas, observacao, nome_arquivo, requisicao.data_entrega, requisicao.data_envio, requisicao.id_fornecedor, nome_fornecedor, requisicao.id_formato, tipo_formato, requisicao.id_suporte, tipo_suporte, requisicao.id_departamento, nome_departamento, centro_custo, funcionarios.nif, nome, status FROM requisicao INNER JOIN fornecedor ON requisicao.id_fornecedor = fornecedor.id_fornecedor INNER JOIN formato ON requisicao.id_formato = formato.id_formato INNER JOIN suporte ON requisicao.id_suporte = suporte.id_suporte INNER JOIN departamento ON requisicao.id_departamento = departamento.id_departamento INNER JOIN funcionarios ON requisicao.id_funcionarios = funcionarios.id_funcionarios WHERE funcionarios.nif = ? ORDER BY id_requisicao DESC',
            [req.params.nif], (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                let requisicao = result
                var feedbacks = requisicao.map((element) => {
                    //Funcao para converter data em PT/BR para ENG
                    // let data = element.data_entrega
                    // console.log(data)

                    // function FormataStringData(data) {
                    //     var dia  = data.split("/");
                    //     var mes  = data.split("/");
                    //     var ano  = data.split("/");
                      
                    //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
                    //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
                    //   }
                    //   console.log(FormataStringData("13/3/2021"));

                    let data = new Date(element.data_entrega);
                    let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;                 
                    console.log(dataFormatada)
                    


                    //conversão do dataEntrega para milisegundos
                    let dataEntrega = Date.parse((data))
                    console.log(dataEntrega)

                    // if (datahoje >= element.dataEntrega) {
                    //     console.log(element.dataEntrega)
                    // } else {
                    //     console.log("OLá")
                    // }
                })
                res.status(201).send({
                    mesagem: 'teste oi',

                })

                console.log(datahoje)
                console.log(requisicao)
            })
    })
}

