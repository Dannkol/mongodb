use("db_alquiler_campus");

db.createCollection("sucursal" , {
  validator : {
    $jsonSchema : {
      bsonType : "object",
      title : "sucursal object validation",
      required : ["nombre","direccion","telefono"],
      properties : {
        nombre : {
          bsonType : "string",
          description : "Nombre de la sucursal debe ser string y es obligatorio"
        },
        direccion: {
          bsonType: "string",
          description : "Direccion de la sucursal debe ser string y es obligatorio"
        },
        telefono: {
          bsonType: "string",
          pattern: "^(\\+\\d{1,3})?\\d{7,}$",
          description : "Telefono de la sucursal debe ser string y es obligatorio"
        }
      }
    }
  }
});
db.createCollection("automovil", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "automovil object validation",
      required: ["marca", "modelo", "anio", "tipo", "capacidad", "precio_diario"],
      properties: {
        marca: {
          bsonType: "string",
          description: "Marca del automóvil debe ser string y es obligatorio"
        },
        modelo: {
          bsonType: "int",
          description: "Modelo del automóvil debe ser un número entero y es obligatorio"
        },
        anio: {
          bsonType: "int",
          description: "Año del automóvil debe ser un número entero y es obligatorio"
        },
        tipo: {
          bsonType: "string",
          description: "Tipo del automóvil debe ser string y es obligatorio"
        },
        capacidad: {
          bsonType: "int",
          description: "Capacidad del automóvil debe ser un número entero y es obligatorio"
        },
        precio_diario: {
          bsonType: "int",
          description: "Precio diario del automóvil debe ser un número entero y es obligatorio"
        }
      }
    }
  }
});
use("db_alquiler_campus")
db.createCollection("sucursal_automovil", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "sucursal_automovil object validation",
      required: ["id_sucursal", "id_automovil", "cantidad_disponible"],
      properties: {
        id_sucursal: {
          bsonType: "objectId",
          description: "ID de sucursal debe ser de tipo ObjectId y es obligatorio"
        },
        id_automovil: {
          bsonType: "objectId",
          description: "ID de automóvil debe ser de tipo ObjectId y es obligatorio"
        },
        cantidad_disponible: {
          bsonType: "int",
          description: "Cantidad disponible debe ser un número entero y es obligatorio"
        }
      }
    }
  }
});
db.createCollection("empleado", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "empleado object validation",
      required: ["nombre", "apellido", "dni", "direccion", "telefono", "cargo"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre del empleado debe ser string y es obligatorio"
        },
        apellido: {
          bsonType: "string",
          description: "Apellido del empleado debe ser string y es obligatorio"
        },
        dni: {
          bsonType: "number",
          description: "DNI del empleado debe ser un número entero y es obligatorio"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección del empleado debe ser string y es obligatorio"
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del empleado debe ser un número entero y es obligatorio",
          pattern: "^(\\+\\d{1,3})?\\d{7,}$"
        },
        cargo: {
          bsonType: "string",
          description: "Cargo del empleado debe ser string y es obligatorio"
        }
      }
    }
  }
});
db.createCollection("cliente", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "cliente object validation",
      required: ["nombre", "apellido", "dni", "direccion", "telefono", "email"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre del cliente debe ser string y es obligatorio"
        },
        apellido: {
          bsonType: "string",
          description: "Apellido del cliente debe ser string y es obligatorio"
        },
        dni: {
          bsonType: "number",
          description: "DNI del cliente debe ser un número entero y es obligatorio"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección del cliente debe ser string y es obligatorio"
        },
        telefono: {
          bsonType: "string",
          pattern: "^(\\+\\d{1,3})?\\d{7,}$",
          description: "Teléfono del cliente debe ser string y es obligatorio"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Correo electrónico del cliente debe ser string y es obligatorio"
        }
      }
    }
  }
});
db.createCollection("reserva", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "reserva object validation",
      required: ["fecha_reserva", "fecha_inicio", "fecha_fin", "estado", "id_cliente", "id_automovil"],
      properties: {
        fecha_reserva: {
          bsonType: "date",
          description: "Fecha de reserva debe ser una fecha válida y es obligatoria"
        },
        fecha_inicio: {
          bsonType: "date",
          description: "Fecha de inicio debe ser una fecha válida y es obligatoria"
        },
        fecha_fin: {
          bsonType: "date",
          description: "Fecha de fin debe ser una fecha válida y es obligatoria"
        },
        estado: {
          bsonType: "string",
          description: "Estado de la reserva debe ser string y es obligatorio"
        },
        id_cliente: {
          bsonType: "objectId",
          description: "ID del cliente debe ser un ObjectId y es obligatorio"
        },
        id_automovil: {
          bsonType: "objectId",
          description: "ID del automóvil debe ser un ObjectId y es obligatorio"
        }
      }
    }
  }
});
use("db_alquiler_campus")
db.createCollection("alquiler", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "alquiler object validation",
      required: ["fecha_inicio", "fecha_fin", "costo_total", "estado", "id_cliente", "id_automovil"],
      properties: {
        fecha_inicio: {
          bsonType: "date",
          description: "Fecha de inicio debe ser una fecha válida y es obligatoria"
        },
        fecha_fin: {
          bsonType: "date",
          description: "Fecha de fin debe ser una fecha válida y es obligatoria"
        },
        costo_total: {
          bsonType: "int",
          description: "Costo total debe ser un número de punto flotante y es obligatorio"
        },
        estado: {
          bsonType: "string",
          description: "Estado del alquiler debe ser string y es obligatorio"
        },
        id_cliente: {
          bsonType: "objectId",
          description: "ID del cliente debe ser un ObjectId y es obligatorio"
        },
        id_automovil: {
          bsonType: "objectId",
          description: "ID del automóvil debe ser un ObjectId y es obligatorio"
        }
      }
    }
  }
});
db.createCollection("registro_devolucion", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "registro_devolucion object validation",
      required: ["fecha_devolucion", "combustible_devuleto", "kilometraje_devuelto", "monto_adicional", "id_alquiler", "id_empleado"],
      properties: {
        fecha_devolucion: {
          bsonType: "date",
          description: "Fecha de devolución debe ser una fecha y es obligatoria"
        },
        combustible_devuleto: {
          bsonType: "double",
          minimum: 0,
          description: "Combustible devuelto debe ser un número positivo y es obligatorio"
        },
        kilometraje_devuelto: {
          bsonType: "double",
          minimum: 0,
          description: "Kilometraje devuelto debe ser un número positivo y es obligatorio"
        },
        monto_adicional: {
          bsonType: "double",
          minimum: 0,
          description: "Monto adicional debe ser un número positivo y es obligatorio"
        },
        id_alquiler: {
          bsonType: "objectId",
          description: "ID del alquiler debe ser un objectId y es obligatorio"
        },
        id_empleado: {
          bsonType: "objectId",
          description: "ID del empleado debe ser un objectId y es obligatorio"
        }
      }
    }
  }
});
db.createCollection("registro_entrega", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "registro_entrega object validation",
      required: ["fecha_entrega", "combustible_entrado", "kilometraje_entregado", "id_alquiler", "id_empleado"],
      properties: {
        fecha_entrega: {
          bsonType: "date",
          description: "Fecha de entrega debe ser una fecha y es obligatoria"
        },
        combustible_entrado: {
          bsonType: "double",
          minimum: 0,
          description: "Combustible entrado debe ser un número positivo y es obligatorio"
        },
        kilometraje_entregado: {
          bsonType: "double",
          minimum: 0,
          description: "Kilometraje entregado debe ser un número positivo y es obligatorio"
        },
        id_alquiler: {
          bsonType: "objectId",
          description: "ID del alquiler debe ser un objectId y es obligatorio"
        },
        id_empleado: {
          bsonType: "objectId",
          description: "ID del empleado debe ser un objectId y es obligatorio"
        }
      }
    }
  }
});

use("db_alquiler_campus");
db.sucursal.insertMany(
  [  {
      nombre: "Zona Franca",
      direccion: "Anillo Vial",
      telefono: "+57322194656"
    },
    {
      nombre: "CC Caracoli",
      direccion: "floridablanca",
      telefono: "+5785879245"
    }
  ]
);

db.automovil.insertMany(
  [{
    marca: "Renaul",
    modelo: 2023,
    anio: 2024,
    tipo: "camioneta",
    capacidad: 1600,
    precio_diario: 50000
  },
  {
    marca: "marca1",
    modelo: 2023,
    anio: 2024,
    tipo: "convertible",
    capacidad: 1600,
    precio_diario: 50000
  },
  {
    marca: "marca2",
    modelo: 2023,
    anio: 2024,
    tipo: "convertible",
    capacidad: 1600,
    precio_diario: 50000
  }]
);

use("db_alquiler_campus");

const idSucursal_Zona_Franca = db.sucursal.findOne({
  nombre: "CC Caracoli"
})._id;
const idSucursal_CC_Caracoli = db.sucursal.findOne({
  nombre: "Zona Franca"
})._id;
const idAutomovil_Reanaul = db.automovil.findOne({ marca: "Renaul" }, { _id: 1, precio_diario: 1 });
const idAutomovil_Marca1 = db.automovil.findOne({ marca: "marca1" }, { _id: 1, precio_diario: 1 });
const idAutomovil_Marca2 = db.automovil.findOne({ marca: "marca2" }, { _id: 1, precio_diario: 1 });

db.sucursal_automovil.insertMany(
[  {
    id_sucursal: idSucursal_Zona_Franca,
    id_automovil: idAutomovil_Reanaul._id,
    cantidad_disponible: 2
  },
  {
    id_sucursal: idSucursal_CC_Caracoli,
    id_automovil: idAutomovil_Marca1._id,
    cantidad_disponible: 2
  },
  {
    id_sucursal: idSucursal_Zona_Franca,
    id_automovil: idAutomovil_Marca2._id,
    cantidad_disponible: 2
  }]
);

db.cliente.insertMany(
    [{
        nombre: "Nubia",
        apellido: "casanova",
        dni: 3754892,
        direccion: "el carmen",
        telefono: "+57310648975",
        email: "nubiacasanova@gmail.com"
    },
    {
        nombre: "Marta",
        apellido: "Martinez",
        dni: 5788518885,
        direccion: "giron casa",
        telefono: "+57317665574",
        email: "martatazzz77@gmail.com"
    },
    {
        nombre: "Luz",
        apellido: "Federiza",
        dni: 877487547,
        direccion: "giron cas3",
        telefono: "+57330384975",
        email: "Ferrluz23@gmail.com"
    }]
);


use("db_alquiler_campus");

const idCliente1 = db.cliente.findOne({ nombre: "Nubia" })._id;


db.reserva.insertOne(
    {
        fecha_reserva: ISODate("2023-07-31T12:30:00"),
        fecha_inicio: ISODate("2023-08-05T12:30:00"),
        fecha_fin: ISODate("2023-08-20T12:30:00"),
        estado: "Disponible",
        id_cliente: idCliente1,
        id_automovil: idAutomovil_Reanaul._id
    }
);

use("db_alquiler_campus");

let fecha_inicio = new Date("2023-08-05T12:30:00");
let fecha_fin = new Date("2023-08-10T12:30:00");

const idCliente2 = db.cliente.findOne({ nombre: "Marta" })._id;
const idCliente3 = db.cliente.findOne({ nombre: "Luz" })._id;

const tiempoAlquiler = fecha_fin - fecha_inicio;

idAutomovil_Marca1 = db.automovil.findOne({ marca: "marca1" }, { _id: 1, precio_diario: 1 });
idAutomovil_Marca2 = db.automovil.findOne({ marca: "marca2" }, { _id: 1, precio_diario: 1 });

db.alquiler.insertMany([
  {
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin,
    costo_total: tiempoAlquiler / (1000 * 60 * 60 * 24) * idAutomovil_Marca1.precio_diario,
    estado: "Disponible",
    id_cliente: idCliente2,
    id_automovil: idAutomovil_Marca1._id
  },
  {
    fecha_inicio: new Date("2023-08-01T12:30:00"),
    fecha_fin: new Date("2023-08-10T12:30:00"),
    costo_total: (new Date("2023-08-01T12:30:00") - new Date("2023-08-10T12:30:00")) / (1000 * 60 * 60 * 24) * idAutomovil_Marca2.precio_diario,
    estado: "Alquilado",
    id_cliente: idCliente3,
    id_automovil: idAutomovil_Marca2._id
  }
]);


db.empleado.insertOne(
    {
        nombre: "Pablo",
        apellido: "sanchez",
        dni: 3365841,
        direccion: "la cumbre",
        telefono: "+57312648975",
        cargo: "comerciante"
    }
);

use("db_alquiler_campus");
db.empleado.findOne({ nombre: "Pablo" })._id;

const idEmpleado = db.empleado.findOne({ nombre: "Pablo" })._id;
const idAlquiler = db.alquiler.findOne({
  fecha_inicio: new Date("2023-08-05T12:30:00"),
  fecha_fin: new Date("2023-08-10T12:30:00"),
})._id;

db.registro_devolucion.insertOne({
  fecha_devolucion: ISODate("2023-08-10T12:30:00"),
  combustible_devuleto: 10000.023,
  kilometraje_devuelto: 45.025,
  monto_adicional: 10000.250,
  id_alquiler: idAlquiler,
  id_empleado: idEmpleado,
});

db.registro_entrega.insertOne({
  fecha_entrega: ISODate("2023-08-10T12:30:00"),
  combustible_entrado: 20000.082,
  kilometraje_entregado: 40000.077,
  id_alquiler: idAlquiler,
  id_empleado: idEmpleado,
});
