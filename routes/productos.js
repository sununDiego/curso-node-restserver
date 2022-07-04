const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');
const { crearProducto } = require('../controllers/productos');
const { validarCategoriaByID } = require('../helpers');

//Como tengo un archivo index.js en middlewares puedo solo llamar a ../middlewares
const { 
    validarCampos, 
    validarJWT,
} = require('../middlewares');


//Instancia del Router
const router = Router();

/*
{{url}}/api/productos
*/

// Crear producto - Privado - Cualquier persona con un token válido
router.post('/', [
    validarJWT, // como es privado se comprueba que se tenga un token válido
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    //Validar que exista la categoría
    check('categoria').custom ( validarCategoriaByID ),

    //Lanzar el error si no se cumple todo lo del express-validator
    //Todos los check
    validarCampos
    
], crearProducto);


module.exports = router;