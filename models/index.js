/*Centralizar modelos en un único archivo */

const Categoria = require('../models/categoria');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');
const Producto = require('./producto');


module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario
}