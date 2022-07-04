const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
    }
});


//Métodos que me permiten sobrescribir los existentes de mongoose
//Métodos personalizados
//Cuando se mande a llamar el toJSON se ejecuta la función
CategoriaSchema.methods.toJSON = function() {
    //En las consultas ya no me regresa el _v, estado
    //solo estoy retornando el resto
    const { __v, estado, ...data } = this.toObject(); 
    return data;
}

module.exports = model('Categoria', CategoriaSchema);