// Importando os módulos necessários para trabalhar com SQLite.
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

// Função assíncrona para estabelecer uma conexão com o banco de dados SQLite.
async function sqliteConnection() {
    // Abrindo a conexão com o banco de dados SQLite.
    const database = await sqlite.open({
        // Configuração do caminho do arquivo do banco de dados usando path.resolve.
        filename: path.resolve(__dirname, "..", "database.db"),
        // Especificação do driver SQLite.
        driver: sqlite3.Database
    });

    // Retornando a instância do banco de dados.
    return database;
}

// Exportando a função 'sqliteConnection' para ser utilizada em outros arquivos.
module.exports = sqliteConnection;
