import { Producto } from "../models/Productos.js";

import { plainToClass } from "class-transformer";

import { ProductosPost } from "../DTO/Producto.js";

export class ControllerProducto extends Producto{
    static async InsertProducto(req, res, next){

        try {
            const validaciones = plainToClass(ProductosPost, req.body, {
                excludeExtraneousValues: true,
              });
            
              console.log(validaciones);

              for (let key in validaciones) {
                if (validaciones[key] == false) {
                  return res.status(403).json({ error: "Datos no permitidos" });
                }
              }
              
            const producto = req.body;
            const resultado = await Producto.InsertProducto(producto);
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
        }
    }
}