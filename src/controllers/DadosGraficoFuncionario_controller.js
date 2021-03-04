
require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.get = (req, res) => {
    const { de, ate } = req.params


    mysql.getConnection((err, conn) => {
        if (err) res.status(500).send(err)

        conn.query("SELECT id_requisicao, nome_requisicao, num_paginas, num_copias, total_paginas, observacao, nome_arquivo, requisicao.data_entrega, requisicao.data_envio, requisicao.id_fornecedor, nome_fornecedor, requisicao.id_formato,tipo_formato, requisicao.id_feedback,  requisicao.id_suporte, tipo_suporte, requisicao.id_departamento, nome_departamento, centro_custo, funcionarios.nif, nome, status, requisicao.id_feedback, feedback.feedback FROM requisicao INNER JOIN fornecedor ON requisicao.id_fornecedor = fornecedor.id_fornecedor INNER JOIN formato ON requisicao.id_formato = formato.id_formato INNER JOIN suporte ON requisicao.id_suporte = suporte.id_suporte INNER JOIN departamento ON requisicao.id_departamento = departamento.id_departamento INNER JOIN funcionarios ON requisicao.id_funcionarios = funcionarios.id_funcionarios INNER JOIN feedback ON requisicao.id_feedback = feedback.id_feedback ORDER BY id_requisicao DESC", (err, resultado, field) => {
            conn.release()

            let requisicoes = resultado
            var requisicoes_filtrada

            //Funcao para converter data em PT/BR para ENG
            function dateToEN(myDate) {
                return myDate.split('/').reverse().join('-');
            }

            /*-------------------------------------------------------- 
                FILTRANDO OS DADOS DA REQUISICAO PELO TEMPO PASSADO (SE O TEMPO FOR PASSADO)
            ----------------------------------------------------------*/
            
            if (de != 'null' || ate != 'null') {
                
            
                
                requisicoes_filtrada = requisicoes.filter((element) => {

                    //Pegando a data de envio e convertendo para mmilisegundos
                    let dateEmMilli = Date.parse(dateToEN(element.data_envio));


                    if (dateEmMilli >= de && dateEmMilli <= ate) {
  
                        return element
                        
                    }
                    else {
                        return 
                        
                    }

                    
                })
            }
            else {
                requisicoes_filtrada = requisicoes
            }
            /*-------------------------------------------------------- 
                FILTRANDO OS DADOS DA REQUISICAO PELO TEMPO PASSADO (SE O TEMPO FOR PASSADO)
            ----------------------------------------------------------*/

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

                        requisicoes_filtrada.map((element2) => {

                            if (element.nif === element2.nif) {
                                element.folhas_usadas += parseInt(element2.total_paginas)
                            }

                        })
                    })


                    res.send(funcionarios)



                })


        })
    })
}