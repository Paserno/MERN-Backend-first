const { response } = require('express');


const getEventos = ( req, res = response ) => {

    return res.json({
        ok:true,
        msg: 'getEventos'
    });
}

const crearEvento = ( req, res = response ) => {

    console.log(req.body);

    return res.json({
        ok:true,
        msg: 'crearEvento'
    });
}

const actualizarEvento = ( req, res = response ) => {

    return res.json({
        ok:true,
        msg: 'actualizarEvento'
    });
}

const eliminarEvento = ( req, res = response ) => {

    return res.json({
        ok:true,
        msg: 'eliminarEvento'
    });
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}