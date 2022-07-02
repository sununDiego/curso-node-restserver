const { response } = require('express');
const bcryptjs = require('bcryptjs');

//Uso del modelo
const Usuario = require ('../models/usuario');

//importar el JWT
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request , res = response ) =>{

    /* */
    const { correo, password } =req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){ //si el usuario no existe
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo '
            });
        }


        //verificar si el usuario esta activo
        if ( usuario.estado == false ){ //si el usuario no existe
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - Estado: false '
            });
        }


        //verificar la contraseña
        //comparación contra la base de datos regresa un boleano
        const validPassword = bcryptjs.compareSync( password, usuario.password ); 
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - Password incorrecto '
            });
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            //msg: 'Login ok',
            //correo, password
            usuario, //Que se acaba de autenticar
            token

        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ //Erorr de servidor
            msg: 'Hable con el administrador'
        })
        
    }

    

}


module.exports = {
    login
}