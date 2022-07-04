const express = require('express');
const cors = require('cors');


const { conexion } = require('../database/config');


class Server {
    constructor() {
        //Framework express.
        this.app = express();

        //Variables globales
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }

        //Ruta de usuarios
        //this.usuariosPath = '/api/usuarios';
        //Paso 1. Nueva ruta
        //this.authPath = '/api/auth';


        //Conectar a la base de datos
        this.conexionDB();

        //Middlewares -- Funciones que agregan otras funcionalidades al webserver
        //Función que siempre se ejecuta cuando se levanta el servidor
        this.middlewares();

        
        //cuando se llama al constructor se llama a las rutas
        //Rutas de la aplicación
        this.routes();
        
    }


    //Métodos

    //Conexión a la base de datos
    async conexionDB(){
        await conexion();
    }



    //Middlewares función que se ejecuta antes de llamar un controlador o seguir con la ejecución de las validaciones
    middlewares(){
        //Directorio Público
        //Esta sirviendo el archivo index.html
        this.app.use( express.static('public') );

        //CORS  //siempre es importante configurar el CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        //Capturar la información que es envia en POST, DELETE O PUT
        //Lo intenterá serializar a JSON
        this.app.use( express.json() );
    }

    routes() {

        //Paso 2. Nueva ruta
        //Paso 3. Cear el archivo auth en las rutas
        this.app.use(this.paths.auth, require('../routes/auth'));
        //Ruta de categorías
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        //Ruta Productos
        this.app.use(this.paths.productos, require('../routes/productos'));
        //Ruta usuarios
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));

    }


    //método listen
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor en puerto', this.port );
        });
    }

}


module.exports = Server;