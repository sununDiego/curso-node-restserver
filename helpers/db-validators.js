const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => { //verificación personalizada mandando el custom
    //El custom recibe como argumento el rol que recibo del body, en caso de no venga el parámetro se asigna un valor vacío
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) { //Si no existe el rol
        //Express validator funciona con el throw new error para errores personalizados
        throw new Error(` El rol  ${rol} no esta registrado en el Base de datos`)  //Error personalizado que es capturado en el Custom
    }
}

const emailExiste = async ( correo = '') => {
    /*Verificar que el correo existe */
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}



module.exports = {
    esRolValido,
    emailExiste
}