import { mongoConn, getDB } from "../config/mongodb.js";

const GetAll = async () => {
    const client = await mongoConn()
  try {
    const db = getDB("db_alquiler_campus");
    console.log(db);
    const collection = db.collection("cliente");
    return await collection.find({}).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
};

export { GetAll };