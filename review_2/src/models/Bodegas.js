import { mongoConn, getDB } from "../config/dbconfig.js";

import { ObjectId } from "mongodb";

export class Bodegas {
  static async initialize(Db, collection) {
    this.clints = await mongoConn();
    try {
      this.db = getDB(Db);
      this.collection = this.db.collection(collection);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAll() {
    await this.initialize("Bodegas", "bodegas");
    try {
      return await this.collection.find({}).toArray();
    } catch (error) {
      console.error(error);
    } finally {
      this.clints.close();
    }
  }

  static async getById(id){
    await this.initialize("Bodegas", "bodegas");
    try {
        const Bodegas = await this.collection.findOne({ id: id });
        return Bodegas;
    } catch (error) {
        console.error(error);
    }finally{
        this.clints.close();
    }
  }

  static async createBodega(nombre, id_responsable, estado) {
    await this.initialize("Bodegas", "bodegas");
    try {
      const id = new ObjectId();
      const bodegaData = {
        _id: id,
        id: id.toString(),
        nombre,
        id_responsable,
        estado,
      };

      const result = await this.collection.insertOne(bodegaData);
      const bodegaId = result.insertedId;

      const bodega = await this.collection.findOne({ _id: bodegaId });

      console.log(result);
      console.log(bodega);

      return bodega;
    } catch (error) {
      console.error(error);
    } finally {
      this.clints.close();
    }
  }

  static async listInventory() {
    await this.initialize("Bodegas", "inventarios");
    try {
      const query = [
        {
          $lookup: {
            from: "bodegas",
            let: {
              id_bodega: "$id_bodega",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$id", "$$id_bodega"],
                  },
                },
              },
            ],
            as: "t2",
          },
        },
        {
          $unwind: {
            path: "$t2",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "productos",
            let: {
              id_producto: "$id_producto",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$id", "$$id_producto"],
                  },
                },
              },
            ],
            as: "t3",
          },
        },
        {
          $unwind: {
            path: "$t3",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $group: {
            _id: {
              t2_nombre: "$t2.nombre",
              t3_nombre: "$t3.nombre",
            },
            total: {
              $sum: "$cantidad",
            },
          },
        },
        {
          $sort: {
            "_id.total": -1,
          },
        },
        {
          $project: {
            bodega: "$_id.t2_nombre",
            producto: "$_id.t3_nombre",
            total: 1,
            _id: 0,
          },
        },
      ];
      const result = await this.collection.aggregate(query).toArray();
      return result;
    } catch (error) {
    } finally {
      this.clints.close();
    }
  }
}
