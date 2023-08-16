use("Bodegas")

db.inventarios.aggregate([{
  "$lookup": {
    "from": "bodegas",
    "let": {
      "id_bodega": "$id_bodega"
    },
    "pipeline": [
      {
        "$match": {
          "$expr": {
            "$eq": [
              "$id",
              "$$id_bodega"
            ]
          }
        }
      }
    ],
    "as": "t2"
  }
},{
  "$unwind": {
    "path": "$t2",
    "preserveNullAndEmptyArrays": false
  }
},{
  "$lookup": {
    "from": "productos",
    "let": {
      "id_producto": "$id_producto"
    },
    "pipeline": [
      {
        "$match": {
          "$expr": {
            "$eq": [
              "$id",
              "$$id_producto"
            ]
          }
        }
      }
    ],
    "as": "t3"
  }
},{
  "$unwind": {
    "path": "$t3",
    "preserveNullAndEmptyArrays": false
  }
},{
  "$group": {
    "_id": {
      "t2_nombre": "$t2.nombre",
      "t3_nombre": "$t3.nombre"
    },
    "total": {
      "$sum": "$cantidad"
    }
  }
},{
  "$sort": {
    "_id.total": -1
  }
},{
  "$project": {
    "bodega": "$_id.t2_nombre",
    "producto": "$_id.t3_nombre",
    "total": 1,
    "_id": 0
  }
}])