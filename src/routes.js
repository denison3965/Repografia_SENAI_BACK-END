const express = require('express')
const router = express.Router()
const app = express(); 
const bcrypt = require('bcrypt');

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Fornecedor = require('./model/Fornecedor')


// Verificar o JWT
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

//Routers
    router.get('/teste', verifyJWT, ( req, res, next ) => {
        // res.send("Esta tudo funcionando")
        console.log("Esta tudo funcionando");

        //Se o usuario for Adiministrador envias isso
            // res.json([{id:1,nome:'luiz',auth: true, adm: true}]);
        //else    
            res.json([{id: req.userId ,nome:'luiz',auth: true, adm: true}]);
    })

    router.post('/add-fornecedor', ( req, res ) => {

        
        Fornecedor.create({
            id_fornecedor: req.body.id,
            nome: req.body.nome

        }).then(() => res.status(200).json({status: 'fornecedor criado com sucesso'})).catch((err) => res.status(500).json({status: 'Erro ao cadastrar fornecedor'}) )

    })

    //autenticação
    router.post('/login', (req, res, next) => {

        //Compparando se a senha bate com a senha gravada no banco de dados
        let result_password = bcrypt.compareSync(req.body.password, "$2b$10$f/KXvDO0jtkkNXOcZZyqROGTOnV.YO1ZEYfnj9Y9hBOnl8Mp2wrPS")

        
        //esse teste abaixo deve ser feito no seu banco de dados
        if(req.body.nif === 'luiz' && result_password == true){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        const isAd = true;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token, isAd : isAd, message: 'Login valido' });
        }
        
        res.status(203).json({message: 'Login invalido!'});
    })

    router.post('/logout', function(req, res) {
        res.json({ auth: false, token: null });
    })

    



module.exports = router    