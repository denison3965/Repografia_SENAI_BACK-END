const pdf = require("html-pdf")
const ejs = require("ejs")
const mysql = require('../model/db').pool
var path = require('path');

exports.get = (req, res) => {
    res.sendFile(path.resolve(__dirname + `/../../tmp/PDF/${req.params.pdf}`));
}