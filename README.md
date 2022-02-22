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