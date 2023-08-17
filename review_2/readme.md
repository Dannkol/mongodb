
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