# Tasks-api #

Este proyecto es una API para gestionar tareas. Permite registrar, obtener, actualizar y eliminar.
## Tecnologías y librerías que utiliza: ##
- nodeJs
- expressJs
- sequelize
- jsonWebToken

## Requisitos ##

Para ejecutar el proyecto se necesita tener instalado:
- nodeJs
- MYSql, ya sea solo el motor o un software como XAMPP o wamp server.
- sequelize cli. Para generar la base de datos junto con las tablas
- postman o cualquier cliente http para las pruevas

1. Clonar el repositorio
``` bash
 git clone https://github.com/JosePerezHuanca/tasks-api 
```
2. Instalar las dependencias necesarias
``` bash
 npm install 
```
3. Crear la base de datos. Con sequelize CLI el comando es
``` bash 
 sequelize db:create 
 ```
4. Ejecutar el proyecto
``` bash
 npm start 
 ```

## Uso ##

Cuando se ejecuta el proyecto la dirección es localhost:8080.
La API acepta solicitudes y responde en formato JSON.
Para empezar, se deve registrar un usuario en users/register.
La solicitud deve incluir 3 propiedades en el cuerpo: userName, password y paswordR.
Las respuestas posibles son 201, 400 y 500.
Luego, para autenticarse la ruta es users/login.
Las propiedades son las mismas que /register exceptuando passwordR.
Las respuestas posibles son 200, 400, 401 y 500.
Si todo sale bien, la API debería retornar un objeto como el siguiente: 
``` json
    {
  "status": 200,
  "message": "Se inició sesión",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlck5hbWUiOiJqb3NlIiwiaWF0IjoxNjc4ODIzMzE5fQ.ark8JSa-qAzuoY7bGPVvTe3vwuQmxH4k8GlQJRAuw8k"
}
```
El token es necesario para realizar las solicitudes a /tasks.
Ahora, el endpoint /tasks acepta las solicitudes con el verbo get,post,put y delete.

### Obtener tareas ###

/tasks lista todas las tareas.
respuestas: 200, 403 y 500
/tasks/:id debuelve una tarea con el id especificado. Por ejemplo: /tasks/7
respuestas: 200, 403, 404 y 500.

### Agregar una tarea ###

El cuerpo deve incluir las siguientes propiedades: title y description
respuestas: 201, 400 y 500.

### Actualizar o eliminar tarea ###

Para actualizar o borrar una tarea la ruta es /tasks/:id . Por ejemplo: /tasks/5
respuestas: 200, 400,403,404 y 500.


## Nota final ##

El proyecto se subió a render.com con fines de prueva. Cabe recalcar que puede aver un poco de retardo en las solicitudes ya sea por el host de la API o el de la base de datos  
[Link al proyecto desplegado](https://tasks-api-agws.onrender.com/)
