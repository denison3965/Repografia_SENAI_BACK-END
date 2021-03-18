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

        conn.query('SELECT id_requisicao, nome_requisicao, num_paginas, num_copias, total_paginas, observacao, nome_arquivo, requisicao.data_entrega,feedback.feedback, requisicao.data_envio, requisicao.id_fornecedor, nome_fornecedor, requisicao.id_formato, tipo_formato, requisicao.id_suporte, tipo_suporte, requisicao.id_departamento, nome_departamento, centro_custo, funcionarios.nif, nome, status FROM requisicao INNER JOIN fornecedor ON requisicao.id_fornecedor = fornecedor.id_fornecedor INNER JOIN formato ON requisicao.id_formato = formato.id_formato INNER JOIN suporte ON requisicao.id_suporte = suporte.id_suporte INNER JOIN departamento ON requisicao.id_departamento = departamento.id_departamento INNER JOIN funcionarios ON requisicao.id_funcionarios = funcionarios.id_funcionarios INNER JOIN feedback ON requisicao.id_feedback = feedback.id_feedback WHERE funcionarios.nif = ? ORDER BY id_requisicao DESC',
            [req.params.nif], (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                    let pendencias = []

                   //Função para converter data em PT/BR para ENG
                   function dataToEN(date){
                    return date.split('/').reverse().join('-')
                   }

                    //mapeando os elementos da requisicao
                    let requisicao = result
                    requisicao.map((element) => {
                    
                    //conversão do dataEntrega para milisegundos
                    let dataEnvio = Date.parse(dataToEN(String(element.data_envio)))

                    
                    if (datahoje >= dataEnvio + 604800000 && element.feedback == 'Em espera'){

                        if (element.status == 'ativo') {
                            pendencias.push(element)
                        }else{
                            return
                        }

                    } else {
                        return
                    }                   
                })

                if(pendencias.length > 0){
                    res.send({
                        'res' : false,
                        'pendencias' : pendencias
                    })
                } else{
                    res.send({
                        'res' : true,
                        'pendencias' : pendencias
                    })
                }
            })
    })
}

