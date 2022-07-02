const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


//Instancia del Router
const router = Router();


//Configura las rutas
//Endpoints
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    //Custom middlewares
    validarCampos
], login ); //Finalmente llama al controlador


//Sing-in con Google
//localhost:8080/api/google
router.post('/google',[
    //Tienen que mandar el id_token
    check('id_token', 'El id_token de Google es necesario').not().isEmpty(),
    //Custom middlewares
    validarCampos
], googleSingIn ); //instancia del controlador




module.exports = router;