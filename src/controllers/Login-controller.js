const express = require('express')
const router = express.Router()
const app = express(); 
const bcrypt = require('bcrypt');


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


exports.post = (req, res, next) => {

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
}