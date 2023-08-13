# Review

Realizar los endpoints de las consultas de la clase 2, realizar los esquemas y JWT para las autenticaciones

# Cosultas

En esta actividad se realizaran las siguientes consultas sobre la base de datos que creamos en la <a href="../mongodbclase1/readme.md"> clase anterior </a> revisala para continuar con esta

mongodb permite realizar multitud de consultas anteriormente usamos `findOne`, en esta clase usaremos consultas más avanzadas y profundizaremos un poco en sus metodos

## consultas a realizar

1. Mostrar todos los clientes registrados en la base de datos. 
   
2. Obtener todos los automóviles disponibles para alquiler.

3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.

4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.

5. Obtener los detalles del alquiler con el ID_Alquilerespecífico.

6. Listar los empleados con el cargo de "Vendedor".

7. Mostrar la cantidad total de automóviles disponibles en cada sucursal.
    
8. Obtener el costo total de un alquiler específico.
   
9. Listar los clientes con el DNI específico. 

10. Mostrar todos los automóviles con una capacidad mayor a 5 personas. 

11. Obtener los detalles del alquiler que tiene fecha de inicio especifica (2023-07-05). 

12. Listar las reservas pendientes realizadas por un cliente específico. 

13. Mostrar los empleados con cargo de "Gerente" o "Asistente". 

14. Obtener los datos de los clientes que realizaron al menos un alquiler. 

15. Listar todos los automóviles ordenados por marca y modelo. 

16. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección. 

17. Obtener la cantidad total de alquileres registrados en la base de datos. 

18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles. 

19. Obtener los datos del cliente que realizó la reserva

20. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.


## Run Locally

Clona el repositorio

```bash
  git clone https://github.com/Dannkol/mongodb.git
```

ve al directorio

```bash
  cd mongodb/review_1
```

Instala las dependencias

```bash
  npm install
```

Inicializa el servidor de desarrollo

```bash
  npm run dev
```
# Crear Base de datos

crea la base de datos con el archivo db.mongodb.js en la ruta db/db.mongodb.js

#### NOTA: NO OLVIDES CAMBIAR LAS VARIABLES DE ENTORNO A TUS NECESIDADES


# API Reference

**NOTA** : `RECUERDA USAR EN EL HEADER DE LA PETICION EL PARAMETRO Authorization CON LA API_KEY O TOKEN PARA LOS ENDPOINTS QUE SEA OBLIGATORIO`

### Authentication

Para tener acceso a los endpoints primero tenemos que generar un token de acuerdo al enpoint que queremos usar, si queremos usar un endpoint de alquiler entoncres tenemos que crear el token para ese enpoint que posteriormente usarameos en el parametro Authorization del header

```http
GET /api/auth/:colleccion
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:colleccion` | `string` | **Required**. El nombre de la collecion por ejemplo Alquiere o Automovil |



### Clients

```http
GET /api/clients
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/clients/reserva/info
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/clients/reservas/pendientes
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |



```http
GET /api/clients/reservas/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/clients/alquiler
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/clients/:dni
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |




### Automovil

```http
GET /api/auto/disponible
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/auto/sursales
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/auto/sursales/capacidad
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |



```http
GET /api/auto/sursales/capacidad/disponible
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/auto/capacidad/5
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET /api/auto/marca
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |

### Alquiler

```http
GET api/alquiler/cantidad
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET api/alquiler/activo
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET api/alquiler/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |



```http
GET api/alquiler/pay/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET api/alquiler/fecha_inicio/:date
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET api/alquiler/fecha_inicio/:inicio/fecha_final/:final
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


### Empleado

```http
GET api/empleado/vendedores
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |


```http
GET api/empleado/gerente/asistente
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |

## 🛠 Tecnologias
Node, Express, Mongodb

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)

