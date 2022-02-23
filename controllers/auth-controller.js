const { response } = require('express');

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    if ( password.length < 5 ){
        return res.status(400).json({
            ok: false,
            msg: 'La contraseña debe de ser de 5 caracteres'
        })
    }
    
    res.json({
        ok: true,
        msg: 'Register new',
        name,
        email,
        password
    })
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