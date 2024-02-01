



# DEV 
1. Clonar el .env.template y crear el .env
2. Ejecutar el comando ```docker compose up -d```
3. Crear en la carpeta src, crear carpetas: /data/postgres/index.ts
4. En el index.ts agregar el siguiente código:
```
  import { PrismaClient } from "@prisma/client";
  export const prisma = new PrismaClient();
```