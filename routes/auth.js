const { Router } = require('express'); //Esto me va a permitir crear una instancia de Router
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
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
], login );




module.exports = router;