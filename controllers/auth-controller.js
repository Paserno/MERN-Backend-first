const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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

        // Encriptar Contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
    
        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar con el Administrador'
        });
    }
}

const loginUsuario = async(req, res) => {

    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({ email });

        if ( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Email / Password no son validos - email'
            });
        }
        // Confirmar Password
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Email / Password no son validos - password'
            });
        }
        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        
        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar con el Administrador'
        });
    }
}

const revalidarToken = async(req, res) => {

    const { uid, name } = req;

    // Generar un nuevo JWT
    const token = await generarJWT( uid, name );
    
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,

}