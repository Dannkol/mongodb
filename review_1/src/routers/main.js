import express from "express";


// Middleware


// Controllers

import { GetAllClients, GetReservaPendientesCliente } from "../controllers/ClientesControllers.js";
import { GetAllAutoDisp } from "../controllers/AutomovileController.js";
import { GetAllAlquilerActivo, GetAlquilerId } from "../controllers/AlquilerController.js";


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
router.get('/clients/reservas/pendientes',  GetReservaPendientesCliente)

router.get('/auto/disponible', GetAllAutoDisp);


router.get('/alquiler/activo', GetAllAlquilerActivo);
router.get('/alquiler/:id', GetAlquilerId);


export default router;
