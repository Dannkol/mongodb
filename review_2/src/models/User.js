import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";

export class User {
  static async initialize(Db, collection) {
    this.clints = await mongoConn();
    try {
      this.db = getDB(Db);
      this.collection = this.db.collection(collection);
    } catch (error) {
      console.error(error);
    }
  }
  static async getUser(nombre, password) {
    await this.initialize("Bodegas", "usuarios");
    try {
      
      const users = await this.collection.findOne({
        nombre: nombre,
        password: password,
      });
      return users;
    } catch (error) {
      console.error(error);
    }finally{
        this.clints.close();
    }
  }
}
