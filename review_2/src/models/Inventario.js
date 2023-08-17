import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";

import { Bodegas } from "./Bodegas.js";
import { Producto } from "./Productos.js";

export class Inventario {
  static async initialize(Db, collection) {
    this.clints = await mongoConn();
    try {
      this.db = getDB(Db);
      this.collection = this.db.collection(collection);
    } catch (error) {
      console.error(error);
    }
  }

  static async Queryinventario(id_producto, id_bodega, cantidad, cantidad_actual) {
    await this.initialize("Bodegas", "inventarios")
    try {

      const query = {
        $and: [
          {
            id_producto: id_producto,
          },
          {
            id_bodega: id_bodega,
          }
        ]
      }
      
      const update = {
        $set: {
          cantidad: cantidad_actual + cantidad,
          id_producto: id_producto,
          id_bodega: id_bodega
        },
      };

      const options = { upsert: true };

      const result = await this.collection.updateOne(query, update, options, (err, res) => {
        if (err) throw err;
      });

      return !result.upsertedId ? {
        message: "Inventario actualizado"
      } : {
        message: "Inventario creado"
      };

    } catch (error) {
      console.error(error);
    }
  }

  static async SelectInventario(id_producto, id_bodega, cantidad) {
    await this.initialize("Bodegas", "inventarios");
    try {
      let result = await this.collection.findOne({
        $and: [
          {
            id_producto: id_producto,
          },
          {
            id_bodega: id_bodega,
          },
        ],
      });

      const cantidad_actual = result ? result.cantidad : 0;

      result = await this.Queryinventario(id_producto, id_bodega, cantidad, cantidad_actual);

      return result;
    } catch (error) {
      console.error(error);
    } finally {
      this.clints.close();
    }
  }
}
