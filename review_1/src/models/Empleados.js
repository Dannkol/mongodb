import { mongoConn, getDB } from "../config/mongodb.js";

const GetVendedor = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("empleado");
    return await collection
      .find(
        { cargo: { $eq: "Vendedor" } },
        {
          _id: 0,
          id_vendedor: "$_id",
          nombre_completo: {
            $concat: ["$nombre", " ", "$apellido"],
          },
          cargo: 1,
          direccion: 1,
          telefono: 1,
          dni: 1,
        }
      )
      .toArray();
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

export { GetVendedor }