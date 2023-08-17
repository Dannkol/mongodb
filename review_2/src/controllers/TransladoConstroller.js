import { Translado } from "../models/translado.js";

import { plainToClass } from "class-transformer";

import { TrasladoPost } from "../DTO/traslado.js";

export class ControllerTranslado extends Translado {
    static async PostTranslado(req , res) {
        const validaciones = plainToClass(TrasladoPost, req.body, {
            excludeExtraneousValues: true,
          });

          for (let key in validaciones) {
            if (validaciones[key] == false) {
              return res.status(403).json({ error: "Datos no permitidos" });
            }
          }
          
        const result = await Translado.Translado(req.body);
        res.status(200).json(result);
    }
}