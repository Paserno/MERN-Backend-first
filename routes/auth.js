/* 
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth-controller');

const router = Router();

// Rutas
router.get('/renew', revalidarToken);

router.post('/new', crearUsuario);

router.post('/', loginUsuario);



module.exports = router;