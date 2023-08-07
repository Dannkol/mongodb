import express from "express";


// Middleware


// Controllers

import { GetAllClients } from "../controllers/ClientesControllers.js";


// Rutas

const router = express.Router();

router.get(
  "/", (req , res) => {
    res.status(200).json({
        menssage: "Hello World!"
    })
  }
);

router.get('/clients' , GetAllClients)

export default router;
