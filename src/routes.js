const express = require('express')
const router = express.Router()
const app = express();


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('./model/db').pool

//Chamando as controllers
const Login_controller = require('./controllers/Login-controller')
const Logout_controller = require('./controllers/Logout-controller')
const verifyJWT_controller = require('./controllers/VerifyJWT-controller')

const EditarSenha_controller = require('./controllers/EditarSenha_controller')
const Funcionarios_controller = require('./controllers/Funcionarios_controller')
const UserInfo_controller = require('./controllers/UserInfo_controller') 

// Verificar o JWT
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.nif = decoded.nif;
        next();
    });
}

//Routers
router.get('/teste', verifyJWT, verifyJWT_controller.get)


//Exemplo Excluir depois
router.post('/add-fornecedor', (req, res) => {



    mysql.getConnection((error, conn) => {

        if (error) res.status(500).send({ error: error })

        conn.query(
            'INSERT INTO fornecedor (id_fornecedor, nome) VALUES (?,?)',
            [req.body.id, req.body.nome],
            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mesagem: 'Fornecedor inserido com sucesso',
                })
            }
        )
    })


})

//Exemplo Excluir depois
router.post('/add-requisicao', (req, res) => {


    mysql.getConnection((error, conn) => {

        if (error) res.status(500).send({ error: error })

        //Gerando numero da requisicao
            //pegar o ultimo numero de registro
            var year = new Date().getFullYear();

            //Consultar o ultimo registro e acrescentar mais um numero
            let num = null;
            let numero_requisicao

            conn.query('SELECT id_requisicao from requisicao ORDER BY id_requisicao DESC limit 1',
                (error, resultado, field) =>{
                    
                    num = resultado
                    num =  num[0].id_requisicao
                    num = num.toString()

                    console.log(num)    

                    if(num != null) 
                    {
                        console.log("estou aqui")
                        num = num.substr(4)
                        num = num + 1
                        numero_requisicao = parseInt(`${year}${num}`)
                    }
                    else
                    {
                        console.log("estou aqui 2")
                        num = 1
                        numero_requisicao = parseInt(`${year}${num}`)
                    }

                })




        conn.query(
            'INSERT INTO requisicao (id_requisicao, NIF, num_paginas, num_copias, total_paginas, observacao, data_envio, data_entrega ) VALUES (?,?,?,?,?,?,?,?)',
            [
                numero_requisicao, 
                511128,
                req.body.paginas,
                req.body.copias,
                req.body.totalPaginas,
                req.body.observacao,
                req.body.dataSolicitante,
                req.body.dataEntrega
            ],

            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mesagem: 'Requisicao criada com sucesso !!!',
                })
            }
        )
    })



})

//Rota para pegar informacoes de um usuario pelo nif
router.get('/buscar-user-nif/:nif', UserInfo_controller.get)

//Router para editar a senha
router.put('/editarSenha', EditarSenha_controller.put)

//Router para inserir dados na tabela funcionario
router.post('/funcionarios', Funcionarios_controller.post )

//autenticação
router.post('/login', Login_controller.post)

router.post('/logout', Logout_controller.post)





module.exports = router    