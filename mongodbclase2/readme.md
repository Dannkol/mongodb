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

# Glosario

1. ``find()``: Realiza una consulta para buscar documentos en una colección según los criterios especificados.

```js
db.collection("nombreColeccion").find({ campo: valor });
```

2. ``findOne()``: Devuelve un solo documento que cumpla con los criterios de búsqueda.

```js
db.collection("nombreColeccion").findOne({ campo: valor });
```

3. ``countDocuments()``: Cuenta la cantidad de documentos que coinciden con los criterios de búsqueda

```js
db.collection("nombreColeccion").countDocuments({ campo: valor });
```

4. ``aggregate()``: Realiza operaciones de agregación en documentos, como agrupar, filtrar y proyectar.

```js
db.collection("nombreColeccion").aggregate([{ operacion1 }, { operacion2 }]);
```

5. ``distinct()``: Obtiene valores únicos para un campo específico en la colección.

```js
db.collection("nombreColeccion").distinct("campo");
```

6. ``sort()``: Ordena los resultados según un campo específico y el orden (ascendente o descendente).

```js
db.collection("nombreColeccion").find({}).sort({ campo: 1 }); // Ascendente
db.collection("nombreColeccion").find({}).sort({ campo: -1 }); // Descendente
```

7. ``limit()``: Limita la cantidad de documentos devueltos por la consulta.

```js
db.collection("nombreColeccion").find({}).limit(10);
```

8. ``skip()``: Omite una cantidad específica de documentos en la consulta.

```js
db.collection("nombreColeccion").find({}).skip(10);
```

9. ``updateOne()`` /`` updateMany()``: Actualiza uno o varios documentos que coinciden con los criterios de búsqueda.

```js
db.collection("nombreColeccion").updateOne({ campo: valor }, { $set: { nuevoCampo: nuevoValor } });
db.collection("nombreColeccion").updateMany({ campo: valor }, { $set: { nuevoCampo: nuevoValor } });
```

10. ``deleteOne()`` / ``deleteMany()``: Elimina uno o varios documentos que coinciden con los criterios de búsqueda.

```js
db.collection("nombreColeccion").deleteOne({ campo: valor });
db.collection("nombreColeccion").deleteMany({ campo: valor });
```


# $lookup

``$lookup`` es un operador de agregación en MongoDB que se utiliza para realizar una "unión" entre dos colecciones diferentes. En otras palabras, te permite combinar documentos de una colección con documentos de otra colección en función de un campo común, creando así una especie de relación entre las colecciones.

## Syntax

```js
  {
    $lookup:
      {
        from: <collection to join>, 
        localField: <field from the input documents>, 
        foreignField: <field from the documents of the "from" collection>, 
        as: <output array field> 
      }
  }
```

* Parametros

  * pipeline :  permite realizar operaciones más avanzadas y flexibles al combinar documentos de colecciones diferentes.

  * from : Nombre de la colección a unir

  * localField : Nombre de la colección a unir

  * foreignField : Campo en la colección comentarios para la unión

  * as : Nombre del nuevo campo con los comentarios combinados

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)