
require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');

exports.post = (req, res) => {
    console.log(req.file)
    res.send("Aqui eu vou receber ,meus arquivos")
}