const mysql = require('mysql8')

var pool = mysql.createPool({
    host: 'localhost',
    user: 'deni',
    password: '123123',
    database: 'repografia'
})


exports.pool = pool;
