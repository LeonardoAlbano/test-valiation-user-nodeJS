// Importa o módulo `response` do Express e a instância do Knex
const { response } = require("express");
const knex = require("../database/knex");

// Cria uma classe para o controlador MovieNotesController
class MovieNotesController {

    // Método assíncrono para criar uma nova nota de filme
    async create(request, response) {
        // Extrai dados do corpo da requisição e parâmetros
        const { title, description, movie_tags } = request.body;
        const { user_id } = request.params;

        // Insere uma nova nota de filme e obtém o ID gerado
        const [movie_notes_id] = await knex("movie_notes").insert({
            title,
            description,
            user_id
        });

        // Mapeia as tags para o formato apropriado e insere no banco de dados
        const MovieTagsInsert = movie_tags.map(name => {
            return {
                movie_notes_id,
                name,
                user_id
            };
        });

        await knex("movie_tags").insert(MovieTagsInsert);

        // Retorna uma resposta JSON vazia
        return response.json();
    }

    // Método assíncrono para obter detalhes de uma nota de filme
    async show(request, response) {
        // Extrai o ID da nota da requisição
        const { id } = request.params;

        // Obtém a nota do banco de dados
        const note = await knex("movie_notes").where({ id }).first();

        // Obtém as tags associadas à nota, ordenadas pelo nome
        const tags = await knex("movie_tags").where({ movie_notes_id: id }).orderBy("name");

        // Retorna uma resposta JSON contendo detalhes da nota e suas tags
        return response.json({
            ...note,
            tags
        });
    }

    // Método assíncrono para deletar uma nota de filme
    async delete(request, response) {
        // Extrai o ID da nota a ser deletada da requisição
        const { id } = request.params;

        // Deleta a nota do banco de dados
        await knex("movie_notes").where({ id }).delete();

        // Retorna uma resposta JSON vazia
        return response.json();
    }

    // Método assíncrono para obter uma lista de notas de filmes
    async index(request, response) {
        // Extrai parâmetros da consulta
        const { user_id, title, tags } = request.query;

        let notes;

        // Verifica se há tags na consulta
        if (tags) {
            // Divide as tags e remove espaços em branco
            const filterTags = tags.split(',').map(tag => tag.trim());

            // Consulta notas com base nas tags fornecidas
            notes = await knex("movie_tags as tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id"
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("tags.name", filterTags)
                .innerJoin("movie_notes as notes", "notes.id", "tags.movie_notes_id");

        } else {
            // Consulta todas as notas se não houver tags na consulta
            notes = await knex("movie_notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }

        const userTags = await knex("movie_tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tags => tags.movie_notes_id === note.id);
        
            return {
                ...note,
                tags: noteTags
            };
        });
        
        // Retorna uma resposta JSON contendo as notas obtidas
        return response.json(notesWithTags);
    }        
}

// Exporta a classe MovieNotesController para ser usada em outros arquivos
module.exports = MovieNotesController;
