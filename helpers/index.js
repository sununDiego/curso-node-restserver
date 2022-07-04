const validarCategoriaByID = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verifi');


//Exporto un objeto
module.exports = {

    //usando el operador
    ...validarCategoriaByID, // Por que se usó el operador ...?
    ...generarJWT,
    ...googleVerify
}

