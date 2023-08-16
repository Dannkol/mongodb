import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";


export class Producto {
    static async initialize(Db, collection) {
      this.clints = await mongoConn();
      try {
        this.db = getDB(Db);
        this.collection = this.db.collection(collection);
      } catch (error) {
        console.error(error);
      }
    }
  
    static async getById(id){
      await this.initialize("Bodegas", "productos");
      try {
          const productos = await this.collection.findOne({ id: id });
          return productos;
      } catch (error) {
          console.error(error);
      }
    }
}