import { Inventario } from "../models/Inventario.js";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { InventarioPost } from "../DTO/inventario.js";

export class ControllerInventario extends Inventario {
  static async getById(req, res) {
    const validaciones = plainToClass(InventarioPost, req.body, {
        excludeExtraneousValues: true,
      });
    
      for (let key in validaciones) {
        if (validaciones[key] == false) {
          return res.status(403).json({ error: "Datos no permitidos" });
        }
      }
  

    const { id_producto, id_bodega, cantidad } = req.body;
    const result = await Inventario.SelectInventario(
      id_producto,
      id_bodega,
      cantidad
    );

    res.status(200).json(result);
  }
}
