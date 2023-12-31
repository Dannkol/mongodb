import { mongoConn, getDB } from "../config/mongodb.js";

import { ObjectId } from "mongodb";

const GetAll = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("cliente");
    return await collection.find({}).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const GetReservaPendientes = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("reserva");
    const query = [
      {
        $match: {
          estado: "Pendiente",
        },
      },
      {
        $lookup: {
          from: "automovil",
          localField: "id_automovil",
          foreignField: "_id",
          as: "automovil",
        },
      },
      {
        $lookup: {
          from: "cliente",
          localField: "id_cliente",
          foreignField: "_id",
          as: "cliente",
        },
      },
      {
        $unwind: "$automovil",
      },
      {
        $unwind: "$cliente",
      },
      {
        $project: {
          _id: 0,
          id_reserva: { $toString: "$_id" },
          fechas: {
            fecha_reserva: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$fecha_reserva",
              },
            },
            fecha_inicio: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$fecha_inicio",
              },
            },
            fecha_fin: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$fecha_fin",
              },
            },
          },

          estado: 1,
          id_automovil: { $toString: "$automovil._id" },
          marca: "$automovil.marca",
          modelo: "$automovil.modelo",
          cliente_nombre: {
            $concat: ["$cliente.nombre", " ", "$cliente.apellido"],
          },
          id_cliente: { $toString: "$cliente._id" },
          precio_diario: "$automovil.precio_diario",
          dni: "$cliente.dni",
          email: "$cliente.email",
        },
      },
      {
        $group: {
          _id: "$id_cliente",
          reserva: {
            $push: {
              id_reserve: "$id_reserva",
              fechas: "$fechas",
              precio_diario: "$precio_diario",
              id_automovil: "$id_automovil",
              marca: "$marca",
              modelo: "$modelo",
              estado: "$estado",
            },
          },
          cliente_nombre: { $first: "$cliente_nombre" },
          dni: { $first: "$dni" },
          email: { $first: "$email" },
        },
      },
      {
        $project: {
          _id: 0,
          id_cliente: "$_id",
          cliente_nombre: 1,
          dni: 1,
          email: 1,
          reserva: 1,
        },
      },
    ];

    return await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const GetDNI = async (cliente_dni) => {
  const client = await mongoConn();
  try {
    if (!isNaN(cliente_dni)) {
      const dni = parseInt(cliente_dni, 10);
      const db = getDB("db_alquiler_campus");
      const collection = db.collection("cliente");
      return await collection.findOne(
        { dni: dni },
        {
          projection: {
            nombre: 1,
            apellido: 1,
            _id: 0,
            cliente_id: "$_id",
            email: 1,
          },
        }
      );
    } else {
      res.status(404).json({
        menssage: "Dni invalido",
      });
    }
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const getClientResvas = async (id_cliente) => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("reserva");
    const query = [
      {
        $match: {
          "id_cliente": new ObjectId(id_cliente)
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
    ];
    return await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
};

const GetClientesAlquiler = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
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
    ];

    return await collection.aggregate(query).toArray();

  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
}

const GetDataClienteReserva = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
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
    ];

    return await collection.aggregate(query).toArray();

  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
}

export { GetAll, GetReservaPendientes, GetDNI, getClientResvas , GetClientesAlquiler , GetDataClienteReserva };
