//importando sequilize
const Sequelize = require('sequelize')

//conexão  com banco de dados mysql
//importando sequelize e fazendo uma nova instância do objeto para a conexão 
//passando paramentros para o construtor o nome do banco de dados, o nome do usuario e senha
const sequelize = new Sequelize('repografia', 'deni', '123123',{
    host: "localhost",
    dialect: 'mysql',
    define:{
        //não adicionar o atributo timestamp (updateAt, createdAt)
        timestamps: false
    }
})

//verificando se o banco de dados está conectado 
sequelize.authenticate().then(()=> {
    console.log("Banco conectado com sucesso")
}).catch((err) => {
    console.log("erro na conexão" + err)
})

//exportando o sequilize e o objeto que foi usado para a conexão 
module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize
}