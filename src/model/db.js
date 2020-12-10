const mysql = require('mysql8')

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'repografia'
})


exports.pool = pool;
