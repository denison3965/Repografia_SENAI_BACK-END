const db = require('./db')

const Requisicao = db.sequelize.define('requisicao',{
    id_requisicao: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true,

    },
    NIF: {
        type: db.Sequelize.INTEGER,
        notNull: true,
    },
    num_paginas: {
        type: db.Sequelize.INTEGER,
    },
    num_copias: {
        type: db.Sequelize.INTEGER,
    },
    total_paginas: {
        type: db.Sequelize.INTEGER,
    },
    observacao: {
        type: db.Sequelize.STRING,
    },
    data_envio: {
        type: db.Sequelize.DATE,
    },
    id_fornecedor: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },
    id_formmato: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },
    id_suporte: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },
    id_departamento: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },
    id_arquivo: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },
    id_feedback: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },
    id_funcionario: {
        type: db.Sequelize.INTEGER,
        foreignKey: true
    },

},
    {
        freezeTableName: true
    })

    Requisicao.sync()