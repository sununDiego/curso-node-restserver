const { response } = require('express');

const esAdminRole = (req, res = response, next ) => {

    if (!req.usuario) { //validar petición 
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    //rol así lo tengo grabado en la base de datos
    // usuario se creo en base al uid que venía en el jwt
    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}


//como es un middleware se tiene que mandar un req, res, next
//Pero yo no quiero mandar eso... 
//Usamos el operador rest... todo en un conjunto - lo transforma en un arreglo 
//
const tieneRole = ( ...roles  ) => { //recibo todos los roles 10, 15 o los que sean
    return (req, res = response, next) => { //return del middleware
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) { //si el rol del usuario no está incluido en el arreglo
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}