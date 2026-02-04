<!-- LOGO DE NESTJS ... TAMBIEN PODEMOS CARGAR  NUESTROS LOGOS -->

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<!-- # PARA ESCRIBIR UN TITULO  -->

# EJECUTAR EN DESAROLLO

1. CLONAR EL REPOSITORIO
2. EJECUTAR
   <!-- `PARA MOSTRAR LINEAS DE CODIGO`   -->

   `npm install`

3. TENER NEST CLI INSTALADO

   `npm install  -g @nestjs@cli`

4. levantar la base de datos

   `docker-compose up -d`

5. ejecutar el proyecto

   `npm run start:dev`

6. Configurar las variables de entorno CLONAR EL ARCHIVOP **.ENV.TEMPLATE** Y RENOMBRAR LA COPIA A **.env**

7. llenar las variables de entorno en el archivo **.env** con sus keys correspondientes

8. ejecutar la aplicacion con `npm run start:dev`

9. reconstruir la DB con la semilla o seed (solo ejkecutar en desarrollo o si no se ha ejecutado antes)
   `http://localhost:3000/api/v2/seed`

### PRODUCTION BUILD DOCKER

1. CREAR EL ARCHIVO **.env** Y RENOMBRAR EL ARCHIVO **.env.template** A **.env**
2. LLENAR LOS VALORES DE LAS VARIABLES DE ENTORNO EN EL ARCHIVO
3. CREAR LA NUEVA IMAGEN
   `docker-compose -f docker-compose.prod.yml --env-flie .env.prod up -- build `
4. levantar la aplicacion y db
   `docker-compose -f docker-compose.prod.yml --env-flie .env.prod up -d`

## stack usado

- mongoDB
- NestJS
- Typescript
- NodeJS
- Docker
- Docker Compose
- Postman
- mongoose `npm i --save @nestjs/mongoose mongoose`
- class validator y class transformer `npm i  class-validator class-transformer`
  -joi `npm i --save joi`
- nest config `npm i @nestjs/config`

### api usada en este caso pokeapi

- https://pokeapi.co/

### PARA TENER EN CUENTA

- creamos el proyecto con el comando nest new nombre del proyecto
- instalamos nest cli con el comando `npm install -g @nestjs/cli`
- instalamos mongoose con el comando `npm install --save @nestjs/mongoose mongoose`
- instalamos class-validator y class-transformer con el comando `npm install --save class-validator class-transformer`
- INSTALAR NESTCONFIG PARA USAR LAS VARIABLES DE ENTORNO `npm i @nestjs/config`
- instalamos postman para hacer pruebas con la api
- instalamos docker para levantar la base de datos
- instalamos docker-compose para levantar la base de datos
- creamos los modulos
- creamos los modelos de la db o entities
- creamos los dtos
- creamos los controladores
- creamos los servicios
- creamos los pipes
- creamos las rutas
- creamos las rutas de autenticacion de ser necesarias
-
