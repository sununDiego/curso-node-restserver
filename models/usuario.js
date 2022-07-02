//Grabando objetos en bases de datos mongo
//colecciones en Mongo DB, las colecciones son tablas en base de datos relacionales

const { Schema, model } = require('mongoose');

//
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //Mongo se encarga de gestionar que no tenga correos repetidos
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    img: {
        type: String
    },

    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }
});


//Métodos que me permiten sobrescribir los existentes de mongoose
//Métodos personalizados

//Cuando se mande a llamar el toJSON se ejecuta la función
UsuarioSchema.methods.toJSON = function() {
    //Se extrae el password, la versión y también el _id
    //En las consultas ya no me regresa el _id
    //solo estoy retornando el resto
    const { __v, password, _id, ...usuario } = this.toObject(); 
    //cambiando _id por uid
    usuario.uid = _id;
    return usuario;
}


//Mongoose le asigna el nombre 'Usuario' a la colección junto con la "S" Usuarios

module.exports = model('Usuario', UsuarioSchema);