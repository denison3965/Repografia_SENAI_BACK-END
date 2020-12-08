const mysql = require('mysql8')

var config = {
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'repografia'
}

const conn = new mysql.createConnection(config)

conn.connect(
    function (err){
        if (err){
            console.log("Falha ao conectar!! Erro: ");
            throw err;
        }else{
            console.log("Conexão estabelecida");
            queryDatabase();
        }
    }
)