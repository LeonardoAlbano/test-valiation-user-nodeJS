// Importando o módulo 'express-async-errors', que lida automaticamente com erros assíncronos em rotas assíncronas.
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations")

// Importando a classe 'AppError' de um arquivo chamado 'AppError' na pasta 'Utils'.
const AppError = require("./Utils/AppError");

// Importando o módulo 'express'.
const express = require("express");

// Importando as rotas definidas no arquivo 'routes'.
const routes = require("./routes");


migrationsRun();


// Criando uma instância do aplicativo Express.
const app = express();

// Adicionando middleware para lidar com dados JSON no corpo da requisição.
app.use(express.json());

// Adicionando as rotas ao aplicativo Express.
app.use(routes);



// Middleware para lidar com erros. Este middleware é chamado quando um erro é passado para a função 'next' em qualquer parte do código.
app.use((error, request, response, next) => {
    // Verificando se o erro é uma instância da classe 'AppError'.
    if (error instanceof AppError) {
        // Se for, retorna uma resposta JSON com o status e a mensagem do erro.
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    // Se não for uma instância de 'AppError', loga o erro no console.
    console.error(error);

    // Retorna uma resposta JSON genérica para erros internos do servidor.
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

// Definindo a porta em que o servidor irá escutar as conexões.
const PORT = 3000;

// Iniciando o servidor na porta especificada e exibindo uma mensagem no console quando o servidor estiver pronto.
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
