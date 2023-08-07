import express from "express";


// Middleware


// Controllers

import { GetAllClients, GetReservaPendientesCliente, GetClienteDni} from "../controllers/ClientesControllers.js";
import { GetAllAutoDisp , GetSucursalCantidad } from "../controllers/AutomovileController.js";
import { GetAllAlquilerActivo, GetAlquilerId, GetAlquilerPay} from "../controllers/AlquilerController.js";
import { GetEmpleadoVendedor } from "../controllers/EmpleadoController.js";


// Rutas

const router = express.Router();

router.get(
  "/", (req , res) => {
    res.status(200).json({
        menssage: "Hello World!"
    })
  }
);

router.get('/clients/:dni' , GetClienteDni);
router.get('/clients' , GetAllClients);
router.get('/clients/reservas/pendientes',  GetReservaPendientesCliente)

router.get('/auto/disponible', GetAllAutoDisp);
router.get('/auto/sursales', GetSucursalCantidad);


router.get('/alquiler/activo', GetAllAlquilerActivo);
router.get('/alquiler/:id', GetAlquilerId);
router.get('/alquiler/pay/:id', GetAlquilerPay);


router.get('/vendedores', GetEmpleadoVendedor);

export default router;
