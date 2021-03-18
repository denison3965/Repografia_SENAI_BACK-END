const pdf = require("html-pdf")
const ejs = require("ejs")
const mysql = require('../model/db').pool


exports.post = (req, res) => {


    const nomeSolicitante = req.body.nomeSolicitante
    const nif = req.body.nif
    const escolaSolicitante = req.body.escolaSolicitante
    const telefone = req.body.telefone
    const dataSolicitante = req.body.dataSolicitante
    const dataEntrega = req.body.dataEntrega
    const fornecedor = req.body.fornecedor
    const nome_fornecedor = req.body.nome_fornecedor
    const numero = req.body.numero
    const nomeRequisicao = req.body.nomeRequisicao
    const paginas = req.body.paginas
    const copias = req.body.copias
    const totalPaginas = req.body.totalPaginas
    const observacao = req.body.observacao
    const acabamento = req.body.acabamento
    const departamento = req.body.departamento
    const formato = req.body.formato
    const suporte = req.body.suporte
    const coordenador = req.body.coordenador

    //pegando nome e cc no departamento

    mysql.getConnection((err, conn) => {
        if (err) res.send(err)

        conn.query("SELECT * FROM departamento WHERE id_departamento = ?",[departamento], (err, result, field) => {
            conn.release()

            let nome_departamento = result[0].nome_departamento
            let nome_centroCusto = result[0].centro_custo

            ejs.renderFile(__dirname+"/../views/requisicao.ejs",{nome_centroCusto ,nome_departamento , nomeSolicitante, nif, escolaSolicitante, telefone, dataSolicitante, dataEntrega,fornecedor,nome_fornecedor,numero,nomeRequisicao,paginas,copias,totalPaginas,observacao,departamento,formato,suporte,coordenador,acabamento}, (err, html) => {
                if(err) {
                    console.log(err)
                }
        
                pdf.create(html,{}).toFile(__dirname + `../../../tmp/PDF/${numero}-requisicao.pdf`,(err, result) => {
                    if (err) console.log("Um erro aconteceu" + err)
            
                    let url_pfd = result
                    let id_requisicao = numero

                    res.send(result)
                })
            })
        })
    })



    




    

}