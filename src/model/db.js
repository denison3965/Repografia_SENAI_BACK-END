const mysql = require('mysql8')

var pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: 'repografia'
})


exports.pool = pool;
