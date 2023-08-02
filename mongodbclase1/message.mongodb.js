use("db_alquiler_campus");

db.createCollection("sucursal");
db.createCollection("automovil");
db.createCollection("sucursal_automovil");
db.createCollection("empleado");
db.createCollection("cliente");
db.createCollection("reserva");
db.createCollection("alquiler");
db.createCollection("registro_devolucion");
db.createCollection("registro_entrega");

db.sucursal.insertMany(
[  {
    nombre: "Zona Franca",
    direccion: "Anillo Vial",
    telefono: 322194656
  },
  {
    nombre: "CC Caracoli",
    direccion: "floridablanca",
    telefono: "+5737554892"
  }]
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
        telefono: 310648975,
        email: "nubiacasanova@gmail.com"
    },
    {
        nombre: "Marta",
        apellido: "Martinez",
        dni: 5788518885,
        direccion: "giron casa",
        telefono: 34875698956,
        email: "martatazzz77@gmail.com"
    },
    {
        nombre: "Luz",
        apellido: "Federiza",
        dni: 877487547,
        direccion: "giron cas3",
        telefono: 578758857,
        email: "Ferrluz23@gmail.com"
    }]
);

use("db_alquiler_campus");

const idCliente1 = db.cliente.findOne({ nombre: "Nubia" })._id;
const idCliente2 = db.cliente.findOne({ nombre: "Marta" })._id;
const idCliente3 = db.cliente.findOne({ nombre: "Luz" })._id;


let fecha_inicio = new Date("2023-08-05T12:30:00")
let fecha_fin = new Date("2023-08-10T12:30:00")

const tiempoAlquiler = fecha_fin - fecha_inicio;
; // Convierte el tiempo a días


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

db.alquiler.insertMany(
    [{
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        costo_total: tiempoAlquiler / (1000 * 60 * 60 * 24) * idAutomovil_Marca1.precio_diario,
        estado: "Disponible",
        id_cliente: idCliente2,
        id_automovil: idAutomovil_Marca1._id
    },
    {
        fecha_inicio: ISODate("2023-08-01T12:30:00"),
        fecha_fin: ISODate("2023-08-10T12:30:00"),
        costo_total: tiempoAlquiler / (1000 * 60 * 60 * 24) * idAutomovil_Marca2.precio_diario,
        estado: "Alquilado",
        id_cliente: idCliente3,
        id_automovil: idAutomovil_Marca2._id
    }]
);

db.empleado.insertOne(
    {
        nombre: "Pablo",
        apellido: "sanchez",
        dni: 3365841,
        direccion: "la cumbre",
        telefono: 3143040936,
        cargo: "comerciante"
    }
);

use("db_alquiler_campus");

const idEmpleado = db.empleado.findOne({ nombre: "Pablo" })._id;
const idAlquiler = db.alquiler.findOne({
  fecha_inicio: new Date("2023-08-05T12:30:00"),
  fecha_fin: new Date("2023-08-10T12:30:00"),
})._id;

db.registro_devolucion.insertOne({
  fecha_devolucion: ISODate("2023-08-10T12:30:00"),
  combustible_devuleto: 10000.0,
  kilometraje_devuelto: 45.0,
  monto_adicional: 10000.0,
  id_alquiler: idAlquiler,
  id_empleado: idEmpleado,
});

db.registro_entrega.insertOne({
  fecha_entrega: ISODate("2023-08-10T12:30:00"),
  combustible_entrado: 20000.0,
  kilometraje_entregado: 40000.0,
  id_alquiler: idAlquiler,
  id_empleado: idEmpleado,
});
