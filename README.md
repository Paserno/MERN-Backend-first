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