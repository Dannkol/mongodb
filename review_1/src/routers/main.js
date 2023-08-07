import express from "express";


// Middleware


// Controllers

import { GetAllClients } from "../controllers/ClientesControllers.js";
import { GetAllAutoDisp } from "../controllers/AutomovileController.js";
import { GetAllAlquilerActivo } from "../controllers/AlquilerController.js";


// Rutas

const router = express.Router();

router.get(
  "/", (req , res) => {
    res.status(200).json({
        menssage: "Hello World!"
    })
  }
);

router.get('/clients' , GetAllClients);
router.get('/auto/disponible', GetAllAutoDisp);
router.get('/alquiler/activo', GetAllAlquilerActivo);


export default router;
