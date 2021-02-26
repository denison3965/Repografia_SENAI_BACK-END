
require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.get = (req, res) => {
    mysql.getConnection((err, conn) => {
        if(err) res.status(500).send(err)

        conn.query("SELECT id_requisicao, nome_requisicao, num_paginas, num_copias, total_paginas, observacao, nome_arquivo, requisicao.data_entrega, requisicao.data_envio, requisicao.id_fornecedor, nome_fornecedor, requisicao.id_formato,tipo_formato, requisicao.id_feedback,  requisicao.id_suporte, tipo_suporte, requisicao.id_departamento, nome_departamento, centro_custo, funcionarios.nif, nome, status, requisicao.id_feedback, feedback.feedback FROM requisicao INNER JOIN fornecedor ON requisicao.id_fornecedor = fornecedor.id_fornecedor INNER JOIN formato ON requisicao.id_formato = formato.id_formato INNER JOIN suporte ON requisicao.id_suporte = suporte.id_suporte INNER JOIN departamento ON requisicao.id_departamento = departamento.id_departamento INNER JOIN funcionarios ON requisicao.id_funcionarios = funcionarios.id_funcionarios INNER JOIN feedback ON requisicao.id_feedback = feedback.id_feedback ORDER BY id_requisicao DESC", (err, resultado, field) => {
            conn.release()

            let requisicoes = resultado

            conn.query('SELECT id_funcionarios, nif, funcionarios.nome, sobrenome, email, telefone, data_criacao, administrativo, situacao, data_suspensao, funcionarios.id_cargo, cargo_funcionario.nome_cargo  FROM funcionarios INNER JOIN cargo_funcionario ON funcionarios.id_cargo = cargo_funcionario.id_cargo',
            (err, result) => {
                

                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }

                let funcionarios = result

                //Adicionando o campo de folhas gastas
                funcionarios.map((element) => {
                    element.folhas_usadas = 0
                })

                


                //Adicionando o número total de folhas gasta de cada funcionario 
                
                funcionarios.map((element) => {

                    requisicoes.map((element2) => {

                        if(element.nif === element2.nif) {
                            element.folhas_usadas += parseInt(element2.total_paginas)
                        }

                    })
                })

                /*
                    ALGORITIMO PARA PEGAR O 5 DEPARTAMENTO QUE MAIS GASTARAM - GRAFICO 2
                */

               let top5 = []

                funcionarios.map((element) => {
                    var aux = 0
                    funcionarios.map((element2) => {
                        if (element.folhas_usadas > element2.folhas_usadas) {
                            aux++
                        }
                    })

                    if (aux > 5) {
                        top5.push(element)
                    }
                })

                if (top5.length < 5) {
                    for (let i = top5.length; i < 5; i++) {
                        top5.push({
                            "nome" : "",
                            "sobrenome" : "",
                            "folhas_usadas" : 0
                        })
                        
                    }
                }


                res.send(top5)



            })


        })
    })
}