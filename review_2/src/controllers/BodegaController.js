import "reflect-metadata";

import { Bodegas } from "../models/Bodegas.js";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { DTOBodegas } from "../DTO/Bodegas.js";

export class ControllerBodegas extends Bodegas {
  static async getAll(req, res) {
    const result = await Bodegas.getAll();
    res.status(200).json(result);
  }

  static async createBodega(req, res) {
    const validaciones = plainToClass(DTOBodegas, req.body, {
      excludeExtraneousValues: true,
    });

  
    const errors = await validate(validaciones);
    
    const isDefinedErrors = errors
      .filter(error => error.constraints && error.constraints.isDefined)
      .map(error => ({ property: error.property, message: error.constraints.isDefined }));
      
    if (isDefinedErrors.length > 0) {
      // Manejo de errores isDefined
      return res.status(422).json({ errors: isDefinedErrors });
    }


    req.body = validaciones;
    const { nombre, id_responsable, estado } = req.body;
    const result = await Bodegas.createBodega(nombre, id_responsable, estado);
    res.status(200).json(result);
  }

  static async listInventoryGroupBodegas(req, res) {
    const result = await Bodegas.listInventory();
    res.status(200).json(result);
  }
}
