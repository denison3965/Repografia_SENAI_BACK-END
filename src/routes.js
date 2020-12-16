const express = require('express')
const router = express.Router()
const app = express();


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const mysql = require('./model/db').pool

//Chamando as controllers
const Login_controller = require('./controllers/Login-controller')
const Logout_controller = require('./controllers/Logout-controller')
const verifyJWT_controller = require('./controllers/VerifyJWT-controller')

const EditarSenha_controller = require('./controllers/EditarSenha_controller')
const Funcionarios_controller = require('./controllers/Funcionarios_controller')
const UserInfo_controller = require('./controllers/UserInfo_controller') 
const ResetarSenha_controller = require('./controllers/ResetarSenha_controller')
const AddRequisicao_controller = require('./controllers/Addrequisicao_controller')
const GetFuncionarios_controller = require('./controllers/GetFuncionarios_controller')
const ExcluirFuncionarios_controller = require('./controllers/ExcluirFuncionarios_controller')
const RestaurarFuncionarios_controller = require('./controllers/RestaurarFuncionarios_controller')
const GetCargos_controller = require('./controllers/GetCargos_controller')
const EditarFuncionario_controller = require('./controllers/EditarFuncionario_controller')
const PegarDepartamento_controller = require('./controllers/PegarDepartamento_controller')
const PegarFornecedor_controller = require('./controllers/PegarFornecedor_controller')
const PegarRequisicao_controller = require('./controllers/PegarRequisicao_controller')

// Verificar o JWT
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.nif = decoded.nif;
        next();
    });
}

//Routers
    router.get('/teste', verifyJWT, verifyJWT_controller.get)

    //Router para adicionar uma requisicao
    router.post('/add-requisicao', AddRequisicao_controller.post)

    //Router para editar a senha
    router.put('/editarSenha', EditarSenha_controller.put)

    //Router para inserir dados na tabela funcionario
    router.post('/addfuncionarios', Funcionarios_controller.post)

    //router para resetar a senha
    router.put('/resetarSenha', ResetarSenha_controller.put)

    //Rota para pegar informacoes de um usuario pelo nif
    router.get('/buscar-user-nif/:nif', UserInfo_controller.get)

    //Rota para pegar os funcionarios cadastrados no sistema
    router.get('/pegar-funcionarios', GetFuncionarios_controller.get)

    //Router para excluir funcionarios
    router.put('/excluirfuncionarios', ExcluirFuncionarios_controller.put)
    
    //Rota para restaurar o funcionario
    router.put('/restaurarfuncionario', RestaurarFuncionarios_controller.put)

    //Rota para pegar a lista de cargos
    router.get('/pegar-cargos', GetCargos_controller.get)

    //Rota para editar funcionario
    router.put('/editar-funcionario', EditarFuncionario_controller.put)

    //Rota para pegar lista de departamentos
    router.get('/pegar-departamento', PegarDepartamento_controller.get)

    //Rota para trazer o fornecedor
    router.get('/pegar-fornecedor', PegarFornecedor_controller.get)

    //Rota para pegar a lista de requisicao
    router.get('/pegar-requisicao', PegarRequisicao_controller.get)

    //autenticação
    router.post('/login', Login_controller.post)

    router.post('/logout', Logout_controller.post)





module.exports = router    