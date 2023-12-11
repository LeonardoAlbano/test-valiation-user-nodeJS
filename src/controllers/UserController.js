// Importando o módulo hash e compare da biblioteca "bcryptjs".
const { hash, compare } = require("bcryptjs")

// Importando a classe 'AppError' de um arquivo chamado 'AppError' no diretório '../Utils'.
const AppError = require("../Utils/AppError");

// Importando o módulo sqliteConnection do arquivo "../database/sqlite".
const sqliteConnection = require("../database/sqlite")

// Definindo a classe 'UserController'.
class UserController {
    // Método para criar um novo usuário.
    async create(request, response) {
        // Extrai os dados do corpo da requisição.
        const { name, email, password } = request.body;

        // Conecta ao banco de dados SQLite.
        const database = await sqliteConnection();

        // Verifica se o e-mail já está em uso.
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso!!");
        }

        // Gera um hash da senha usando o bcrypt e um custo de 8.
        const hashedPassword = await hash(password, 8)

        // Insere os dados do novo usuário no banco de dados.
        await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
            [name, email, hashedPassword]
        )

        // Retorna uma resposta de sucesso (status 201 - Created).
        return response.status(201).json();
    }

    // Método para atualizar informações de um usuário.
    async update(request, response) {
        // Extrai os dados do corpo da requisição.
        const { name, email, password, old_password } = request.body;
        // Obtém o ID do usuário a ser atualizado dos parâmetros da requisição.
        const { id } = request.params;

        // Conecta ao banco de dados SQLite.
        const database = await sqliteConnection();

        // Obtém os dados do usuário com o ID fornecido.
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        // Se o usuário não existe, lança um erro.
        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        // Verifica se o novo e-mail já está em uso por outro usuário.
        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        }

        // Atualiza os dados do usuário com base nos dados fornecidos na requisição.
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // Verifica se a senha foi fornecida, mas a senha antiga não foi.
        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha!");
        }

        // Se tanto a senha quanto a senha antiga foram fornecidas, verifica se a senha antiga está correta.
        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            // Se a senha antiga não estiver correta, lança um erro.
            if (!checkOldPassword) {
                throw new AppError("A Senha antiga não confere.");
            }

            // Gera um novo hash para a nova senha.
            user.password = await hash(password, 8)
        }

        // Atualiza os dados do usuário no banco de dados.
        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
            [user.name, user.email, user.password, id]
        );

        // Retorna uma resposta de sucesso (status 200 - OK).
        return response.status(200).json();
    }
}

// Exportando a classe 'UserController' para ser utilizada em outros arquivos.
module.exports = UserController;
