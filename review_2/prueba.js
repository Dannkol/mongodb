import { MongoClient } from "mongodb";


const uri = 'mongodb+srv://Dannkol:diminombre12A@pruebas.ncnxgtj.mongodb.net/'; // Cambia la URI de acuerdo a tu configuración
const dbName = 'db_bodegas_campus';

(async () => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db("db_bodegas_campus");
    const bodegasCollection = database.collection("bodegas");

    const bodegaData = {
      nombre,
      id_responsable,
      estado
    };

    const result = await bodegasCollection.insertOne(bodegaData);
    const bodegaId = result.insertedId;

    const bodega = await bodegasCollection.findOne({ _id: bodegaId });

    console.log(result);
    console.log(bodega.nombre);

    return bodega;
  } catch (error) {
    throw error;
  } finally {
    client.close();
  } 
})();
