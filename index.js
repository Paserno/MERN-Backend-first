const express = require('express');
require('dotenv').config();

const port = process.env.PORT;

// Crear el servidor de express
const app = express();

// Directorio Publico
app.use( express.static('public') );


// Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos


// Escuchar peticiones
app.listen( port, () => {
    console.log(`Servidor en puerto ${ port }`)
} );

