import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

// Variables de entorno

const mongoConn = async () => {
  try {
    const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@pruebas.ncnxgtj.mongodb.net/${process.env.ATLAS_DATABASE}`;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(uri, options);
    return client;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { mongoConn };
