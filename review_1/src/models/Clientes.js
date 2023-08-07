import { mongoConn, getDB } from "../config/mongodb.js";

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
    ];

    return await collection.aggregate(query).toArray();
  } catch (error) {}
};

export { GetAll , GetReservaPendientes };
