const { autenticador, contas } = require('../banco_de_dados/banco_de_dados')

const validacaoPrimaria = (req, res, next) => {
    const { senhaPrimaria } = req.query;

    try {
        if (!senhaPrimaria) {
            return res.status(400).json({ mensagem: 'Por favor, digite a senha!'})
        }
        if (senhaPrimaria === autenticador) {
            next()
        } else {
            return res.status(400).json({ mensagem: 'Por favor, digite a senha correta!'})
        }

    } catch (error) {
        return res.status(400).json({ mensagem: `${error}`})
    }
};

const verificadorConta = (req, res, next) => {
    const { cpf, telefone, email } = req.body;

    
    const cpfEncontrado = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    });

    const emailEncontrado = contas.find((conta) => {
        return conta.usuario.email === email});
    
    const telefoneEncontrado = contas.find((conta) => {
        return conta.usuario.telefone === telefone});


    if (!cpfEncontrado && !emailEncontrado && !telefoneEncontrado) {
        next()
    } else if (cpfEncontrado) {
        return res.status(400).json({ mensagem: 'CPF ja cadastrado!'})
    } else if (emailEncontrado) {
        return res.status(400).json({ mensagem: 'Email ja cadastrado!'})
    } else if (telefoneEncontrado) {
        return res.status(400).json({ mensagem: 'Telefone ja cadastrado!'})
    }
};

module.exports = {
    validacaoPrimaria,
    verificadorConta
}