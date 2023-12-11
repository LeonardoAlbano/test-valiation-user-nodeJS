// Importa o módulo `Router` do Express
const { Router } = require("express");

// Importa o controlador `MovieNotesController` que você criou
const MovieNotesController = require("../controllers/MovieNotesController");

// Cria uma instância do Router do Express para manipular as rotas
const movieNotesRoutes = Router();

// Cria uma instância do controlador `MovieNotesController`
const movienotesController = new MovieNotesController();

// Configuração das rotas:

// Rota para obter uma lista de notas de filmes
movieNotesRoutes.get("/", movienotesController.index);

// Rota para criar uma nova nota de filme
movieNotesRoutes.post("/:user_id", movienotesController.create);

// Rota para obter detalhes de uma nota de filme específica
movieNotesRoutes.get("/:id", movienotesController.show);

// Rota para deletar uma nota de filme específica
movieNotesRoutes.delete("/:id", movienotesController.delete);

// Exporta o objeto `movieNotesRoutes` contendo as rotas configuradas
module.exports = movieNotesRoutes;
