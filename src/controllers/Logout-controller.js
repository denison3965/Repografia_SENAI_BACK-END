const express = require('express')
const router = express.Router()
const app = express(); 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

exports.post = (req, res) => {
    res.json({ auth: false, token: null });
}