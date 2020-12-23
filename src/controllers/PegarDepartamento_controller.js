
const mysql = require('../model/db').pool

exports.get = (req, res) => {
    
    mysql.getConnection((error, conn) => {
        if (error) res.status(500).send({error: error})

        conn.query('SELECT * FROM departamento' , (error, result, field) => {
            conn.release()
            if (error) {
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }
        
            res.send(result)
        })
        

    })
}




