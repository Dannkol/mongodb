import { Long } from "mongodb";
import { mongoConn, getDB } from "../config/mongodb.js";

const GetAllDisp = async () => {
  const client = await mongoConn();

  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
      {
        $match: {
          estado: "Disponible",
        },
      },
      {
        $lookup: {
          from: "automovil",
          localField: "id_automovil",
          foreignField: "_id",
          as: "automovil",
        },
      },
      {
        $unwind: "$automovil",
      },
      {
        $project: {
          _id: 0,
          id_alquiler: { $toString: "$_id" },
          estado: "$estado",
          id_automovil: { $toString: "$automovil._id" },
          nombre: "$automovil.nombre",
          marca: "$automovil.marca",
          modelo: "$automovil.modelo",
        },
      },
    ];
    return await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const GetCantidad = async () => {
  const client = await mongoConn();

  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("sucursal_automovil");
    const query = [
      {
        $group: {
          _id: "$id_sucursal",
          automovil: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $addFields: {
          cantidad_total: {
            $sum: "$automovil.cantidad_disponible",
          },
        },
      },
      {
        $project: {
          _id: 0,
          id_sucursal: { $toString: "$_id" },
          cantidad_total: 1,
        },
      },
    ];
    return await collection.aggregate(query).toArray();
  } catch (error) {
    console.log(error);
    return "error";
  } finally {
    client.close();
  }
};

const GetAllCap5 = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("automovil");

    return await collection
      .find(
        { capacidad: { $gt: 5 } },
        {
          _id: 0,
          id_automovil: { $toString: "$_id" },
          marca: "$marca",
          modelo: "$modelo",
          capacidad: 1,
        }
      )
      .toArray();
  } catch (error) {
    console.log(error);
    return "Error";
  } finally {
    client.close();
  }
};

const GetMarca = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("automovil");

    const query = [
      {
        $sort: {
          marca: -1,
        },
      },
      {
        $project: {
          _id: 0,
          marca: "$marca",
          modelo: "$modelo",
          precio_diario: "$precio_diario",
          capacidad: "$capacidad",
        },
      },
    ];

    return await collection.aggregate(query).toArray();
    
  } catch (error) {
    console.log(error);
    return "ERROR";
  } finally {
    client.close();
  }
};

const GetAllCanSucursal = async () => {
  const client = await mongoConn();
  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("sucursal_automovil");

    const query = [
      {
        $lookup : {
          from: "sucursal",
          localField: "id_sucursal",
          foreignField: "_id", 
          as: "sucursal"
        }
      },
      {
        $unwind: "$sucursal"
      },
      {
        $project: {
          _id: 0,
          "id_sucursal": "_id",
          "direccion": "$sucursal.direccion",
          "cantidad_disponible": "$cantidad_disponible"
        }
      },
      {
        $group: {
          _id: "$direccion",
          sucursal: {
            $push: {
              "cantidad_disponible": "$cantidad_disponible"
            }
          },
          direccion: { $first : "$direccion" }
        }
      },
      {
        $project: {
          "_id": 0,
          "cantidad_total": {
            $sum : "$sucursal.cantidad_disponible"
          },
          "direccion": 1
        }
      }
    ];

    return await collection.aggregate(query).toArray();


  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
}

const GetCapDisp = async () => {
  const client = await mongoConn();

  try {
    const db = getDB("db_alquiler_campus");
    const collection = db.collection("alquiler");
    const query = [
      {
        $lookup: {
          from: "automovil",
          localField: "id_automovil",
          foreignField: "_id",
          as: "automovil"
        }
      },
      {
        $unwind: "$automovil"
      },
      {
        $match: {
          "automovil.capacidad": 5,
          "estado": "Disponible"
        }
      },
      {
        $project: {
          _id: 0,
          "id_automovil": { $toString : "$automovil._id"},
          "marca": "$automovil.marca",
          "modelo": "$automovil.modelo",
          "capacidad": "$automovil.capacidad"
        }
      }
    ];

    return await collection.aggregate(query).toArray();
    
  } catch (error) {
    console.log(error);
    return "error";
  }finally{
    client.close();
  }
}

export { GetAllDisp, GetCantidad, GetAllCap5 , GetMarca , GetAllCanSucursal , GetCapDisp };
