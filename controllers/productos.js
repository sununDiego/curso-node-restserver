const { response } = require('express');
const { Producto} = require('../models')



const crearProducto = async (req, res = response) => {

    //Extraer el nombre y descripcion que viene en el body
    const { nombre, descripcion, categoria } = req.body;

    //Comprobar que no existe ese producto
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) { //Si la categoría existe
        return res.status(400).json({
            msg: `El Producto ${nombre} ya existe en la DB`
        });
    }

    //Data a guardar
    const data = {
        nombre,
        descripcion,
        usuario: req.usuario._id, //id del JWT el id tiene que ser un id de mongo viene en el header
        categoria: categoria //La categoría viene en el body
    }

    //Grabar datos en DB
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto) //201 algo se creo

}


module.exports = {
    crearProducto,
    //actualizarCategoria,
    //obtenerCategorias,
    //obtenerCategoriasByID,
    //categoriaDelete
}