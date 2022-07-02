//middlewares
const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

//Exporto un objeto
module.exports = {

    //usando el operador
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}