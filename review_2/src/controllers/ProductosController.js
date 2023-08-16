import { Producto } from "../models/Productos.js";

export class ControllerProducto extends Producto{
    static async InsertProducto(req, res, next){
        console.log(req.body);
        try {
            const producto = req.body;
            const resultado = await Producto.InsertProducto(producto);
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
        }
    }
}