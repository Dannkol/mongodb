import express from "express";

// Middleware
import { MiddlewareVerifyToken } from "../middleware/AccesToken.js";

// Controllers

import {
  GetAllClients,
  GetReservaPendientesCliente,
  GetClienteDni,
  GetClienteRservasId,
  GetAllClientsAlquiler,
  GetAllInfoReserva,
} from "../controllers/ClientesControllers.js";
import {
  GetAllAutoDisp,
  GetSucursalCantidad,
  GetAllCapacidad5,
  GetObderbyMarca,
  GetAllCantidadSucursal,
  GetCapacidadDisponible,
} from "../controllers/AutomovileController.js";
import {
  GetAllAlquilerActivo,
  GetAlquilerId,
  GetAlquilerPay,
  GetAlquilerFechaInicial,
  GetAllCantidadAlquiler,
  GetAllFechas
} from "../controllers/AlquilerController.js";
import {
  GetEmpleadoVendedor,
  GetEmpleadoGerenteAssistente,
} from "../controllers/EmpleadoController.js";

// Rutas

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    menssage: "Hello World!",
  });
});

router.get("/clients/reserva/info",  MiddlewareVerifyToken,GetAllInfoReserva);
router.get("/clients", MiddlewareVerifyToken, GetAllClients);
router.get("/clients/reservas/pendientes", MiddlewareVerifyToken, GetReservaPendientesCliente);
router.get("/clients/reservas/:id", MiddlewareVerifyToken, GetClienteRservasId);
router.get("/clients/alquiler",  MiddlewareVerifyToken,GetAllClientsAlquiler);
router.get("/clients/:dni", MiddlewareVerifyToken, GetClienteDni);


// Routes Automovil

router.get("/auto/disponible", MiddlewareVerifyToken, GetAllAutoDisp);
router.get("/auto/sursales", MiddlewareVerifyToken, GetSucursalCantidad);
router.get("/auto/sursales/capacidad", MiddlewareVerifyToken, GetAllCantidadSucursal);
router.get("/auto/sursales/capacidad/disponible", MiddlewareVerifyToken, GetCapacidadDisponible);
router.get("/auto/capacidad/5", MiddlewareVerifyToken, GetAllCapacidad5);
router.get("/auto/marca", MiddlewareVerifyToken, GetObderbyMarca);

// Routes Alquiler
router.get("/alquiler/cantidad", MiddlewareVerifyToken ,GetAllCantidadAlquiler);
router.get("/alquiler/activo", MiddlewareVerifyToken ,GetAllAlquilerActivo);
router.get("/alquiler/:id", MiddlewareVerifyToken ,GetAlquilerId);
router.get("/alquiler/pay/:id", MiddlewareVerifyToken ,GetAlquilerPay);
router.get("/alquiler/fecha_inicio/:date", MiddlewareVerifyToken ,GetAlquilerFechaInicial);
router.get("/alquiler/fecha_inicio/:inicio/fecha_final/:final", MiddlewareVerifyToken ,GetAllFechas);


router.get("/empleado/vendedores", GetEmpleadoVendedor);
router.get("/empleado/gerente/asistente", GetEmpleadoGerenteAssistente);

export default router;
