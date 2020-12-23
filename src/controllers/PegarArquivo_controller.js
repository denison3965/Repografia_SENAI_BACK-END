require("dotenv-safe").config();
const mysql = require('../model/db').pool
const bcrypt = require('bcrypt');
const fs = require('fs')
var path = require('path');

exports.get = (req, res) => {
 
    res.sendFile(path.resolve(__dirname + `/../../tmp/uploads/${req.params.nomeArquivo}`));
}