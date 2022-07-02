const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

//Uso del modelo
const Usuario = require ('../models/usuario');

//importar el JWT
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verifi');

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


//Google sing-in
const googleSingIn = async (req, res= response) =>{

    //se obtiene del request.body
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify( id_token );
        //console.log( googleUser );

        //verificar que el correo existe en la DB
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            const data = {
                nombre, 
                correo,
                password: ':P',
                img,
                google: true
            };

            //Crear nuevo usuario
            usuario = new Usuario ( data );
            await usuario.save(); //se guarda en DB
        }

        //else ( usuario ) si ya existe podemos actualizar algunos datos
        //esto es opcional


        //Si el usuario en DB no este borrado, estado en false
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el Administrador - Usuario bloqueado'
            });
        } 

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            //msg: 'ok',
            usuario,
            token
        });
        
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar' 
        }); 
    }

}


module.exports = {
    login,
    googleSingIn
}