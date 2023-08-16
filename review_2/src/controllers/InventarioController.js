import { Inventario } from "../models/Inventario.js";

export class ControllerInventario extends Inventario {
    static async getById(req, res) {
        const {id_producto, id_bodega, cantidad} = req.body;
        const result = await Inventario.SelectInventario(id_producto, id_bodega, cantidad);

        res.status(200).json(result);
    }
}