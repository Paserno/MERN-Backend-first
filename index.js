const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const port = process.env.PORT;

// Crear el servidor de express
const app = express();

// Directorio Publico
app.use( express.static('public') );

// Base de Datos MongoDB
dbConnection();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );


// Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos


// Escuchar peticiones
app.listen( port, () => {
    console.log(`Servidor en puerto ${ port }`)
} );

