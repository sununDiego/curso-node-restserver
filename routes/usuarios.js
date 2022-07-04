//Rutas relacionadas al usuario

const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');

//middlewares
 //const { validarCampos } = require('../middlewares/validar-campos');
 //const { validarJWT } = require('../middlewares/validar-jwt');
 //const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {
     validarCampos,
     validarJWT,
     esAdminRole,
     tieneRole

   } = require('../middlewares')

const { esRolValido, emailExiste, usuarioExisteByID } = require('../helpers');


const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/usuarios');



//Instancia del Router
const router = Router();


//Configura las rutas
//Endpoints
router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password debe contener más de 6 letras').isLength({ min: 6 }),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROL']),

    //Validar si existe el correo Validación personalizada
    check('correo').custom(emailExiste),

    //Validar rol contra la base de datos
    check('rol').custom(esRolValido),

    validarCampos, //Middleware después de todas las validaciones del check    
], usuariosPost);


router.put('/:id', [
    //Verificar que el id enviado sea un id válido de mongo
    check('id', 'No es un ID válido').isMongoId(),

    //Validar si el id existe Validación personalizada
    check('id').custom(usuarioExisteByID),

    //Validar rol contra la base de datos
    check('rol').custom(esRolValido),

    validarCampos //Middleware después de todas las validaciones del check 
], usuariosPut);


router.delete('/:id', [
    
    validarJWT, //validar que tenga un JWT Válido (Esto siempre la primera validación). 
    
    //Verificar que el usuario es administrador (solo un rol)
    //esAdminRole,

    //esta función regresa otra función, (valida si el usuario tiene alguno de esos roles)
    tieneRole('ADMIN_ROLE', 'SUPER_USER_ROLE'),

    //Verificar que el id enviado sea un id válido de mongo
    check('id', 'No es un ID válido').isMongoId(),
    
    //Validar si el id existe Validación personalizada
    check('id').custom(usuarioExisteByID),

    //Validar campos por que estoy usando el check
    validarCampos //Middleware después de todas las validaciones del check


], usuariosDelete);



module.exports = router;