const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email: email});

        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }
        usuario = new Usuario( req.body );
    
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar con el Administrador'
        });
    }
}

const loginUsuario = (req, res) => {

    const { email, password } = req.body;
    
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidarToken = (req, res) => {
    
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,

}