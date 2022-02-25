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
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

// Todas tienen que pasar po la validación del JWT
router.use( validarJWT );


// Obtener Eventos
router.get('/', getEventos);

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
], crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;
