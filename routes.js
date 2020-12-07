const express = require('express')
const router = express.Router()
const app = express(); 

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


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
        res.json([{id:1,nome:'luiz',auth: true}]);
    })

    //autenticação
    router.post('/login', (req, res, next) => {
        //esse teste abaixo deve ser feito no seu banco de dados
        if(req.body.user === 'luiz' && req.body.password === '123'){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
        }
        
        res.status(500).json({message: 'Login inválido!'});
    })

    router.post('/logout', function(req, res) {
        res.json({ auth: false, token: null });
    })


module.exports = router    