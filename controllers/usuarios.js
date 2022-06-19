//Crear funciones y exportarlas

const { request, response } = require('express');


//Pquete para cifrar password
const bcriptjs = require('bcryptjs');

//Importar el modelo usuarios
//Con lo cual podremos crear instancias de ese modelo
const Usuario = require('../models/usuario');


//Función GET
const usuariosGet = (req = request, res = response) => {

    //Desestructuración de los query ?nombre=diego&password=123456
    //Podemos asignar valores por defecto
    const { q, nombre = 'No name', password, page = 1, limit } = req.query;

    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        password,
        page,
        limit
    });
}


const usuariosPost = async (req, res = response) => {


    //Capturar el body en el request.
    //Desestructuración del body 
    //const { nombre, edad } = req.body;

    const { nombre, correo, password, rol } = req.body;

    //const { nombre, ...resto } = req.body;


    //Instancia de usuario
    //Le manda todos los argumentos del body
    /*Si hay un nuevo campo definido en el body
    Como no esta en el modelo no se graba en la BD, esto lo gestiona
    mongoose
    */
    const usuario = new Usuario({ nombre, correo, password, rol });

    /*CIFRADO DE LA CONTRASEÑA*/
    /*Hash del password */
    const salt = bcriptjs.genSaltSync(10); //Número de iteraciones para el password
    usuario.password = bcriptjs.hashSync(password, salt)

    /*Grabar el registro en BD*/
    await usuario.save();

    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        //ok: true,
        //msg: 'post API - controlador',
        //Reflejo el body en el response para visualizarlo en postman
        usuario
    });
}


const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    //Desestructurar la información que viene en el body
    const { password, google, correo, ...resto } = req.body;

    /* Todo validar vs. Base de datos*/
    /* Si actualiza la contraseña aquí lo guarda en resto.*/
    if (password) { //Si viene la contraseña se quiere cambiar el password
        /*Hash del password */
        const salt = bcriptjs.genSaltSync(10); //Número de iteraciones para el password
        resto.password = bcriptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        //ok: true,
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        ok: true,
        msg: 'delete API - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}