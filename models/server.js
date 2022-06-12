const express = require('express');
const cors = require('cors');


const { conexion } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';

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



    //Middlewares
    middlewares(){
        //Directorio Público
        this.app.use( express.static('public') );

        //CORS  //siempre es importante configurar el CORS
        this.app.use( cors() );


        //Lectura y parseo del body
        //Capturar la información que es envia en POST, DELETE O PUT
        //Lo intenterá serializar a JSON
        this.app.use( express.json() );




    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }





    //método listen
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor en puerto', this.port );
        });
    }

}


module.exports = Server;