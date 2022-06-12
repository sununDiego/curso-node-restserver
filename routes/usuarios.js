//Rutas relacionadas al usuario

//Esto me va a permitir crear una instancia de Router
const { Router } = require('express');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete
    } = require('../controllers/usuarios');

const router = Router();


//Configura las rutas
//Endpoints
router.get('/', usuariosGet );

router.post('/', usuariosPost );

router.put('/:id',  usuariosPut );

router.delete('/', usuariosDelete );



module.exports = router;