const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');

const { crearCategoria, 
        actualizarCategoria, 
        obtenerCategorias, 
        obtenerCategoriasByID,
        categoriaDelete } = require('../controllers/categorias');

const { validarCategoriaByID } = require('../helpers');

//Como tengo un archivo index.js en middlewares puedo solo llamar a ../middlewares
const { 
       validarCampos, 
       validarJWT,
       tieneRole } = require('../middlewares');


//Instancia del Router
const router = Router();

/*
{{url}}/api/categorias
*/

//Obtener todas las categorías - Publico
router.get('/', obtenerCategorias);


//GET - Obtener una categoría por ID - público
router.get('/:id',[
     //Verificar que el id enviado sea un id válido de mongo
     check('id', 'No es un ID válido').isMongoId(),

     //Validar que exista la categoría
     check('id').custom ( validarCategoriaByID ),

     validarCampos

],obtenerCategoriasByID );


// Crear categoría - Privado - Cualquier persona con un token válido
router.post('/', [
    validarJWT, // como es privado se comprueba que se tenga un token válido
    check('nombre','El nombre es obligatorio').not().isEmpty(),

    //Lanzar el error si no se cumple todo lo del express-validator
    //Todos los check
    validarCampos
    
], crearCategoria);


//Actualizar registro por ID - Cualquiera con token válido
router.put('/:id',[

    //Necesito enviar JWT para hacer actualizaciones
    validarJWT,

    check('nombre','El nombre es obligatorio').not().isEmpty(),

    //Verificar que el id enviado sea un id válido de mongo
    check('id', 'No es un ID válido').isMongoId(),

    //Validar que exista la categoría
    check('id').custom ( validarCategoriaByID ),
    validarCampos

], actualizarCategoria);

//Borrar una categoría - Solo si es admin
router.delete('/:id',[
    
    //validar que tenga un JWT Válido (Esto siempre la primera validación).
    validarJWT,

    //esta función regresa otra función, (valida si el usuario tiene alguno de esos roles)
    tieneRole('ADMIN_ROLE', 'SUPER_USER_ROLE'),

    //Verificar que el id enviado sea un id válido de mongo
    check('id', 'No es un ID válido').isMongoId(),

    //Validar que exista la categoría
    check('id').custom ( validarCategoriaByID ),

    //Validar campos por que estoy usando el check
    validarCampos //Middleware después de todas las validaciones del check

], categoriaDelete);



module.exports = router;