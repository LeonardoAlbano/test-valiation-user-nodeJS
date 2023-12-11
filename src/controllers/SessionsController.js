// Importa o módulo 'knex', que é uma biblioteca SQL query builder para Node.js
const knex = require("../database/knex");

// Importa a classe 'AppError' definida em algum lugar do projeto, usada para manipular erros personalizados
const AppError = require("../Utils/AppError");

// Importa a função 'compare' do módulo 'bcryptjs', que é usada para comparar senhas criptografadas
const { compare } = require("bcryptjs");

// Importa as configurações de autenticação definidas no arquivo '../configs/auth'
const authConfig = require("../configs/auth");

// Importa a função 'sign' do módulo 'jsonwebtoken', que é usada para gerar tokens JWT
const { sign } = require("jsonwebtoken");

// Define a classe 'SessionsController'
class SessionsController {
    // Define um método assíncrono chamado 'create' para autenticar um usuário
    async create(request, response){
        // Extrai o e-mail e senha do corpo da requisição
        const { email, password } = request.body;

        // Consulta o banco de dados para encontrar um usuário com o e-mail fornecido
        const user = await knex("users").where({ email }).first();

        // Se não encontrar o usuário, lança um erro personalizado
        if(!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt
        const passwordMatched = await compare(password, user.password);

        // Se as senhas não coincidirem, lança um erro personalizado
        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        // Extrai as configurações JWT do arquivo de configuração
        const { secret, expiresIn } = authConfig.jwt;

        // Gera um token JWT com o ID do usuário como o 'subject' e o tempo de expiração configurado
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        // Se a autenticação for bem-sucedida, retorna os dados do usuário e o token JWT em formato JSON
        return response.json({ user, token });
    }
}

// Exporta a classe 'SessionsController' para que ela possa ser utilizada em outros arquivos
module.exports = SessionsController;
