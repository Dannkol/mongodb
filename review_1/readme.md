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

### Clients getall

```http
POST /api/clients
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Opcional**. |

Respuesta

```json
[
  {
    "_id": "64ca40b12a41a46b22d3ab9c",
    "nombre": "Nubia",
    "apellido": "casanova",
    "dni": 3754892,
    "direccion": "el carmen",
    "telefono": 310648975,
    "email": "nubiacasanova@gmail.com"
  },
  {
    "_id": "64ca40b12a41a46b22d3ab9d",
    "nombre": "Marta",
    "apellido": "Martinez",
    "dni": 5788518885,
    "direccion": "giron casa",
    "telefono": 34875698956,
    "email": "martatazzz77@gmail.com"
  },
  {
    "_id": "64ca40b12a41a46b22d3ab9e",
    "nombre": "Luz",
    "apellido": "Federiza",
    "dni": 877487547,
    "direccion": "giron cas3",
    "telefono": 578758857,
    "email": "Ferrluz23@gmail.com"
  }
]
```
