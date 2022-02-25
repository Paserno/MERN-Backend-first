const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = ( req, res = response ) => {

    return res.json({
        ok:true,
        msg: 'getEventos'
    });
}

const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );
    try {
        evento.user = req.uid;

        const eventSave = await evento.save();

        return res.json({
            ok:true,
            evento : eventSave
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el Administrador'
        });
    }

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