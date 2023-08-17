
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
  GET /bodegas
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. API key   | 

#### Respuesta

```json

[
  {
    "bodega": "prueba",
    "total": "89700",
    "producto": 27
  },
  {
    "bodega": "bodega2",
    "total": "87000",
    "producto": 28
  },
  {
    "bodega": "bodega7",
    "total": "55281",
    "producto": 27
  }
]

```


#### Post para crear una nueva bodega

```http
  POST /bodegas
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `id_responsable` | `number`| **Required**|
| `nombre` | `string` | **Required** |
| `estado` | `numbre` | **Required** |

#### Devuelve

```json
{
  "id": 54,
  "nombre": "daniel",
  "id_responsable": 16,
  "estado": 2,
  "created_by": null,
  "updated_by": null,
  "created_at": "2023-07-06T04:41:23.000Z",
  "updated_at": null,
  "deleted_at": null
}
```

#### POST para crear un producto

```http
  POST /productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `nombre` | `string`| **Required**|
| `descripcion` | `string` | **Required** |
| `estado` | `numbre` | **Required** |
| `cantidad` | `numbre` | **Required** |


#### Devuelve

```json
{
  "mensaje": "Producto creado",
  "producto": {
    "producto": {
      "id": 63,
      "nombre": "arroz",
      "descripcion": "Arroz Blanco",
      "estado": 1,
      "created_by": null,
      "updated_by": null,
      "created_at": null,
      "updated_at": null,
      "deleted_at": null
    },
    "inventario": {
      "id": 80,
      "id_bodega": 11,
      "id_producto": 63,
      "cantidad": 10,
      "created_by": null,
      "updated_by": null,
      "created_at": "2023-07-06T06:17:17.000Z",
      "updated_at": null,
      "deleted_at": null
    }
  }
}
```

#### POST para crear nuevo inventario

```http
  POST /inventario
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `id_producto` | `numbre`| **Required**|
| `id_bodega` | `numbre` | **Required** |
| `cantidad` | `numbre` | **Required** |


#### Devuelve si el inventario existe actualiza la cantidad y devuelve

```json
{
    "mensaje": "actualizacion de inventario",
    "inventario": [
        {
            "id": 82,
            "id_bodega": 13,
            "id_producto": 62,
            "cantidad": 54,
            "created_by": null,
            "updated_by": null,
            "created_at": "2023-07-06T07:19:58.000Z",
            "updated_at": null,
            "deleted_at": null
        }
    ]
}
```
#### Devuelve Si el inventario no existe crea uno nuevo y devuelve

```json
{
    "mensaje": "crear nuevo inventario",
    "inventario": [
        {
            "id": 83,
            "id_bodega": 12,
            "id_producto": 62,
            "cantidad": 2,
            "created_by": null,
            "updated_by": null,
            "created_at": "2023-07-06T07:26:01.000Z",
            "updated_at": null,
            "deleted_at": null
        }
    ]
}
```


#### POST para realizar el traslado de productos entre bodejas

```http
  POST /traslado
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API key |
| `cantidad` | `numbre`| **Required**|
| `producto` | `numbre` | **Required** |
| `bodega_send` | `numbre` | **Required** |
| `bodega_to` | `numbre` | **Required** |


#### Devuelve

```json

{
    "menssage": "Traslado exitoso" /* Mensaje de exito */
    "data": {
        "bodega_origen": 19,  /* bodega de origen */
        "bodega_destino": 12, /* bodega de destino */
        "cantidad": 23,  /* cantidad trasladad de una bodega a otra */
        "historial": [  /* tabla historial */
            {
                "id": 35,
                "cantidad": 23, 
                "id_bodega_origen": 19,
                "id_bodega_destino": 12,
                "id_inventario": 12, /* id del inventario relacionada con el historial */
                "created_by": null,
                "updated_by": null,
                "created_at": "2023-07-06T08:42:45.000Z",
                "updated_at": null,
                "deleted_at": null
            }
        ]
    }
}

```






## 🛠 Tecnologias
Javascript, Nodejs, Typesvript, Mysql


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)