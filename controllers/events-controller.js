const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');



    return res.json({
        ok:true,
        eventos
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

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        
        return res.json({
            ok:true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
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