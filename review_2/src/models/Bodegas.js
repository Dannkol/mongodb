import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";


export class Bodegas {

    static async initialize() {
        this.clints =  await mongoConn()
        try {
            this.db = getDB("Bodegas")
            this.collection = this.db.collection("bodegas");
        } catch (error) {
            console.error(error);
        }
    };

    static async getAll () {
        await this.initialize();
        try {
            
            return await this.collection.find({}).toArray();
        } catch (error) {
            console.error(error);
        }finally{
            this.clints.close();
        }
    }

}