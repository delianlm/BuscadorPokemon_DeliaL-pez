## Inicializar correctamente el boiler con vite
Para empezar tenemos que crear un archivo en la carpeta raíz llamado `.env` <br>
En este archivo configuramos todo lo necesario para el despliegue de la aplicación. 
```
GIT_USER=<tu-nombre-en-github>
GIT_REPO=<tu-repo>
```

## Empezar a trabajar con viteJS
### Insalación de dependencias
Para ello tenemos que lanzar el comando `yarn` para que nos instale las dependencias del proyecto, de este modo aparecerá la carpeta `node_modules`. 
### Servidor de desarrollo
Una vez tengamos las dependencias, en consola lanzamos el comando `yarn dev` y ya se lanza el servidor, con live-reload y con todo lo necesario
### Parar el servidor
Si queremos parar el servidor, con foco en la consola, hacemos `Ctrl+D`, y vemos que el servidor para y que tenemos el prompt de consola de nuevo disponible.
Esto lo hacemos para instalar nuevas dependencias, y luego volvemos a lanzar el servidor.
### Publicar cambios en Git
Para ello vamos a la pestaña de git de vscode, seleccionamos los archivos a anotar, y subimos los cambios a la rama donde estemos trabajando. 
### Publicar en GitHub Pages
Para ello tenemos un comando preparado que es `yarn deploy`, y se encarga de subir todo lo necesario a github para que funcione.
### Limpiar la carpeta para almacenar
Si queremos almacenar la carpeta en nuestro disco duro, podemos lanzar `yarn clean`, que quita la carpeta `node_modules`, y algunos archivos más que se crean durante el desarrollo.

