/* 
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');

const router = Router();

// Rutas
router.get('/', (req, res) => {
    
    res.json({
        ok: true
    })
});



module.exports = router;