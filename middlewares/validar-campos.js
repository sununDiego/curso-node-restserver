const { validationResult } = require('express-validator');


//como es un middleware tengo que agregar un argumento Next
/*Si este Middleware pasa se ejecuta next */
const validarCampos = ( req, res, next ) => { 
    /*Express validator*/
    const errors = validationResult(req);
    if( !errors.isEmpty() ){ //Si hay error
        return res.status(400).json(errors); //Error 400 
    }

    //Si no hubo error Sigue con el siguiente Middleware
    //Si no hay otro middleware sigue el controlador
    next();
}


module.exports = {
    validarCampos
}