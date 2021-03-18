
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');
const fs = require('fs')

exports.post = (req, res) => {


    // if(req.file.filename == undefined) res.send('Nenhum arquivo enviado')
    fs.writeFile(`${__dirname}/../../tmp/uploads`, req.file, (err) => {
        if (err) {
        }
        if (req.file == undefined) {
            res.send("Nao ")
        }
        if (req.file != undefined){

            mysql.getConnection(( err, conn) => {
                if (err) res.status(500).send(err)
    
                conn.query('UPDATE requisicao SET nome_arquivo = ? WHERE id_requisicao = ?;', [req.file.filename, req.body.id_requisicao],
                    (err, result, field) => {
                        conn.release()
                        if(err) res.send(err)
    
                        res.send(result)
                    })
    
            })

        }


    })
}


 