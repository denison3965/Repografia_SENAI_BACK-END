const db = require('./db')

const Fornecedor = db.sequelize.define('fornecedor', {
    id_fornecedor: {
        type: db.Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(70, false)
    }
},
    {
        freezeTableName: true
    })

Fornecedor.sync()

module.exports = Fornecedor
