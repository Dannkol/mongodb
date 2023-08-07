
// 1. Mostrar todos los clientes 
// como primer parametro pasamos una query 
// en es este caso como queremos traer todos
// la query es vacia y como segundo parametro
// la proyeccion de los datos o los datos a
// traer de la coleccion. 1 paea mostras 0 para no

use("db_alquiler_campus");
db.cliente.find({},{nombre : 1 , apellido : 1, "_id" : 0, "cliente_id" : { $toString : "$_id" } , email : 1})

// 2. Obtener todos los automóviles disponibles para alquiler.
// usamos usado para procesar varios documentos
// como parametros usamos match equivalente a where
// lookup equivalenre a un join 
// unwind el campo y devuelve un documento
// project especifica los campos a traer

use("db_alquiler_campus");
db.alquiler.aggregate([
  {
    $match: {
      "estado": "Disponible"
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $project: {
      "_id": 0,
      "id_alquiler": { $toString: "$_id" },
      "estado": "$estado",
      "id_automovil": { $toString: "$automovil._id"},
      "nombre": "$automovil.nombre",
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
    }
  }
]);

// 3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.	

use("db_alquiler_campus");
db.alquiler.aggregate([
  {
    $match: {
      "estado": { "$nin" : ["Disponible"] }
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      "_id": 0,
      "id_alquiler": { $toString: "$_id" },
      "estado": 1,
      "fechas" : {
        "fecha_inicio" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_inicio"
          }
        },
        "fecha_fin" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_fin"
          }
        }
      },
      "id_automovil": { $toString: "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"}
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      alquileres: { 
        $push: { 
          "id_alquiler": "$id_alquiler", 
          "id_automovil": "$id_automovil",
          "fechas" : "$fechas",
          "marca": "$marca",
          "modelo": "$modelo", 
          "estado": "$estado" 
        } 
      },
      cliente_nombre: { $first: "$cliente_nombre" }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "alquileres": 1
    }
  }
]);

// 4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.

use("db_alquiler_campus");
db.reserva.aggregate([
  {
    $match: {
      estado: "Pendiente"
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      "_id": 0,
      "id_reserva": { $toString: "$_id" },
      "fechas" : {
        "fecha_reserva" : {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$fecha_reserva"
          }
        },
        "fecha_inicio" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_inicio"
          }
        },
        "fecha_fin" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_fin"
          }
        }
      },

      "estado": 1,
      "id_automovil": { $toString: "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"} ,
      "precio_diario" : "$automovil.precio_diario",
      "dni" : "$cliente.dni",
      "email" : "$cliente.email"
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      reserva: { 
        $push: { 
          "id_reserve": "$id_reserva", 
          "fechas": "$fechas", 
          "precio_diario" : "$precio_diario",
          "id_automovil": "$id_automovil", 
          "marca": "$marca", 
          "modelo": "$modelo", 
          "estado": "$estado" 
        } 
      },
      cliente_nombre: { $first: "$cliente_nombre" },
      dni: { $first: "$dni" },
      email: { $first: "$email" }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "dni": 1,
      "email": 1,
      "reserva": 1
    }
  }
]);


// 5. Obtener los detalles del alquiler con el ID_Alquilerespecífico.

const id_alquilers = "64ca40b22a41a46b22d3aba0"

use("db_alquiler_campus");
db.alquiler.aggregate([
  {
    $match: {
      "_id": ObjectId(id_alquilers)
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      "_id": 0,
      "id_alquiler": { $toString: "$_id" },
      "estado": 1,
      "fechas" : {
        "fecha_inicio" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_inicio"
          }
        },
        "fecha_fin" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_fin"
          }
        }
      },
      "id_automovil": { $toString: "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"}
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      alquileres: { 
        $push: { 
          "id_alquiler": "$id_alquiler", 
          "id_automovil": "$id_automovil", 
          "fechas" : "$fechas",
          "marca": "$marca", 
          "modelo": "$modelo", 
          "estado": "$estado" 
        } 
      },
      cliente_nombre: { $first: "$cliente_nombre" }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "alquileres": 1
    }
  }
]);

// 6. Listar los empleados con el cargo de "Vendedor".

use("db_alquiler_campus");

db.empleado.find({ cargo : {$eq : "Vendedor"} },{
  _id: 0,
  "id_vendedor": "$_id",
  "nombre_completo": {
    $concat : ["$nombre", " " ,"$apellido"]
  },
  cargo: 1,
  direccion: 1,
  telefono : 1,
  dni : 1
});

// 7. Mostrar la cantidad total de automóviles disponibles en cada sucursal.

use("db_alquiler_campus");

db.sucursal_automovil.aggregate([
  {
    $group: {
      _id: "$id_sucursal",
      automovil: {
        $push: "$$ROOT"
      }
    }
  },
  {
    $addFields: {
      cantidad_total: {
        $sum : "$automovil.cantidad_disponible"
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_sucursal": { $toString : "$_id" },
      "cantidad_total": 1
    }
  }
]);


// 8. Obtener el costo total de un alquiler específico.

id_alquilers = "64ca40b22a41a46b22d3aba0";

use("db_alquiler_campus");

db.alquiler.findOne({ _id : { $eq : ObjectId(id_alquilers) } }, { 
  _id : 0 , 
  "automovil_id": { $toString : "$id_automovil"}, 
  "costo_total" : 1
});

// 9. Listar los clientes con el DNI específico.

cliente_dni = 3754892;

use("db_alquiler_campus");
db.cliente.find({ dni : { $eq : cliente_dni } },{nombre : 1 , apellido : 1, "_id" : 0, "cliente_id" : { $toString : "$_id" } , email : 1})

// 10. Mostrar todos los automóviles con una capacidad mayor a 5 personas.

use("db_alquiler_campus");

db.automovil.find({ capacidad : { $gt : 5 } }, 
  {
    _id: 0,
    "id_automovil": { $toString : "$_id" },
    "marca": "$marca",
    "modelo": "$modelo",
    "capacidad": 1
  }
)

// 11. Obtener los detalles del alquiler que tiene fecha de inicio en espesifica.

fecha_inicio = new Date("2023-08-05");

use("db_alquiler_campus");
db.alquiler.aggregate([
  {
    $match: {
      "fecha_inicio": {
        $gte: fecha_inicio,
        $lt: new Date(fecha_inicio.getTime() + 24 * 60 * 60 * 1000)
      }
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      "_id": 0,
      "id_alquiler": { $toString: "$_id" },
      "estado": 1,
      "fechas" : {
        "fecha_inicio" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_inicio"
          }
        },
        "fecha_fin" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_fin"
          }
        }
      },
      "id_automovil": { $toString: "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"}
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      alquileres: { 
        $push: { 
          "id_alquiler": "$id_alquiler", 
          "id_automovil": "$id_automovil", 
          "fechas" : "$fechas",
          "marca": "$marca", 
          "modelo": "$modelo", 
          "estado": "$estado" 
        } 
      },
      cliente_nombre: { $first: "$cliente_nombre" }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "alquileres": 1
    }
  }
]);

// 12. Listar las reservas pendientes realizadas por un cliente específico

id_clientes = "64c98bdf448cbd25fbcb338da";

use("db_alquiler_campus");
db.reserva.aggregate([
  {
    $match: {
      "id_cliente": ObjectId(id_clientes)
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      "_id": 0,
      "id_reserva": { $toString: "$_id" },
      "fechas" : {
        "fecha_reserva" : {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$fecha_reserva"
          }
        },
        "fecha_inicio" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_inicio"
          }
        },
        "fecha_fin" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_fin"
          }
        }
      },

      "estado": 1,
      "id_automovil": { $toString: "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"} ,
      "precio_diario" : "$automovil.precio_diario",
      "dni" : "$cliente.dni",
      "email" : "$cliente.email"
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      reserva: { 
        $push: { 
          "id_reserve": "$id_reserva", 
          "fechas": "$fechas", 
          "precio_diario" : "$precio_diario",
          "id_automovil": "$id_automovil", 
          "marca": "$marca", 
          "modelo": "$modelo", 
          "estado": "$estado" 
        } 
      },
      cliente_nombre: { $first: "$cliente_nombre" },
      dni: { $first: "$dni" },
      email: { $first: "$email" }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "dni": 1,
      "email": 1,
      "reserva": 1
    }
  }
]);

// 13. Mostrar los empleados con cargo de "Gerente" o "Asistente"

use("db_alquiler_campus");

db.empleado.find({
  $or: [
    { cargo: "Asistente" },
    { cargo: "Gerente" }
  ]
},
{
  _id: 0,
  "id_vendedor": "$_id",
  "nombre_completo": {
    $concat: ["$nombre", " ", "$apellido"]
  },
  cargo: 1,
  direccion: 1,
  telefono: 1,
  dni: 1
});

// 14. Obtener los datos de los clientes que realizaron al menos un alquiler.

use("db_alquiler_campus");

db.alquiler.aggregate([
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      _id: 0,
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"},
      "email": "$cliente.email",
      "dni" : "$cliente.dni",
      "telefone": "$cliente.telefono",
      "direccion": "$cliente.direccion"
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      cliente_nombre: { $first: "$cliente_nombre" },
      datos : {
        $push:{
          "email" : "$email",
          "dni" : "$dni",
          "telefone" : "$telefone",
          "direccion" : "$direccion"
        }
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "datos": 1
    }
  }
]);

// 15. Listar todos los automóviles ordenados por marca y modelo.

use("db_alquiler_campus");

db.automovil.aggregate([
  {
    $sort: {
      marca: -1
    }
  },
  {
    $project: {
      _id: 0,
      "marca": "$marca",
      "modelo": "$modelo",
      "precio_diario": "$precio_diario",
      "capacidad": "$capacidad"
    }
  }
])

// 16. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección

use("db_alquiler_campus");

db.sucursal_automovil.aggregate([
  {
    $lookup : {
      from: "sucursal",
      localField: "id_sucursal",
      foreignField: "_id", 
      as: "sucursal"
    }
  },
  {
    $unwind: "$sucursal"
  },
  {
    $project: {
      _id: 0,
      "id_sucursal": "_id",
      "direccion": "$sucursal.direccion",
      "cantidad_disponible": "$cantidad_disponible"
    }
  },
  {
    $group: {
      _id: "$direccion",
      sucursal: {
        $push: {
          "cantidad_disponible": "$cantidad_disponible"
        }
      },
      direccion: { $first : "$direccion" }
    }
  },
  {
    $project: {
      "_id": 0,
      "cantidad_total": {
        $sum : "$sucursal.cantidad_disponible"
      },
      "direccion": 1
    }
  }
]);

// 17. Obtener la cantidad total de alquileres registrados en la base de datos.

use("db_alquiler_campus");

db.alquiler.aggregate([
  {
    $group: {
      _id: null,
      total_alquiler: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      total_alquiler: 1
    }
  }
]);

// 18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.

use("db_alquiler_campus");

db.alquiler.aggregate([
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id",
      as: "automovil"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $match: {
      "automovil.capacidad": 5,
      "estado": "Disponible"
    }
  },
  {
    $project: {
      _id: 0,
      "id_automovil": { $toString : "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "capacidad": "$automovil.capacidad"
    }
  }
]);

// 19. Obtener los datos del cliente que realizó la reserva

use("db_alquiler_campus");

db.reserva.aggregate([
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      _id: 0,
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"},
      "email": "$cliente.email",
      "dni" : "$cliente.dni",
      "telefone": "$cliente.telefono",
      "direccion": "$cliente.direccion"
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      cliente_nombre: { $first: "$cliente_nombre" },
      datos : {
        $push:{
          "email" : "$email",
          "dni" : "$dni",
          "telefone" : "$telefone",
          "direccion" : "$direccion"
        }
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "datos": 1
    }
  }
]);

// 20. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.


fecha_inicio = new Date("2023-08-05");
fecha_fin = new Date("2023-08-10");

use("db_alquiler_campus");
db.alquiler.aggregate([
  {
    $match: {
      "fecha_inicio": {
        $gte: fecha_inicio,
        $lt: new Date(fecha_fin.getTime() + 24 * 60 * 60 * 1000)
      }
    }
  },
  {
    $lookup: {
      from: "automovil",
      localField: "id_automovil",
      foreignField: "_id", 
      as: "automovil"
    }
  },
  {
    $lookup: {
      from: "cliente",
      localField: "id_cliente",
      foreignField: "_id", 
      as: "cliente"
    }
  },
  {
    $unwind: "$automovil"
  },
  {
    $unwind: "$cliente"
  },
  {
    $project: {
      "_id": 0,
      "id_alquiler": { $toString: "$_id" },
      "estado": 1,
      "fechas" : {
        "fecha_inicio" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_inicio"
          }
        },
        "fecha_fin" : {
          $dateToString : {
            format: "%Y-%m-%d",
            date: "$fecha_fin"
          }
        }
      },
      "id_automovil": { $toString: "$automovil._id"},
      "marca": "$automovil.marca",
      "modelo": "$automovil.modelo",
      "cliente_nombre": { $concat : ["$cliente.nombre", " " ,"$cliente.apellido"] },
      "id_cliente": { $toString : "$cliente._id"}
    }
  },
  {
    $group: {
      _id: "$id_cliente",
      alquileres: { 
        $push: { 
          "id_alquiler": "$id_alquiler", 
          "id_automovil": "$id_automovil", 
          "fechas" : "$fechas",
          "marca": "$marca", 
          "modelo": "$modelo", 
          "estado": "$estado" 
        } 
      },
      cliente_nombre: { $first: "$cliente_nombre" }
    }
  },
  {
    $project: {
      "_id": 0,
      "id_cliente": "$_id",
      "cliente_nombre": 1,
      "alquileres": 1
    }
  }
]);