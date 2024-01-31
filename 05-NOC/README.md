# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript.

# dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
```
  PORT=

  MAILER_SERVICE=gmail
  MAILER_EMAIL=@gmail.com
  MAILER_SECRET_KEY=yjnwvoiovcgzklhi

  PROD=

  MONGO_URL=mongodb://cjavatx:123456@localhost:27017
  MONGO_DB_NAME=NOC
  MONGO_USER=cjavatx
  MONGO_PASS=123456

  POSTGRES_URL="postgresql://postgres:123456@localhost:5433/NOC"
  POSTGRES_DB=NOC
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=123456
```

3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
  ```
  docker compose up -d
  ```
5. Ejecutar el comando ```npm run dev```