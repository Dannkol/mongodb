import { mongoConn, getDB } from "../config/mongodb.js";

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

export { GetAllActivo };
