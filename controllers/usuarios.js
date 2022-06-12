//Crear funciones y exportarlas

const { request, response } = require('express');

//Función GET
const usuariosGet = (req = request, res = response) => {
    
    //Desestructuración de los query ?nombre=diego&password=123456
    //Podemos asignar valores por defecto
    const { q, nombre = 'No name', password, page = 1, limit } = req.query;
    
    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        password,
        page,
        limit
    });
}


const usuariosPost = (req, res = response) => {
 
    //Capturar el body en el request.
    //Desestructuración del body 
    const { nombre, edad } = req.body;
    
    
    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        ok: true,
        msg: 'post API - controlador',

        //Reflejo el body en el response
        nombre,
        edad
    });
}


const usuariosPut = (req, res = response) => {
    
    const { id } = req.params;
    
    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        ok: true,
        msg: 'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({ //Se envía un objeto. En una petición JSON se envía un objeto 
        ok: true,
        msg: 'delete API - controlador'
    });
}



module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}