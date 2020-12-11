const express = require('express')
const router = express.Router()
const app = express();
require("dotenv-safe").config();
const mysql = require('../model/db').pool

exports.put = (req, res) => { 
    
}