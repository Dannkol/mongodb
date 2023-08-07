import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@pruebas.ncnxgtj.mongodb.net`;


let client = null;

const mongoConn = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    client = await MongoClient.connect(uri, options);
    return client;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDB = (dbname) => {
  return client?.db(dbname);
}

export { mongoConn , getDB };
