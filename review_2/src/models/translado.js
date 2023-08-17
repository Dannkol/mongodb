import { MongoClient } from "mongodb";

import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";
import { query } from "express";

export class Translado {
  /**
   *
   * {
   *      "cantidad"  : 2,
   *      "producto" : 12,
   *      "idBodegaOrigen" : 11,
   *      "idBodegaDestino" : 12
   *
   * }
   *
   * 	**/

  static async Translado(object) {
    const client = await mongoConn();
    const session = client.startSession();
    session.startTransaction();
    try {
      const db = getDB("Bodegas");
      const inventario = db.collection("inventarios");
      const historiales = db.collection("historiales");

      const inventarioOrigen = await inventario.findOneAndUpdate(
        {
          id_producto: object.idProducto,
          id_bodega: object.idBodegaOrigen,
        },
        { $inc: { cantidad: -object.cantidad } },
        { session, returnOriginal: false }
      );

      if (inventarioOrigen.value) {
        if(!(inventarioOrigen.value.cantidad >= object.cantidad)) throw { error: "cantidad insuficiente" }
        const inventarioDestino = await inventario.findOne({
          id_producto: object.idProducto,
          id_bodega: object.idBodegaDestino,
        });

        const query = {
          $and: [
            {
              id_producto: object.idProducto,
            },
            {
              id_bodega: object.idBodegaDestino,
            },
          ],
        };

        const update = inventarioDestino
          ? {
              $inc: {
                cantidad: inventarioDestino
                  ? inventarioDestino.cantidad + object.cantidad
                  : object.cantidad,
              },
              $set: {
                id: inventarioDestino.id.toString(),
              },
            }
          : {
              $inc: {
                cantidad: inventarioDestino
                  ? inventarioDestino.cantidad + object.cantidad
                  : object.cantidad,
              },
              $set: {
                id: new ObjectId().toString(),
                _id: new ObjectId(),
              },
            };

        const options = { session, returnOriginal: false, upsert: true };

        const inventarioDestinoUpdate = await inventario.updateOne(
          query,
          update,
          options,
          (err, res) => {
            if (err) throw err;
          }
        );

        console.log("Nuevo documento creado:", inventarioDestinoUpdate);

        if (inventarioDestinoUpdate.acknowledged) {
          const historial = {
            id_bodega_origen: object.idBodegaOrigen,
            id_bodega_destino: object.idBodegaDestino,
            cantidad: object.cantidad,
            id_inventario: inventarioOrigen.value._id,
          };

          const result = await historiales.insertOne(historial, { session });

          await session.commitTransaction();
          session.endSession();

          const { insertedId } = result;

          return { insertedId, message: "Transaccion exitosa" };
        } else {
          await session.abortTransaction();
          session.endSession();

          return { message: "No se pudo actualizar inventario destino" };
        }
      } else {
        await session.abortTransaction();
        session.endSession();

        return {
          message:
            "No se pudo actualizar inventario origen o no hay suficiente stock",
        };
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error)
      return error.error? {
        message : error.error
      } : {
        message : "OK .i. puto"
      };
    } finally {
      client.close();
    }
  }
}
