import { Bodegas } from "../models/Bodegas.js";

export class ControllerBodegas extends Bodegas {
  static async getAll(req, res) {
    const result = await Bodegas.getAll();
    res.status(200).json(result);
  }

  static async createBodega(req, res) {
    const { nombre, id_responsable, estado } = req.body;
    const result = await Bodegas.createBodega(nombre, id_responsable, estado);
    res.status(200).json(result);
  }

  static async listInventoryGroupBodegas(req, res) {
    const result = await Bodegas.listInventory();
    res.status(200).json(result);
  }
}
