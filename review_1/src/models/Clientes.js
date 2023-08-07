import { mongoConn } from "../config/mongodb.js";

const client = await mongoConn();

const db = client.db();


const GetAll = async () => {

    try {
        const collection = db.collection("cliente");
        return await collection.find({}).toArray();
    } catch (error) {
        console.log(error);
        return "error";
    }finally{
        client.close();
    }



};

export { GetAll }