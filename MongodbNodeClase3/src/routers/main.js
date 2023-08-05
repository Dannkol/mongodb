import express from "express";

import { mongoConn } from "../config/mongodb.js";

//Middleware

import { configGET, checkPayloadSize } from "../middleware/rate-limite.js";

const client = await mongoConn();

const db = client.db();

const router = express.Router();

// router.use(express.json({limit:"94b"}))

// crear un pedido del usuario
router.get(
  "/all",
  checkPayloadSize,
  configGET,
  async (req, res) => {
    const collection = db.collection("automovil");
    res.json(await collection.find({}).toArray());
  }
);

export default router;
