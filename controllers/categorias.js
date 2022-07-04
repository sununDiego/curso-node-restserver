/*Que hará mi aplicación */

const { response } = require('express');
const { Categoria } = require('../models')


//1. Obtener categorías - páginado -total de categorías
//Populate ultimo usuario que modificó esa categoria 
const obtenerCategorias = async (req = request, res = response) => {

    //Desestructuración de los query
    const { limite = 5, desde = 0 } = req.query;  //Si no viene el limite, por defecto su valor será de 5
    const condicion = { estado: true };

    //Colección de promesas
    const [total, categorias] = await Promise.all([ //Promise.all ejecuta ambas de manera simulatanea, si una da error todas dan error
        Categoria.countDocuments(condicion),
        Categoria.find(condicion)
            .populate('usuario', 'nombre') //Solo mostrar el nombre del usuario ¿De donde viene usuario? Del model categorías Mongoose    
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    });
}




//Obtener categoría - populate { objeto de la categoría }
const obtenerCategoriasByID = async (req = request, res = response) => {

    //Obtener id
    const { id } = req.params;

    //Consulta a la base de datos
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    });
}


//Actualiza categoría - Solo recibe el nombre
const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;

    //Desestructurar la información que viene en el body
    const { estado, usuario, ...data } = req.body;

    //solo cambia el valor de la propiedad aunque sea constante
    data.nombre = data.nombre.toUpperCase();

    //Usuario que hizo la modificación
    data.usuario = req.usuario._id;

    /* Todo validar vs. Base de datos*/
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true}); //new: true para que mande el documento actualizado

    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        categoria
    });
}


//Borrar categoría - cambiar estado.
const categoriaDelete = async (req, res = response) => {

    const { id } = req.params;

    //cambiando el estado del usuario
    const categoriaEliminada = await Categoria.findByIdAndUpdate ( id, { estado: false }, {new: true} ); // new: true Registro actualizado

    //Se envía un objeto. En una petición JSON se envía un objeto 
    //res.json({ usuarioEliminado, usuarioAutenticado });
    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        categoriaEliminada
    });

    //Otra forma de imprimir el usuario eliminado
    //res.json(usuarioEliminado);
}


const crearCategoria = async (req, res = response) => {

    //Extraer el nombre que viene en el body
    //Todo en Mayusculas.
    const nombre = req.body.nombre.toUpperCase();

    //Comprobar que no existe esa categoria
    const categoriaDb = await Categoria.findOne({ nombre });

    if (categoriaDb) { //Si la categoría existe
        return res.status(400).json({
            msg: `La categoría ${nombre} ya existe en la DB`
        });
    }

    //Data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id //id del JWT el id tiene que ser un id de mongo
    }

    //Grabar datos en DB
    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria) //201 algo se creo

}



module.exports = {
    crearCategoria,
    actualizarCategoria,
    obtenerCategorias,
    obtenerCategoriasByID,
    categoriaDelete
}