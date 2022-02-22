const { response } = require('express');

const crearUsuario = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'Register new'
    })
}

const loginUsuario = (req, res) => {
    
    res.json({
        ok: true,
        msg: 'login'
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