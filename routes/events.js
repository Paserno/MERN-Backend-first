/*
    Event Router
    host + /api/events
*/

const { Router } = require('express');
const { check }  = require('express-validator');
const { 
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento } = require('../controllers/events-controller');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

// Todas tienen que pasar po la validación del JWT
router.use( validarJWT );


// Obtener Eventos
router.get('/', getEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;
