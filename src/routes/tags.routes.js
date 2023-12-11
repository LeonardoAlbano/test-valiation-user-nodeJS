// Importa o Router do Express para configurar as rotas.
const { Router } = require('express');

// Importa o controlador TagsController.
const TagsController = require('../controllers/TagsController');

// Cria uma instância do Router do Express.
const tagsRoutes = Router();

// Cria uma instância do TagsController.
const tagsController = new TagsController();

// Define uma rota GET para '/:user_id', que chama o método 'index' do TagsController.
tagsRoutes.get('/:user_id', tagsController.index);

// Exporta as rotas configuradas.
module.exports = tagsRoutes;
