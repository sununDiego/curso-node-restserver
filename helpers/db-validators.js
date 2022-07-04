const Role = require('../models/role');
const {Usuario, Categoria  } = require('../models');

const esRolValido = async (rol = '') => { //verificación personalizada mandando el custom
    //El custom recibe como argumento el rol que recibo del body, en caso de no venga el parámetro se asigna un valor vacío
    const existeRol = await Role.findOne({ rol }); // Por que aquí entre llaves ???????

    if (!existeRol) { //Si no existe el rol
        //Express validator funciona con el throw new error para errores personalizados
        throw new Error(` El rol  ${rol} no esta registrado en el Base de datos`)  //Error personalizado que es capturado en el Custom
    }
}

const emailExiste = async ( correo = '') => {
    /*Verificar que el correo existe */
    const existeEmail = await Usuario.findOne({ correo }); //Por que aquí entre llaves ??????
    if (existeEmail) {
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}


/*Validar si existe el ID de un usuario en la base de datos */
const usuarioExisteByID = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${ id } no existe en la base de datos`);
    }
}


/*Validar si existe el ID de un usuario en la base de datos */
const validarCategoriaByID = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id: ${ id } no existe en la base de datos`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    usuarioExisteByID,
    validarCategoriaByID
}