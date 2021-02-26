require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.get = (req, res) => {
    mysql.getConnection((err, conn) => {
        if (err) res.status(500).send(err)

        conn.query("SELECT id_requisicao, nome_requisicao, num_paginas, num_copias, total_paginas, observacao, nome_arquivo, requisicao.data_entrega, requisicao.data_envio, requisicao.id_fornecedor, nome_fornecedor, requisicao.id_formato,tipo_formato, requisicao.id_feedback,  requisicao.id_suporte, tipo_suporte, requisicao.id_departamento, nome_departamento, centro_custo, funcionarios.nif, nome, status, requisicao.id_feedback, feedback.feedback FROM requisicao INNER JOIN fornecedor ON requisicao.id_fornecedor = fornecedor.id_fornecedor INNER JOIN formato ON requisicao.id_formato = formato.id_formato INNER JOIN suporte ON requisicao.id_suporte = suporte.id_suporte INNER JOIN departamento ON requisicao.id_departamento = departamento.id_departamento INNER JOIN funcionarios ON requisicao.id_funcionarios = funcionarios.id_funcionarios INNER JOIN feedback ON requisicao.id_feedback = feedback.id_feedback ORDER BY id_requisicao DESC", (err, resultado, field) => {
            conn.release()
            var requisicoes = resultado

            conn.query('SELECT * FROM departamento', (error, result, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                let data = result

                data.map((element) => {
                    element.folhas_usadas = 0
                })

                var departamentos = data

                requisicoes.map(async (req) => {
                    switch (req.id_departamento) {
                        case 1:
                            departamentos[0].folhas_usadas += req.total_paginas
                            break;

                        case 2:
                            departamentos[1].folhas_usadas += req.total_paginas
                            break;

                        case 3:
                            departamentos[2].folhas_usadas += req.total_paginas
                            break;


                        case 4:
                            departamentos[3].folhas_usadas += req.total_paginas
                            break;


                        case 5:
                            departamentos[4].folhas_usadas += req.total_paginas
                            break;


                        case 6:
                            departamentos[5].folhas_usadas += req.total_paginas
                            break;


                        case 7:
                            departamentos[6].folhas_usadas += req.total_paginas
                            break;


                        case 8:
                            departamentos[7].folhas_usadas += req.total_paginas
                            break;


                        case 9:
                            departamentos[8].folhas_usadas += req.total_paginas
                            break;


                        case 10:
                            departamentos[9].folhas_usadas += req.total_paginas
                            break;


                        case 11:
                            departamentos[10].folhas_usadas += req.total_paginas
                            break;


                        case 12:
                            departamentos[11].folhas_usadas += req.total_paginas
                            break;

                        default:
                            break;
                    }
                })
                

                /*
                    ALGORITIMO PARA PEGAR O 5 DEPARTAMENTO QUE MAIS GASTARAM - GRAFICO 1
                */

               let top5 = []

                departamentos.map(async (element) => {
                    let aux = 0

                    departamentos.map((element2) => {
                        if (element.folhas_usadas < element2.folhas_usadas) {
                            aux++
                        }
                    })

                    if (aux < 5) {
                        await top5.push(element)
                    } else {
                        return
                    }

                    aux = 0

                })

                res.send(top5)

            })
        })
    })
}