// Importa o objeto 'Router' do módulo 'express', que é usado para definir rotas
const { Router } = require("express");

// Importa a classe 'SessionsController' que você definiu anteriormente
const SessionsController = require("../controllers/SessionsController");

// Cria uma instância do 'SessionsController'
const sessionsController = new SessionsController();

// Cria um objeto 'Router' para gerenciar as rotas relacionadas às sessões
const sessionsRoutes = Router();

// Define uma rota que responde a requisições POST para o caminho "/" (raiz) usando o método 'create' do 'sessionsController'
sessionsRoutes.post("/", sessionsController.create);

// Exporta o objeto 'sessionsRoutes' para que ele possa ser usado em outros lugares da aplicação
module.exports = sessionsRoutes;
