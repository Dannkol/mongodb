# Migracion de SQL a mongodb

Aunque mongodb se diga que no es relacional, la verdad es que la misma se puede usar como relacional como ya lo hicimos previamente, pero en este caso migraremos toda una base de datos de mysql a mongodb, para esto usaremos phpmyadmin, mongodb compass y [mongodb command line tools](https://www.mongodb.com/docs/database-tools/)

## Pasos a seguir en phpmyadmin

Una vez tengamos phpmyadmin y la base de datos que queremos migrara.

1. Seleciona la tabla
2. Da click en exportar
3. Exporta como csv

![texto_alternativo](./doc/img/expor_csv.png)


con los archivos csv o json vamos a compass o atlas

## Pasos en atlas o compas 

En este momento vamos a crear una coleccion nueva e insertar los datos de la tabla que exportamos a csv o json

1. Crea una nueva base de datos o selecciona una exsistente
2. Crea una nueva colleccion o selecciona una existente
4. Insertar los datos desde el csv o json

![Crear Base de datos](./doc/img/Compass_Crear_base.png)

![Insertar datos](./doc/img/Insertar_data_compass.png)

![Insertar datos opciones](./doc/img/Opciones_de_Insercion.png)

`NOTA : Cuando insertas un csv puedes especificar el tipo de dato en el campo como se muestra en la ultima imagen`

## Pasos con las mongodb command line tools

Estas son comandos que podemos usar por consola para interactuar con la base de datos, en este caso usaremos el comando mongodump, utilizado para exportar facilmetno los BSON de la base de datos, muy usado para crear copias de seguridad de nuesta base de datos

```bash
mongodump --uri "mongodb://usuario:contraseña@localhost:27017/nombre_basededatos" -o ruta/del/destino
```

* usuario: Tu nombre de usuario de MongoDB.
* contraseña: Tu contraseña de MongoDB.
* localhost: La dirección del servidor MongoDB (puede ser una dirección IP o un nombre de host).
* 27017: El puerto de MongoDB (por defecto es 27017).
* nombre_basededatos: El nombre de la base de datos que deseas respaldar.
* /ruta/del/destino: La ubicación en la que deseas guardar los archivos de respaldo. Asegúrate de que esta ruta exista y sea accesible.

`NOTA: Para atlas solo usa la url de coneccion para el parametro --uri`

Después de ejecutar el comando, se creará una carpeta en la ubicación especificada con los archivos de respaldo de la base de datos. Estos archivos pueden ser utilizados posteriormente con el comando mongorestore para restaurar la base de datos.

En este caso puedes ver los binarios de la base de datos en la carpeta `db\dump\Bodegas`

## Conclusion

Si seguiste los pasos en a este punto ya tienes una base de datos sql en mongodb, habras realizado la migracion y creacion de una copia de seguridad que podras utilizar para crear la base de datos en un futuro

# Sistema gestor de bodegas

Activadad de campuslands


## Base de datos

El script de la base de datos se encuentra en la capeta

```shell
  cd db
```
en esta capeta esta la base de datos y los datos para la misma, ejecutalos en mysql
    
## Deployment

Inicializar

```bash
  npm i
```

Ejecutar

```bash
  npm run dev
```
Compilar los ts

```bash
   npx tsc -w
```

## Creacion de la base de datos

Como realizamos una copia de seguiridad con mongodb command line tools, tenemos que desplegar esta copia de seguridad para eso ejecutamos el siguiente comando

```bash
mongorestore --uri "mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_basededatos" --drop /ruta/del/respaldo
```
* usuario: Tu nombre de usuario de MongoDB Atlas.
* contraseña: Tu contraseña de MongoDB Atlas.
* cluster.mongodb.net: La URL de conexión de tu clúster en MongoDB Atlas.
* nombre_basededatos: El nombre de la base de datos en MongoDB Atlas donde deseas restaurar los datos.
* /ruta/del/respaldo: La ruta al directorio que contiene los archivos de respaldo descomprimidos.


## API Reference

#### post authentication

```http
  POST /auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**.  |
| `password` | `string` | **Required**.  | 

Devuelve el api key

#### Get  devuelve los productos en forma descendente agrupados por bodegas ejemplo

```http
  GET /api/bodegas/inventory
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. API key   | 



#### Post para crear una nueva bodega

```http
  POST /api/bodegas/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `id_responsable` | `number`| **Required**|
| `nombre` | `string` | **Required** |
| `estado` | `numbre` | **Required** |


#### POST para crear un producto

```http
  POST /api/producto/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `nombre` | `string`| **Required**|
| `descripcion` | `string` | **Required** |
| `estado` | `numbre` | **Required** |
| `cantidad` | `numbre` | **Required** |


#### POST para crear nuevo inventario o actualiza existentes

```http
  POST /api/inventario/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `id_producto` | `numbre`| **Required**|
| `id_bodega` | `numbre` | **Required** |
| `cantidad` | `numbre` | **Required** |

#### POST para realizar el traslado de productos entre bodejas

```http
  POST /api/translado
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `cantidad` | `numbre`| **Required**|
| `producto` | `numbre` | **Required** |
| `idBodegaOrigen` | `numbre` | **Required** |
| `idBodegaDestino` | `numbre` | **Required** |

## 🛠 Tecnologias
Javascript, Nodejs, Typesvript, Mongodb


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)