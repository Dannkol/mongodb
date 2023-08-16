import express from "express";

// Controllers
import  { ControllerProducto } from "../controllers/ProductosController.js";

const router = express.Router();



router.post("/create", ControllerProducto.InsertProducto);

export { router }