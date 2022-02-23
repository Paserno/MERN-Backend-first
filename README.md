> __Elemento Anterior 👀:__ __[First MERN - Frontend](https://github.com/Paserno/MERN-Frontend-first)__
# First MERN - Backend
Primera app MERN ( __Mongo__ - __Express__ - React - __Node.js__) utilizando las bases aprendidas para la implementación de todos estos elementos en conjuto, este repositorio será la parte del Backend.

Elementos utilizados:
* __[Express](https://www.npmjs.com/package/express)__ - [Pagina Oficial](https://expressjs.com)
* __[Doenv](https://www.npmjs.com/package/dotenv)__
* __[Cors](https://www.npmjs.com/package/cors)__


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