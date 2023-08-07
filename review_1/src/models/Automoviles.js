import { mongoConn, getDB } from "../config/mongodb.js";

const GetAllDisp = async () => {
  const client = await mongoConn();

  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
      {
        $match: {
          estado: "Disponible",
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
        $unwind: "$automovil",
      },
      {
        $project: {
          _id: 0,
          id_alquiler: { $toString: "$_id" },
          estado: "$estado",
          id_automovil: { $toString: "$automovil._id" },
          nombre: "$automovil.nombre",
          marca: "$automovil.marca",
          modelo: "$automovil.modelo",
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

export { GetAllDisp };
