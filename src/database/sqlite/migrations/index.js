// Importando o módulo que estabelece a conexão com o banco de dados SQLite.
const sqliteConnection = require("../../sqlite");

// Importando o script de criação de tabela 'createUsers'.
const createUsers = require("./createUsers");

// Função assíncrona responsável por executar as migrações no banco de dados.
async function migrationsRun() {
    // Array contendo os scripts de criação de tabela.
    const schemas = [
        createUsers
    ].join('');

    // Estabelecendo a conexão com o banco de dados SQLite.
    sqliteConnection()
        .then(db => db.exec(schemas))  // Executando os scripts de criação de tabela no banco de dados.
        .catch(error => console.error(error));  // Tratando erros, caso ocorram.
}

// Exportando a função 'migrationsRun' para ser utilizada em outros arquivos.
module.exports = migrationsRun;
