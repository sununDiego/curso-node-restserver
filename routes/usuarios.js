//Rutas relacionadas al usuario


const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, usuarioExisteByID } = require('../helpers/db-validators');


const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete
    } = require('../controllers/usuarios');



const router = Router();


//Configura las rutas
//Endpoints
router.get('/', usuariosGet );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password debe contener más de 6 letras').isLength({ min: 6 }),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROL']),

    //Validar si existe el correo Validación personalizada
    check('correo').custom( emailExiste ) ,
    
    //Validar rol contra la base de datos
    check('rol').custom( esRolValido ),

    validarCampos, //Middleware después de todas las validaciones del check    
], usuariosPost );
 

router.put('/:id', [
    //Verificar que el id enviado sea un id válido de mongo
    check('id', 'No es un ID válido').isMongoId(),

    //Validar si el id existe Validación personalizada
    check('id').custom( usuarioExisteByID ),

    //Validar rol contra la base de datos
    check('rol').custom( esRolValido ),

    validarCampos //Middleware después de todas las validaciones del check 
],usuariosPut );


router.delete('/', usuariosDelete );



module.exports = router;