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

  static async CreateInventario(id_producto, id_bodega, cantidad) {
    await this.initialize("Bodegas", "inventarios");
    try {
      if (await Bodegas.getById(id_bodega)) {
        if (await Producto.getById(id_producto)) {
          const id = new ObjectId();

          const inventarioData = {
            _id: id,
            id: id.toString(),
            id_producto: id_producto,
            id_bodega: id_bodega,
            cantidad: cantidad,
          };

          const result_create = await this.collection.insertOne(inventarioData);

          return result_create.insertedCount;
        } else {
          return {
            message: "Error Producto no existe",
          };
        }
      } else {
        return {
          message: "Error Bodega no existe",
        };
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.clints.close();
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

      result = result
        ? console.log("resul", result)
        : await this.CreateInventario(id_producto, id_bodega, cantidad);
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      this.clints.close();
    }
  }
}
