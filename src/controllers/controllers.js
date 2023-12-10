const { contas }  = require('../banco_de_dados/banco_de_dados');

const paginaInicial = (req, res) => {
    try {
        const { nome_usuario, senha } = req.body;
        if (!nome_usuario) {
            return res.status(404).json(  'INSIRA SEUS DADOS PARA LOGIN' )
        };

        if (!senha) {
            return res.status(404).json(  'INSIRA SEUS DADOS PARA LOGIN' )
        }
        const contaEncontrada = contas.find((conta) => {
            return conta.usuario.nome_usuario === nome_usuario});

        if (!contaEncontrada ) {
            return res.status(404).json(  'CONTA NAO ENCONTRADA, INSIRA CORRETAMENTE OU REGISTRE-SE' )
        }
        if (senha === contaEncontrada.usuario.senha) {
            return res.status(200).json({ mensagem: 'LOGIN FEITO COM SUCESSO!'})
        } else {
            return res.status(404).json(  'INSIRA SUA SENHA CORRETA PARA LOGIN' )
        }
    } catch (error) {
        return res.status(400).json({ mensagem: `${error}`});
    }
}
const listagemContas = (req, res) => {
    return res.status(200).json(contas);
};

const criarConta = (req, res) => {
    const { nome_usuario, cpf, data_nascimento, telefone, email, senha } = req.body;
    const identificadorNumeroConta = () => {  
    
        const idsExistentes = contas.map(conta => Number(conta.id));
    
        for (let i = 1; i <= idsExistentes.length + 1; i++) {
            if (!idsExistentes.includes(i)) {
                return i;
            }
        }
    }
    let id = (identificadorNumeroConta(contas)).toString();
    
    try {
        if (!nome_usuario) {
            return res.status(400).json({ mensagem: 'Nome não inserido'} )
        };
        if (!cpf) {
            return res.status(400).json({ mensagem: 'CPF de nascimento não inserido'} )
        };
        if (!data_nascimento) {
            return res.status(400).json({ mensagem: 'Data de nascimento não inserido'} )
        };
        if (!telefone) {
            return res.status(400).json({ mensagem: 'Telefone não inserido'} )
        };
        if (!email) {
            return res.status(400).json({ mensagem: 'Email não inserido'} )
        };
        if (!senha) {
            return res.status(400).json({ mensagem: 'Senha não inserido'} )
        };
        
        let conta = {
            id,
            usuario: {
            nome_usuario,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
            }
        };
        
        contas.push(conta);
        const organizarOrdem = () => {
            return contas.sort((a, b) => a.id.localeCompare(b.id))
        };
    organizarOrdem();
    return res.status(201).json({ mensagem: 'Conta criada com Sucesso', conta});
    } catch (error) {
        return res.status(400).json({ mensagem: `${error}`});
    };
};

module.exports = {
    listagemContas,
    criarConta,
    paginaInicial
}