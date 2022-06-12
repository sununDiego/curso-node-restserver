//importaciones propias de NODE

//importaciones de terceros
require('dotenv').config();

//importar server
const Server = require('./models/server');

//Llamando la instancia del servidor
const server = new Server();

//Ejecutar método listen
server.listen();
