const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

//Validar que el usuario tenga un JWT válido
const validarJWT = async (req = request, res = response, next) => { //middleware se dispara con tres argumentos

    //como token de acceso el jwt va en los headers
    /*
     nombres: 
     Authorization
     x-token
     x-apikey

    */

    //captura del token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    //validación de JWT
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponde al uid
        //Existe un usuario y se encontró el uid es el id del usuario registrado en la BD
        const usuario = await Usuario.findById(uid); //Consulta a la base de datos

        if (!usuario) { //Si usuario no existe
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        }

        //validar que el usuario no tiene estatus false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado en false '
            });
        }

        // console.log(payload);

        //propiedad nueva dentro del objeto request
        req.usuario = usuario; //colocado en el request
        next(); //Si todo sale bien se ejecuta lo que sigue


    } catch (error) {
        //console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });

    }
}



module.exports = {
    validarJWT
}