const express = require('express');
require('dotenv').config();

const port = process.env.PORT;

// Crear el servidor de express
const app = express();

// Directorio Publico
app.use( express.static('public') );


// Rutas
// app.get('/', (req, res) => {
    
//     res.json({
//         ok: true
//     })

// })


// Escuchar peticiones
app.listen( port, () => {
    console.log(`Servidor en puerto ${ port }`)
} );

