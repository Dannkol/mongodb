import { mongoConn, getDB } from "../config/mongodb.js";

import { ObjectId } from "mongodb";

const GetAllActivo = async () => {
  const client = await mongoConn();

  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
      {
        $match: {
          estado: { $nin: ["Disponible"] },
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
          id_alquiler: { $toString: "$_id" },
          estado: 1,
          fechas: {
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
          id_automovil: { $toString: "$automovil._id" },
          marca: "$automovil.marca",
          modelo: "$automovil.modelo",
          cliente_nombre: {
            $concat: ["$cliente.nombre", " ", "$cliente.apellido"],
          },
          id_cliente: { $toString: "$cliente._id" },
        },
      },
      {
        $group: {
          _id: "$id_cliente",
          alquileres: {
            $push: {
              id_alquiler: "$id_alquiler",
              id_automovil: "$id_automovil",
              fechas: "$fechas",
              marca: "$marca",
              modelo: "$modelo",
              estado: "$estado",
            },
          },
          cliente_nombre: { $first: "$cliente_nombre" },
        },
      },
      {
        $project: {
          _id: 0,
          id_cliente: "$_id",
          cliente_nombre: 1,
          alquileres: 1,
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

const GetId = async (id_alquilers) => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");

    const query = [
      {
        $match: {
          _id: new ObjectId(id_alquilers),
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
          id_alquiler: { $toString: "$_id" },
          estado: 1,
          fechas: {
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
          id_automovil: { $toString: "$automovil._id" },
          marca: "$automovil.marca",
          modelo: "$automovil.modelo",
          cliente_nombre: {
            $concat: ["$cliente.nombre", " ", "$cliente.apellido"],
          },
          id_cliente: { $toString: "$cliente._id" },
        },
      },
      {
        $group: {
          _id: "$id_cliente",
          alquileres: {
            $push: {
              id_alquiler: "$id_alquiler",
              id_automovil: "$id_automovil",
              fechas: "$fechas",
              marca: "$marca",
              modelo: "$modelo",
              estado: "$estado",
            },
          },
          cliente_nombre: { $first: "$cliente_nombre" },
        },
      },
      {
        $project: {
          _id: 0,
          id_cliente: "$_id",
          cliente_nombre: 1,
          alquileres: 1,
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

const pay = async (id_alquiler) => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    return await collection.findOne(
      { _id: { $eq: new ObjectId(id_alquiler) } },
      {
        projection: {
          _id: 0,
          automovil_id: { $toString: "$id_automovil" },
          costo_total: 1,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const GetAlquilerFecha = async (fecha) => {
  const client = await mongoConn();
  try {
    const fecha_inicio = new Date(fecha);
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
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
    ]
    return await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const GetCantidad = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
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
    ];

    return await collection.aggregate(query).toArray();

  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
}

export { GetAllActivo, GetId, pay , GetAlquilerFecha , GetCantidad };
