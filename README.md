> __Elemento Anterior 👀:__ __[First MERN - Frontend](https://github.com/Paserno/MERN-Frontend-first)__
# First MERN - Backend
Primera app MERN ( __Mongo__ - __Express__ - React - __Node.js__) utilizando las bases aprendidas para la implementación de todos estos elementos en conjuto, este repositorio será la parte del Backend.

Elementos utilizados:

Express
* __[Express](https://www.npmjs.com/package/express)__ - [Página Oficial](https://expressjs.com)
* __[Express-Validator](https://www.npmjs.com/package/express-validator)__ - [Pagina Oficial](https://express-validator.github.io/docs/)


MongoDB
* __[MongoDB Atlas](https://www.mongodb.com)__
* __[Mongoose](https://www.npmjs.com/package/mongoose)__ - [Página Oficial](https://mongoosejs.com)

JWT
* __[Json Web Token](https://www.npmjs.com/package/jsonwebtoken)__ - [Página Oficial](https://jwt.io)

Otros
* __[Doenv](https://www.npmjs.com/package/dotenv)__
* __[Cors](https://www.npmjs.com/package/cors)__
* __[Bcryptjs](https://www.npmjs.com/package/bcryptjs)__
* __[Moment](https://www.npmjs.com/package/moment)__



----
Para reconstruir los módulos de node ejecute el siguiente comando.
````
npm install
````
Y para hacerlo correr.
````
node index.js
````
En el caso de tener __nodemon__ instalado globalmente, ejecutar modo desarrollo .
````
npm run dev
````
<br>

---- 
### 1.- Implementando Express
En este punto se instala __Express__ para luego implementarlo.

Paso a Seguir:
* Instalar __Express__.
* Configurar __Express__ y generar una ruta de prueba.

En `index.js`
* Se realiza la importación a express _(no olvidar que aquí se trabajará con __Node.js__)_
````
const express = require('express');
````
* Creamos el servidor de express.
````
const app = express();
````
* Escuchamos un puerto en este caso sera el __4000__ y en el callback mandamos un mensaje por consola.
````
app.listen( 4000, () => {
    console.log(`Servidor en puerto ${ 4000 }`)
} );
````
* Creamos una ruta la que le mandaremos un JSON con un `ok: true`.
````
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})
````
----
### 1,5.- Variable de entorno
En este punto se creará la carpeta publica para el contenido que se mostrará, ademas de instalar __Dotenv__ para el manejo de variables de entorno.

Paso a Seguir:
* Crear 📂carpeta `public/`.
    * Se crea el archivo `index.hmtl` y `styles.css`.
* Instalar __Dotenv__.
    * Crear variable de entorno en `.env`.
* En el archivo principal `index.js` se implementará el contenido que esta en `public/` y importar variable de entorno. 

En `public/index.hml`
* Se crea la estructura HTML con el snappet `!`, luego importamos el archivo CSS.
````
<link rel="stylesheet" href="./styles.css">
````
* Agregamos algo en el cuerpo del HTML para mostrar.
````
<body>
    <h1>Bloqueado</h1>
</body>
````
En `public/styles.css`
* Le damos un estilo basico.
````
html, body {
    background-color: #020205;
    color: rgba(236, 225, 225, 0.876)
}
````
En `.env`
* Una vez instalado __Dotenv__ generamos el archivo que manipualara las variables de entorno, en este caso implementamos el puerto.
````
PORT=4000
````
En `index.js`
* Se importa `Dotenv` en el archivo principal.
* Se crea una constante que recibirá la variable de entorno creada.
````
require('dotenv').config();

const port = process.env.PORT;
````
* Implementamos el directorio publico con la configuración de express usando su __middleware__.
````
app.use( express.static('public') );
````
* Remplazamos el valor en duro, para agregarle la constante que tiene la variable de entorno del puerto.
````
app.listen( port, () => {
    console.log(`Servidor en puerto ${ port }`)
} );
````
----
### 2.- Creando Ruta de Auth
En este punto la ruta de Auth tendra su propio archivo con sus endpoint que se crearan posteriormente.

Paso a Seguir:
* Crear una 📂carpeta de `routes/` donde se almacenaran todas las rutas de la aplicación comenzando con la de autenticación `auth.js`.
* Se importa la ruta nueva creada en el `index.js` para usarla en la aplicación. 

En `router/auth.js`
* Se importa express con `Router`.
````
const { Router } = require('express');
````
* Extraemos la función de Router y utilizaro en una constante.
````
const router = Router();
````
* Creamos la primera ruta con el endpoint __Get__ que enviamos el mismo `ok: true`.
````
router.get('/', (req, res) => {
    
    res.json({
        ok: true
    })
});
````
* Se exporta el `router`.
````
module.exports = router;
````
----
### 2,5.- Endpoints
Se crearán algunos endpoint adicionales en route de auth.

Pasos a Seguir:
* Crear una 📂carpeta `controllers/` y se crea el primer controlador donde se tendrá los diferentes endpoints para tener mas modular el codigo y limpio de leer.
* Se importan los diferente endpoints hacia `routes/auth.js`.

En `controllers/auth-controller.js`
* Se importa `response` para tener una ayuda de tipado.
````
const { response } = require('express');
````
* Se crea el endpoint de registrar usuario que es un POST.
````
const crearUsuario = (req, res = response) => {    
    res.json({
        ok: true,
        msg: 'Register new'
    })
}
````
* Se crea el endpoint donde se manejará el login.
````
const loginUsuario = (req, res) => {
    res.json({
        ok: true,
        msg: 'login'
    })
}
````
* Se crea el enpoint de revalidar el token.
````
const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}
````
* Se importan las funciones del controlador de auth. 
````
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,

}
````
En `routes/auth.js`
* Se importan los elementos del controlador.
````
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth-controller');
````
* Se implementan las funciones importadas del controlador en las diferentes rutas.
````
router.get('/renew', revalidarToken);

router.post('/new', crearUsuario);

router.post('/', loginUsuario);
````
----
### 3.- Recuperar información del POST
En este punto se implmeneta la configuración de __Express__ para recibir información del las peticiones POST que se hagan.

Paso a Seguir:
* Agregar configuración de expres en `index.js`
* En el controlador de auth realizamos la toma de lo que venga en el body de la petición __POST__.

En `index.js`
* Esta configuración permite realizar la lectura o la obtencion del body de una peticion POST.
````
app.use( express.json() );
````
En `controllers/auth-controller.js`
* En la función `crearUsuario` realizamos la desestructuración del contenido que será enviado por el body, en este caso mandamos el `name`, `email` y `password`.
* Podemos hacer validaciónes como en el ejemplo del `if`, en el caso que la contraseña sea menor a 5, se enviará un `status 400` con un mensaje.
* En el caso que todo salga bien se enviará como respuesta un mensaje y el contenido del body.
````
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
````
* De la misma manera lo hacemos con el POST del login, recibiendo el emial y la contraseña.
````
const loginUsuario = (req, res) => {
    const { email, password } = req.body;
    
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}
````
----
### 4.- Express Validator
En este punto se implementará __Express Validator__ para realizar algunas validaciónes en los endpoints.

Paso a Seguir:
* Instalar __[Express-Validator](https://www.npmjs.com/package/express-validator)__.
* Crear un __Middleware__ para validar los campos que son enviados por los endpoints, para esto lo importamos en `routes/auth.js`.
* Implementar en `routes/auth.js` Express Validator con `check` para controlar los endpoints.

En `middleware/validar-campos.js`
* Una vez instalado __Express Validator__ se importa con `validationResult`.
````
const { validationResult } = require('express-validator');
````
* Creamos la función `validarCampos` que recibirá por parametros request `req`, response `res` y `next`.
* Usamos `validationResult` con la request y lo asignamos a una constante.
* Realizamos una validación en el caso que haya algun error saltará un return con __status 400__ con algun error, en el caso que no haya error solo se mandará `next()` pasando al siguiente middleware o enpoint.
````
const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}
````
* Exportamos la función
````
module.exports = {
    validarCampos
}
````
En `routes/auth.js`
* Importamos 2 elementos nuevos `check` de express validator y el middleware recién creado `validarCampos`.
````
const { check }  = require('express-validator');
...
const { validarCampos } = require('../middleware/validar-campos');
````
* Realizamos algunas validaciónes con `check` en este caso para el `name`, `email` y `password` para el endpoint de register, ademas de utilizar el middleware que se creo `validarCampos` que verificará si existe algun error en alguno de los `check`.
````
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
],  crearUsuario);
````
* En este endpoint de Login, es necesario validar el `email` y `password` y usar el middleware `validarCampos`.
````
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);
````
Eliminar la validación que se tenia en `controllers/auth-controller.js` especificamente en la función `crearUsuario`.

----
### 5.- Conexión a MongoDB
Se hará la configuración la conexión hacia la base de datos, y creando las variables de entorno.

Pasos a Seguir:
* Implementar la variable de entorno que hará la conexión en `.env`.
* Creamos la configuración para hacer la conexión en `database/config.js`.
* Implementar la conexión de `database/config.js` en `index.js`.

En `.env`
* Se crea la variable de entorno `MONGODB_CNN` con el enlace de conexión que tiene el `user`, `password` y nombre de la BD.
````
PORT=4000

MONGODB_CNN=mongodb+srv://[user_name]:[password]@cluster0.mokft.mongodb.net/[db_name]
````
En `database/config.js`
* Una vez instalado __Mongoose__, se importa para la configuración.
````
const mongoose = require('mongoose');
````
* Se crea la función asíncrona que tendra la conexión a la BD, encerrandolo en un __trycatch__ por si ocurre algun error.
* Con un await esperamos la conexión a la BD, enviandole la variable de entorno por argumento, en el caso que todo este bien se disparará la impresión por consola.
* En el caso que se presente un error se mandara una impresón por pantalla del error y un mensaje. 
````
const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la BD')
    }
}
````
* Se importa la función de conexión a la BD.
````
module.exports = {
    dbConnection
}
````
En `index.js`
* Se importa la función que hará la conexión a la BD. 
````
const { dbConnection } = require('./database/config');
````
* Se implementa la función que hará la conexión a la BD.
````
dbConnection();
````
----
### 6.- Crear Usuario en BD
En este punto se creará el modelo encargado de organizar de como accederá los datos en la base de datos para realizar el guardado en ella.

Pasos a Seguir:
* Se crea el modelo en `models/Usuario.js`.
* Se imprta el modelo de usuario en `controllers/auth-controller.js` donde se hará el guardado en la bd.

En `models/Usuario.js`
* Se importa elementos de __Mongoose__, `Schema` y `model`.
````
const { Schema, model } = require('mongoose');
````
* Se crea el `Schema` y cada esquema se asigna a una colección, esto define la forma del documento dentro de la colección, en este caso tendra `name`, `email` y `password`.
````
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
````
* Se exporta el modelo, le asignamos un nombre `Usuario` para su importación.
````
module.exports = model( 'Usuario', UsuarioSchema );
````
En `controllers/auth-controller.js`
* Se importa el modelo de usuario.
````
const Usuario = require('../models/Usuario');
````
* La función `crearUsuario` la transformamos en asíncrona.
* Encerramos el contenido en un __TryCatch__ en el caso que ocurra un error.
* Realizamos la creación de un nuevo usuario incovando el `new Usuario()` y pasandole el contenido que venga en el `req.body` para luego guardarlo en bd con `.save()`.
* En el catch controlamos el error que se pueda presentar imprimiendolo por consola y mandando una respuesta con un __status 500__.
````
 try {
        const usuario = new Usuario( req.body );
    
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            msg: 'Register new',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar con el Administrador'
        });
    }
````
----
### 6,5.- Validaciones de Usuario
Se agregará una validación antes de almacenar el base de datos.

Paso a Seguir:
* Crear una condicón para verificar si el correo ya esta registrado en `controllers/auth-controller.js`.

En `controllers/auth-controller.js`
* En la función `crearUsuario` en el `req.body` lo desestructuramos para usar el email, para luego hacer la validación.
* Utilizamos algo propio de __Mongoose__ el `.findOne()`, que permitirá hacer una comparación, si esque el dato que es enviado ya existe en la base de datos de MongoDB.
* En el caso de que exista algo en BD con el email del `req.body`, la variable `usuario` vendrá con el resultado, en ese caos se cumnple la condición y enviará un __status 400__, de que ya esta registrado el email.
* En el caso que no haya ningun error se guardará en Base de Datos normalmente.
````
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
        ...
    }
}
````
----
### 7.- Encriptar la contraseña
En este punto se instalará __Bcrypt.js__ para encriptar las contraseñas.

Pasos a Seguir: 
* Se instalá __[Bcryptjs](https://www.npmjs.com/package/bcryptjs)__.
* Se implementa la encriptación en `controllers/auth-controller.js`.

En `controllers/auth-controller.js`
* Se importa __Bcryptjs__.
````
const bcryptjs = require('bcryptjs');
````
* Con el `.genSaltSync()` se realizan por defecto 10 encriptaciones de una manera asíncrona. _(Al menos que le asignes algun numero de encriptación)_
* Se le pasa el `password` del `req.body` con el numero de encriptación `salt` al `.hastSync`, de esta manera la contraseña que se pase quedará encriptada y protegida para luego ser almacenada en la base de datos. 
````
const salt = bcryptjs.genSaltSync();
usuario.password = bcryptjs.hashSync( password, salt );
````
----
### 7,5.- Login de Usuario
En este punto se hará la comparación entre la contraseña encriptada y con la que viene en el body.

Pasos a Seguir: 
* Creamos la comparación entre contraseñas en `controllers/auth-controller.js` específicamente en `loginUsuario`.

En `controllers/auth-controller.js`
* En la función `loginUsuario` se agrega un __TryCatch__, por si hay un error.
* Realizamos la busqueda en la BD del email que es enviado, en el caso que no exista se mandara un __status 400__ diciendo no que existe.
* Luego se hace la comparación entre contraseñas, de la que viene y de la que esta en BD con `.compareSync()`, en el caso que sea un `false` se mandará un error con __status 400__.
* En el caso que pase las dos validaciones se podrá logear el usuario, enviadole un __status 200__ que todo esta bien.
* Agregamos al ultimo un catch, donde enviará un error con __status 500__.
````
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

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Email / Password no son validos - password'
            });
        }

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar con el Administrador'
        });
    }
}
````
----
### 8.- Generar JWT
En este punto se intalara JWT para luego generar tokens, lo que permitirá el manejo del estado de la sesión del usuario.

Pasos a Seguir:
* Instalar __[Json Web Token](https://www.npmjs.com/package/jsonwebtoken)__.
* Creamos una nueva variable de entorno para la palabra secreta del Token en `.env`.
* Crear un helper que manejará la generación de Tokens.
* Implementar en el controlador la generación de Token cuando se haga login o register.

En `.env`
* En la variable `JWT_KEY` guardamos la palabra secreta que servirá como firma en el JWT.
````
JWT_KEY=[Palabra Secreta]
````
En `helpers/jwt.js`
* Una vez instalado __JWT__ se importa para realizar la generación de Token.
````
const jwt = require('jsonwebtoken');
````
* Se crea la función `generarJWT` se recibe por parametro el `uid` y `name` _(Lo que necesitemos guardar en el JWT)_.
* Es necesario utilizar promesa para JWT, el cual recibira por el payload el `uid` y `name`.
* Con `jwt.sign()` creamos el Token, pasandole el contenido que tendra en este caso el payload, y le pasamos la palabra clave, ademas de pasarle la duración del token.
* Con el collback verificamos si existe algun error, en el caso que exista se mandará un mensaje y se imprimirá por consola el error.
* En el caso que todo salga bien se generará el token.
````
const generarJWT = ( uid, name ) => {
    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '2h'
        }, (err, token )=> {
            if ( err ){
                console.log(err);
                reject('No se pudo generar el Token');
            }else {
                resolve( token );
            }
        })
    })
}
````
En `controllers/auth-controller.js`
* Se importa la función que genera Token.
````
const { generarJWT } = require('../helpers/jwt');
````
* Tanto en la función `crearUsuario` como `loginUsuario` se hara la generación de Token, pasandole por parametros el `id` y el `name`. 
````
const token = await generarJWT( usuario.id, usuario.name );
````
* Tambien una vez generado el token se mandará el token como respuesta, en el caso que todo salga bien.
````
res.status(200).json({
    ok: true,
    uid: usuario.id,
    name: usuario.name,
    token
})
````
----
### 9.- Revalidar JWT
Se realizará la revalidación del Token.

Paso a Seguir:
* Se crea el middleware para validar los Token.
* Luego se importará en las rutas de `revalidarToken`.
* Se modifica la función `revalidarToken` para generar otro token.

En `middleware/validar-jwt.js`
* Se importan 2 elementos el `response` para la ayuda del tipeo y jwt.
````
const { response } = require('express')
const jwt = require('jsonwebtoken');
````
* Se crea la función `validarJWT` donde se recibe por parametro el `req`, `res` y `next`.
* Extraemos a traves del header el `x-token`, en el caso que no venga se mandará un error con __status 401__.
* Se realiza la verificación del token con `jwt.verify()` recibiendo el token y la firma, y desestructuramos el `uid` y `name`.
* Mandamos el uid y el name por la request `req`.
* En el caso que exista algun error pasará por el `catch`.
````
const validarJWT = ( req, res = response, next ) => {
    try {
        const token = req.header('x-token');

        if ( !token ){
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }

        const { uid, name } = jwt.verify(
            token,
            process.env.JWT_KEY
        );
        req.uid = uid;
        req.name = name;
        
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no Válido'
        })
    }
}
````
En `routes/auth.js`
* Se importa la función `validarJWT`.
````
const { validarJWT } = require('../middleware/validar-jwt');
````
* Se le agrega `validarJWT` en el endpoint
````
router.get('/renew', validarJWT, revalidarToken);
````
* Se modifica `revalidarToken`, se cambia a una función asíncrona.
* Se genera un token nuevo con lo que se recibio de la request y se manda como respuesta.
````
const revalidarToken = async(req, res) => {
    const { uid, name } = req;

    const token = await generarJWT( uid, name );
    
    res.json({
        ok: true,
        token
    })
}
````
----
### 10.- CORS
Realizamos la configuración basica de CORS.

Paso a Seguir:
* Instalar __[Cors](https://www.npmjs.com/package/cors)__.
* Implementar en `index.js` la configuración de CORS.

En `index.js`
* Una vez instalado cors, se importa.
````
const cors = require('cors');
````
* Implementamos __CORS__ con un middleware de Express.
````
app.use(cors());
````
----
# MERN Backend - Eventos CRUD
En este seguno nivel del Backend se realizará los CRUD de los eventos del calendario, para luego integrarlo con el Fronend.

<img src="https://miro.medium.com/max/1400/1*2eBdh0vLZjUyCDF6x1EqvQ.png" alt="CRUD" width="320"/>

----
### 1.- CRUD Basicos
En este punto se crearan los CRUD de eventos que se utilizarán.

Paso a Seguir: 
* Crear controlador de evento en `controllers/events-controller.js`.
* En `routes/` crear archivo `routes/events.js`, donde se guardará la ruta de los eventos.
* Importar eventos en `index.js`.

En `controllers/events-controller.js`
* Se importa `response` de express para tener ayuda de tipado. 
````
const { response } = require('express');
````
* Creamos la primera función que se utilizará en los endopoints, `getEventos`, que retorna un __JSON__, lo realizamos a modo de prueba así mismo con `crearEvent`, `actualizarEvent` y `eliminarEvent`.
````
const getEventos = ( req, res = response ) => {
    return res.json({
        ok:true,
        msg: 'getEventos'
    });
}
````
* Exportamos todas las funciónes.
````
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}
````
En `routes/events.js`
* Importamos __Router__ de express, `check` de Express validator que se utilizará proximamente, las funciónes que se utilizarán en los endpoints y el middleware `validarJWT`.
````
const { Router } = require('express');
const { check }  = require('express-validator');
const { 
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento } = require('../controllers/events-controller');
const { validarJWT } = require('../middleware/validar-jwt');
````
* Utilizamos Router para asignarlo a una constante.
* Ya que usaremos en todos los endpoint la validación del JWT, lo agregamos global con `.use()`.
````
const router = Router();

router.use( validarJWT );
````
* Agregamos todos los endpoint con la ruta al `/`, ademas con PUT y DELETE recibiendo `id`. 
````
router.get('/', getEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);
````
* Exportamos `router`.
````
module.exports = router;
````
En `index.js`
* Agregamos el nuevo route con la ruta `/api/events`.
````
app.use('/api/events', require('./routes/events'));
````
----
### 2.- Modelo Evento 
Se crea el modelo de los eventos.

Pasos a Seguir:
* Se crea el modelo de Events.

En `controllers/events-controller.js`
* Se importa los elementos de __Moongose__ `Schema` y `model`.
````
const { Schema, model } = require('mongoose');
````
* Se crea el esquema de Eventos, con `title`, `notes`, `start`, `end` y `user` que tiene la relación con el documento usuario.
````
const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
````
* Exportamos el modelo, asignadole el nombre `Evento`.
````
module.exports = model( 'Evento', EventoSchema );
````
----
### 3.- Validar Campos
Se agregaran algunas validaciones en los eventos.

Paso a Seguir:
* Instalamos __[Moment](https://www.npmjs.com/package/moment)__.
* Se crea un custom validator con ayuda de Express Validator para validar la fechas.
* Agregamos validaciónes en la ruta de los eventos.

En `helpers/isDate.js`
* Una vez instalado moment se importa.
````
const moment = require('moment');
````
* Se crea la función recibiendo por parametro `value`.
* Realizamos una validación de que si viene el `value`, en el caso que no se retornará un `false`.
* Le asignamos el `value` a __moment__ y lo asignamos a una constante.
* Realizamos otra validación, usando un metodo de __moment__ `isValid()`, en el caso que fecha sea valido, se retornará un `true` en el caso que no se retornará un `false`.
````
const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }
    const fecha = moment( value )
    if ( fecha.isValid() ){
        return true;
    } else {
        return false;
    }
}

````
* Importamos nuestra función que hará la validación.
````
module.exports = {
    isDate
}
````
En `routes/events.js`
* Se importá el custom validator y el validar campos.
````
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middleware/validar-campos');
````
* Agregamos algunas validaciónes del titulo que no tiene que venir vacío y las fechas de `start` y `end`, en todas las validaciónes agregamos el `validarCampos` ya que este hará que se detenga el proceso y salten los errores.
````
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
], crearEvento);
````
----
### 4.- Guardar Evento en BD
En este punto se guardará los datos que son enviados por Postman, datos del evento.

Pasos a Seguir: 
* Se adaptará el modelo de evento para eliminar `__v` de MongoDB.
* Se modifica la función del metodo POST, para guardar los eventos en BD que son recibidos.

En `models/Evento.js`
* Se utiliza `.method('toJSON')` para cuando se llame el JSON los valores del metodo sean mostado al gusto de nosotros.
* En este caso se desestructura algunos elementos de `this.toObject()` que son `__v`, `_id` y todo lo demas que viene estará en `object` usando el operador spread de esparcimiento.
* Le quitamos el guion bajo a la id y retornamos el `object`.
````
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
````
En `controllers/events-controller.js`
* Importamos el modelo de evento.
````
const Evento = require('../models/Evento');
````
* La fucnión `crearEvento` le agregamos el `async`.
* Con lo que viene en `req.body` se lo asingamos al modelo de evento.
* Encerramos el contenido de la función en un TryCatch.
* el `uid` que es mandado por el middleware `validarJWT` se lo asingamos a la constante `evento.user`.
* Almacenamos en BD el contenido de `evento` y luego lo mandamos como respuesta.
* En el catch controlamos el error, imprimiendolo por consola y enviando un __status 500__.
````
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
````
----
### 4,5.- Obtener Listado de Eventos
En este punto se implmentará el GET para obtener un listado de los eventos.

Pasos a Seguir:
* Implementar obtención de eventos.

En `controllers/events-controller.js`
* Se implementa el asíncronismo en la función `getEventos`.
* Se implementa `.find()` para obtener los eventos, adicionalmente se implementa `.populate()` para mostrar el `name` el usuario que creeo el evento.
````
const getEventos = async( req, res = response ) => {
    const eventos = await Evento.find()
                                .populate('user', 'name');

    return res.json({
        ok:true,
        eventos
    });
}
````
----
### 5.- Actualizar Evento
En este punto se implementará la funciónalidad de actualizar un evento.

Paso a Seguir:
* Adaptar la función `actualizarEvento` de `controllers/events-controller.js`.

En `controllers/events-controller.js`
* Se implmenta el `async` en la función `actualizarEvento`.
* Extraemos el id de los parametros con `req.params.id` y lo almacenamos en una constante.
* Extraemos el `uid` que es mandado por la validación global `validarJWT`.
* Encerramos todo en un TryCatch para el manejo de errores.
````
const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        ...
    } catch {
        ...
    }
}
````
* Realizamos una busqueda en la BD, del id que es mandado por los parametros, en el caso de encontrarlo se almacenará en la constante.
* Realizamos la primera condición que si no se ecuentra ningun evento con el id que es mandado, mandará un error con un __status 404__.
````
const evento = await Evento.findById( eventoId );

if ( !evento ) {
    return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
    })
}
````
* Se realiza la segunda condición, en el caso que otro usuario con otro id intente editar el evento no tendra acceso, y se enviará un error con un __status 401__.
````
if ( evento.user.toString() !== uid ) {
    return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
    })
}
````
* En el caso de pasar todas las condiciones, se creará un nuevo objeto que tendra todo el contenido que es enviado por el `req.body` y el user con el `uid` del token.
* Se realiza la acutalización con `.findByIdAndUpdate()` enviadole el id de los parametros, el objeto con el contenido a cambiar y con `{ new: true }` para que mande el contenido actualizado en el resultado de la petición.
````
 const nuevoEvento = {
    ...req.body,
    user: uid
}
const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

return res.json({
    ok:true,
    evento: eventoActualizado
});
````
----
### 5,5.- Eliminar Eventos
En este punto se realizará la eliminación de los eventos, usando un formato muy similar al de actualizar que tambien recibe la id.

Paso a Seguir:
* Adaptar función `eliminarEvento` del controlador de eventos.

En `controllers/events-controller.js`
* Se implmenta el `async` en la función `eliminarEvento`.
* Extraemos el id de los parametros con `req.params.id` y lo almacenamos en una constante.
* Extraemos el `uid` que es mandado por la validación global `validarJWT`.
* Encerramos todo en un TryCatch para el manejo de errores.
````
const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        ...
    } catch {
        ...
    }
}
````
* Realizamos una busqueda en la BD, del id que es mandado por los parametros, en el caso de encontrarlo se almacenará en la constante.
* Realizamos la primera condición que si no se ecuentra ningun evento con el id que es mandado, mandará un error con un __status 404__.
````
const evento = await Evento.findById( eventoId );

if ( !evento ) {
    return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
    })
}
````
* Se realiza la segunda condición, en el caso que otro usuario con otro id intente eliminar el evento no tendra acceso, y se enviará un error con un __status 401__.
````
if ( evento.user.toString() !== uid ) {
    return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
    })
}
````
* Se envía el id a `.findByIdAndDelete()` para eliminar el evento y se retorna un JSON con un ok.
````
const eventoActualizado = await Evento.findByIdAndDelete(eventoId);

return res.json({
    ok:true,
    Eliminado: eventoActualizado
});
````
* El catch controlará el error, imprimiendolo por consola y enviado un __status 500__.
````
catch (error) {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Hable con el Administrador'
    });
}
````
----