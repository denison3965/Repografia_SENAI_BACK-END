const express = require('express')
const router = express.Router()
const app = express();
const bcrypt = require('bcrypt');
const mysql = require('../model/db').pool


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


exports.post = (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if (err) res.status(500).send({ err: err })

        //Comparando se a senha bate com a senha gravada no banco de dados
        conn.query('SELECT * FROM funcionarios WHERE nif = ?',[req.body.nif] ,
            (err, result ) => {
                conn.release();

                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }


                if (result[0] === undefined) {
                    return res.status(203).json({message: 'Usuario nao encontado na base de dados'})
                }

                let result_password = bcrypt.compareSync(req.body.password, result[0].senha)

                let result_situacao = (req.body.situacao, result[0].situacao)

                //esse teste abaixo deve ser feito no seu banco de dados
                if(parseInt(req.body.nif) == parseInt(result[0].nif) && result_password == true && result_situacao == 'ativo'){
                //auth ok
                const nif = result[0].nif; //esse id viria do banco de dados
                const isAd = result[0].administrativo;
                const token = jwt.sign({ nif }, process.env.SECRET, {
                    expiresIn: 100000 // expires in 5min
                });
                return res.status(200).json({ auth: true, token: token, isAd : isAd, message: 'Login valido' });
                }

                res.status(203).json({message: 'Login invalido!'});
            })


    })


}