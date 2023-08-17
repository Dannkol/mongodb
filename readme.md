# MongoDB

MongoDB es una base de datos NoSQL (estructura no relacional) que se ha vuelto ampliamente popular debido a sus características flexibles, escalabilidad y facilidad de uso.

## ¿Qué son las bases de datos no relacionales?

Las bases de datos no relacionales (NoSQL) son sistemas de gestión de bases de datos que no se basan en un esquema fijo de tablas y relaciones. Se utilizan para manejar una variedad de tipos de datos y estructuras, lo que las hace adecuadas para situaciones en las que los datos son heterogéneos o cambian con frecuencia. 

Las bases de datos NoSQL son como cajones flexibles donde puedes guardar diferentes tipos de información. No te preocupas tanto por la estructura rígida de filas y columnas, sino que puedes guardar información en formas más libres, como documentos. Estos documentos son como pequeñas tarjetas, y cada una puede tener diferentes pedazos de información. Puedes poner cosas variadas en estos documentos, desde palabras hasta números, imágenes y más.

## Características

- Esquema Flexible: MongoDB no requiere un esquema rígido y predefinido. Los documentos en una colección pueden tener diferentes campos, lo que permite manejar datos heterogéneos.

- Documentos JSON-Like: Los datos se almacenan en forma de documentos BSON (JSON binario) que contienen pares clave-valor. Esto facilita la representación y manipulación de datos complejos y anidados.

- Escalabilidad: MongoDB es altamente escalable, lo que significa que puede manejar grandes volúmenes de datos y distribuirlos en múltiples servidores.

- Consultas Avanzadas: Soporta consultas sofisticadas, incluyendo operadores de comparación, lógicos y de agregación.

- Índices Eficientes: Permite la creación de índices para acelerar las consultas y mejorar el rendimiento.

- Alta Disponibilidad: Ofrece réplicas automáticas que aseguran la disponibilidad y redundancia de los datos.

- Caché Integrada: Utiliza una caché integrada en memoria para acelerar el acceso a datos frecuentemente utilizados.

- Geoespacial y Text Search: Proporciona funcionalidades para almacenar y consultar datos geoespaciales y también admite búsqueda de texto completo.

## Utilidades

Las bases de datos NoSQL son geniales para situaciones donde los datos pueden ser un poco "desordenados" o cambian muy seguido, algunos ejemplos son

* Aplicaciones Web y Móviles: MongoDB es adecuado para almacenar datos de aplicaciones web y móviles, como perfiles de usuarios, publicaciones, comentarios, etc.

* Análisis de Datos: Puede utilizarse para almacenar y analizar grandes volúmenes de datos, especialmente cuando la estructura de los datos es variable o no está predefinida.

* Sistemas de Registro y Bitácoras: Debido a su flexibilidad, es útil para almacenar registros y bitácoras de sistemas.

* Gestión de Contenido: Es apto para almacenar contenido multimedia, blogs y otros tipos de contenido, como el que vemos en las redes sociales.

* IoT (Internet of Things): MongoDB es adecuado para manejar datos generados por dispositivos IoT, como sensores y dispositivos conectados.
 
# Ejercicios

## Creacion de base de datos

En mongo no tenemos tablas si no colleciones y documentos en vez de filas y columnas

### Tabla de equivalencia en SQL

|NoSQL| SQL |
|:----:|:----:|
|Base de datos | Base de datos |
|Colecciones   | Tablas |
|Documentos | Filas(registros) |
|Campos | Columnas |

Teniendo en cuaneta esto para el primer ejercicio crearemos una base de datos basandonos en un esquema de una base SQL. 

[Ir al punto creacion de base de datos](/mongodbclase1/)

## Consultas em mongoDb

Teniendo en cuanta el punto anterior realizaremos unas consultas sobre la base de datos creada.

[Ir al punto Consultas en mongodb](/mongodbclase2/)

## Implementacion con Nodejs

Ya teniendo la base de datos y una nocion sobre las consultas en mongodb realizaremos una integracion con nodejs usando el modulo de mongodb.

[Ir al punto Integracion con nodejs](/review_1/)

## Migracion de sql, transacciones y copias de seguridad

En esta clase el proyecto implementa una migracion de la base de datos de mysql a mongodb, tambien se realizan copias de seguridad usando [mongodb command line tools](https://www.mongodb.com/docs/database-tools/) y un endpoint donde realizamos una transaccion para un historial usando la metodologia [ACID](https://www.mongodb.com/basics/acid-transactions).

[Ir al punto Integracion con nodejs](/review_2/)


## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)