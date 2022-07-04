const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },

    //Que usuario creo la categoría
    usuario: {
        type: Schema.Types.ObjectId, //objeto en mongo
        ref: 'Usuario',
        required: true  //Todas las categorías deben tener un usuario
    },

    precio: {
        type: Number,
        default: 0
    },

    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',  //Relación con categorias
        required: true
    },

    descripcion: { type: String},

    disponible: {
        type: Boolean,
        default: true
    },
});


//Métodos que me permiten sobrescribir los existentes de mongoose
//Métodos personalizados
//Cuando se mande a llamar el toJSON se ejecuta la función
ProductoSchema.methods.toJSON = function() {
    //En las consultas ya no me regresa el _v, estado
    //solo estoy retornando el resto
    const { __v, estado, ...data } = this.toObject(); 
    return data;
}

module.exports = model('Producto', ProductoSchema);