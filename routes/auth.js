/* 
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check }  = require('express-validator');

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth-controller');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

// Rutas
router.get('/renew', revalidarToken);

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
],  crearUsuario);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);



module.exports = router;