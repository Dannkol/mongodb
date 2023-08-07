import express from "express";

// Middleware

// Controllers

import {
  GetAllClients,
  GetReservaPendientesCliente,
  GetClienteDni,
  GetClienteRservasId
} from "../controllers/ClientesControllers.js";
import {
  GetAllAutoDisp,
  GetSucursalCantidad,
  GetAllCapacidad5,
} from "../controllers/AutomovileController.js";
import {
  GetAllAlquilerActivo,
  GetAlquilerId,
  GetAlquilerPay,
  GetAlquilerFechaInicial,
} from "../controllers/AlquilerController.js";
import { GetEmpleadoVendedor , GetEmpleadoGerenteAssistente } from "../controllers/EmpleadoController.js";

// Rutas

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    menssage: "Hello World!",
  });
});

router.get("/clients/:dni", GetClienteDni);
router.get("/clients", GetAllClients);
router.get("/clients/reservas/pendientes", GetReservaPendientesCliente);
router.get("/clients/reservas/:id", GetClienteRservasId);


router.get("/auto/disponible", GetAllAutoDisp);
router.get("/auto/sursales", GetSucursalCantidad);
router.get("/auto/capacidad/5", GetAllCapacidad5);

router.get("/alquiler/activo", GetAllAlquilerActivo);
router.get("/alquiler/:id", GetAlquilerId);
router.get("/alquiler/pay/:id", GetAlquilerPay);
router.get("/alquiler/fecha_inicio/:date", GetAlquilerFechaInicial);

router.get("/vendedores", GetEmpleadoVendedor);
router.get("/empleado/gerente/asistente", GetEmpleadoGerenteAssistente);

export default router;
