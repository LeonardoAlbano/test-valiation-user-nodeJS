// Definindo a classe 'AppError'.
class AppError {
    // Propriedades da classe para armazenar a mensagem de erro e o código de status HTTP.
    message;
    statusCode;

    // Construtor da classe, que é chamado quando uma nova instância de 'AppError' é criada.
    // Recebe uma mensagem de erro e um código de status HTTP (o padrão é 400 - Bad Request).
    constructor(message, statusCode = 400) {
        // Atribui a mensagem de erro à propriedade 'message'.
        this.message = message;
        // Atribui o código de status à propriedade 'statusCode'.
        this.statusCode = statusCode;
    }
}

// Exportando a classe 'AppError' para que ela possa ser utilizada em outros arquivos.
module.exports = AppError;
