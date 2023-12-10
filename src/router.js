const express = require('express');
const { listagemContas, criarConta, paginaInicial } = require("./controllers/controllers")
const { validacaoPrimaria, verificadorConta } = require("./middlewares/middlewares")

const rotas = express()


rotas.post('/login', paginaInicial)
rotas.get('/contas', validacaoPrimaria, listagemContas);
rotas.post('/contas/criar',verificadorConta, criarConta);

module.exports = rotas