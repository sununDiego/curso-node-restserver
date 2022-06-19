//Rutas relacionadas al usuario


const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

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

     check('rol').custom( async (rol = '') => { //verificación personalizada mandando el custom
        //El custom recibe como argumento el rol que recibo del body, en caso de no venga el parámetro se asigna un valor vacío
        const existeRol = await Role.findOne({ rol });
        if( !existeRol ){ //Si no existe el rol
            //Express validator funciona con el throw new error para errores personalizados
            throw new Error(` El rol  ${ rol } no esta registrado en el Base de datos`)  //Error personalizado que es capturado en el Custom
        }
    }),

    validarCampos, //Middleware después de todas las validaciones del check    
], usuariosPost );
 

router.put('/:id',  usuariosPut );

router.delete('/', usuariosDelete );



module.exports = router;