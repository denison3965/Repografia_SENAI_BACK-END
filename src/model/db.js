const mysql = require('mysql8')

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Firgo2003',
    database: 'repografia'
})


exports.pool = pool;
