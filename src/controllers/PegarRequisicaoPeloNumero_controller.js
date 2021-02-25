require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.get = ( req, res) => {
    
    mysql.getConnection((err, conn) => {
        if(err) res.status(500).send(err)

        conn.query("SELECT id_requisicao, nome_requisicao, num_paginas, num_copias, total_paginas, observacao, nome_arquivo, requisicao.data_entrega, requisicao.data_envio, requisicao.id_fornecedor, nome_fornecedor, requisicao.id_formato, tipo_formato, requisicao.id_suporte, tipo_suporte, requisicao.id_departamento, nome_departamento, centro_custo, funcionarios.nif, nome, status FROM requisicao INNER JOIN fornecedor ON requisicao.id_fornecedor = fornecedor.id_fornecedor INNER JOIN formato ON requisicao.id_formato = formato.id_formato INNER JOIN suporte ON requisicao.id_suporte = suporte.id_suporte INNER JOIN departamento ON requisicao.id_departamento = departamento.id_departamento INNER JOIN funcionarios ON requisicao.id_funcionarios = funcionarios.id_funcionarios WHERE funcionarios.nif = ? ORDER BY id_requisicao DESC",
         [req.params.numerorequisicao], (err, resultado, field) => {
            conn.release()
            res.send(resultado)
        })
    })
}