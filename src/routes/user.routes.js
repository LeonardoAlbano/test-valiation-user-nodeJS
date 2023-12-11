// Importando o objeto 'Router' do módulo 'express'.
const { Router } = require("express");

// Importando o controlador 'UserController' do arquivo '../controllers/UserController'.
const UserController = require("../controllers/UserController");

// Criando uma instância do objeto 'Router'.
const usersRoutes = Router();

// Criando uma instância do controlador 'UserController'.
const userController = new UserController();

// Definindo uma rota para a criação de usuários (método POST).
// Quando essa rota é acionada, o método 'create' do 'UserController' será chamado.
usersRoutes.post("/", userController.create);

// Definindo uma rota para a atualização de usuários (método PUT).
// Quando essa rota é acionada, o método 'update' do 'UserController' será chamado.
// O parâmetro ':id' na rota é capturado e passado como parte da requisição para o método 'update'.
usersRoutes.put("/:id", userController.update);

// Exportando as rotas relacionadas aos usuários para serem utilizadas em outros arquivos.
module.exports = usersRoutes;
