// Importa o objeto `knex` que é uma instância do Knex.js, utilizado para interação com o banco de dados.
const knex = require("../database/knex");

// Define a classe TagsController, que controla operações relacionadas às tags.
class TagsController {
    // Método assíncrono chamado index que lida com a requisição e a resposta.
    async index(request, response) {
        // Extrai o user_id dos parâmetros da requisição.
        const { user_id } = request.params;

        // Consulta o banco de dados usando o Knex.js para obter as tags associadas ao user_id.
        const tags = await knex("movie_tags").where({ user_id });

        // Retorna uma resposta JSON contendo as tags obtidas.
        return response.json(tags);
    }
}

// Exporta a classe TagsController para que ela possa ser utilizada em outros arquivos.
module.exports = TagsController;
