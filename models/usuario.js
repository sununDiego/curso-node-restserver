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
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


//Mongoose le asigna el nombre 'Usuario' a la colección junto con la "S" Usuarios

module.exports = model('Usuario', UsuarioSchema);