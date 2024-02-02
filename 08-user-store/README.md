# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

Cada paso de su configuración ya se ha realizado previamente en el curso, por lo que solo es necesario clonar el proyecto y comenzar a trabajar.


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo
5. Agregar ```egfjfrawowwvacwf``` a las variables de entorno en la secret_key.


# Email Validation
1. Logearme en [NGROK](https://dashboard.ngrok.com/login).
2. Descargar [NGROK](https://dashboard.ngrok.com/get-started/setup/windows).
3. Agregar el instalador de NGROK a una carpeta en C:/
4. Copiar la ruta donde está el instalador y agregarla en las variables de entorno de mi maquina. (path).
5. Escribir en la terminal el token de autorización ```ngrok config add-authtoken <MI_TOKEN>``` 
6. Ejecutar ngrok: ```ngrok http 3000``` (Porque es el puerto en el que está mi backend)
7. Cambiar la URL de la variable de entorno: ```WEBSERVICE_URL``` por el url que te da NGROK.