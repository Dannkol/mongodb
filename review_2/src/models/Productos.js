import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";

import { Inventario } from "./Inventario.js";

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

  static async getById(id) {
    await this.initialize("Bodegas", "productos");
    try {
      const productos = await this.collection.findOne({ id: id });
      return productos;
    } catch (error) {
      console.error(error);
    }
  }

  static async InsertProducto(producto) {
    await this.initialize("Bodegas", "productos");
    try {

      const id = new ObjectId()

      const data = {
        _id : id,
        id: id.toString(),
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        cantidad: producto.cantidad,
        precio : producto.precio
      }

      const producto_query = await this.collection.insertOne(data);

      const id_bodega = 11;
      const id_producto = producto_query.insertedId;
      const cantidad = producto.cantidad;

      await Inventario.Queryinventario(id_producto, id_bodega, cantidad, 0);

      let obj = {
        "producto": producto,
        "inventario": {
          "id_producto": id_producto,
          "id_bodega": id_bodega,
          "cantidad": cantidad
        }
      };

      return obj;
    } catch (error) {
      console.error(error);
    } finally {
      this.clints.close();
    }
  }
}