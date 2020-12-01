const express = require('express')
const router = express.Router()

//Routers
    router.get('/teste', ( req, res ) => {
        res.send("Esta tudo funcionando")
    })


module.exports = router    